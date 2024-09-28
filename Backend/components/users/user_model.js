import mongoose, { Schema } from 'mongoose';

// Definición del modelo de usuario
export const UserModel = mongoose.model(
  'User',
  new Schema({
    uuid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    isEnabled: { type: Boolean, default: true },
    roles: { type: [String], default: [] },
  })
);

export class UserMongo {
  async getList(filters) {
    return await UserModel.find(filters).exec();
  }

  async create(data) {
    try {
      const newUser = await UserModel.create(data);
      return newUser;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  // Método para eliminar un usuario usando el UUID
  async deleteByUuid(uuid) {
    try {
      const deletedUser = await UserModel.findOneAndDelete({ uuid }).exec();
      if (!deletedUser) {
        throw new Error(`Usuario con UUID: ${uuid} no encontrado`);
      }
      return deletedUser;
    } catch (error) {
      throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
  }

  // Método para actualizar un usuario usando el UUID
  async updateByUuid(uuid, updateData) {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { uuid },             // Filtro: buscar por uuid
        { $set: updateData },  // Actualizar solo los campos proporcionados
        { new: true, runValidators: true }  // Devuelve el usuario actualizado
      ).exec();

      if (!updatedUser) {
        throw new Error(`Usuario con UUID: ${uuid} no encontrado`);
      }

      return updatedUser;
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
  }
}
