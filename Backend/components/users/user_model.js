import mongoose, { Schema } from 'mongoose';

// Definición del modelo de usuario
export const UserModel = mongoose.model(
  'User',
  new Schema({
    uuid: String,
    username: String,
    displayName: String,
    hashedPassword: String,
    isEnabled: Boolean,
    roles: Array,
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
}
