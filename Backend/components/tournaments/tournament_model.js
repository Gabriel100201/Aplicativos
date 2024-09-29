import mongoose, { Schema } from 'mongoose';

// Definición del modelo de torneo
export const TournamentModel = mongoose.model(
  'Tournament',
  new Schema({
    uuid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    teams: [{ type: String, ref: 'Team' }], // Lista de equipos participantes (referencia a Team)
    matches: [{ teamA: String, teamB: String, result: String }], // Enfrentamientos y resultados,
    description: { type: String },
  })
);

export class TournamentMongo {
  async getList(filters) {
    return await TournamentModel.find(filters).populate('teams').exec();
  }

  async create(data) {
    try {
      const newTournament = await TournamentModel.create(data);
      return newTournament;
    } catch (error) {
      throw new Error(`Error al crear el torneo: ${error.message}`);
    }
  }

  async deleteByUuid(uuid) {
    try {
      const deletedTournament = await TournamentModel.findOneAndDelete({ uuid }).exec();
      if (!deletedTournament) {
        throw new Error(`Torneo con UUID: ${uuid} no encontrado`);
      }
      return deletedTournament;
    } catch (error) {
      throw new Error(`Error al eliminar el torneo: ${error.message}`);
    }
  }

  async updateByUuid(uuid, updateData) {
    try {
      const updatedTournament = await TournamentModel.findOneAndUpdate(
        { uuid },
        { $set: updateData },
        { new: true, runValidators: true }
      ).exec();

      if (!updatedTournament) {
        throw new Error(`Torneo con UUID: ${uuid} no encontrado`);
      }

      return updatedTournament;
    } catch (error) {
      throw new Error(`Error al actualizar el torneo: ${error.message}`);
    }
  }
}
