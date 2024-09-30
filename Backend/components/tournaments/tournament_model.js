import mongoose, { Schema } from 'mongoose';
import { TeamModel } from '../teams/teams_models.js';

// Definición del modelo de torneo
export const TournamentModel = mongoose.model(
  'Tournament',
  new Schema({
    uuid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    teams: [{ type: String, ref: 'Team' }], // Lista de equipos participantes (referencia a Team)
    matches: [
      {
        teamA: { type: String, ref: 'Team' },
        teamB: { type: String, ref: 'Team' },
        result: String,  // Ejemplo: "1-0"
        winner: String,  // UUID del equipo ganador o "draw"
      }
    ],
    description: { type: String },
  })
);

export class TournamentMongo {
  async getList(filters) {
    const tournaments = await TournamentModel.find(filters).exec();
    return tournaments;
  }

  async create(data) {
    try {
      const newTournament = await TournamentModel.create(data);
      return newTournament.toObject().uuid;
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

  async getForUuid(uuid) {
    try {
      let tournament = await TournamentModel.findOne({ uuid }).exec();

      if (!tournament) {
        throw new Error(`Torneo con UUID: ${uuid} no encontrado`);
      }

      const matchesWithNames = await Promise.all(
        tournament.matches.map(async (match) => {
          const teamA = await TeamModel.findOne({ uuid: match.teamA }).exec();
          const teamB = await TeamModel.findOne({ uuid: match.teamB }).exec();

          return {
            ...match._doc,
            teamA: {
              uuid: match.teamA,
              name: teamA ? teamA.name : 'Equipo no encontrado',
            },
            teamB: {
              uuid: match.teamB,
              name: teamB ? teamB.name : 'Equipo no encontrado',
            },
          };
        })
      );

      return {
        ...tournament._doc,
        matches: matchesWithNames,
      };
    } catch (error) {
      throw new Error(`Error al obtener el torneo: ${error.message}`);
    }
  }

  async saveResults(uuid, matches) {
    try {
      const tournament = await TournamentModel.findOneAndUpdate(
        { uuid },
        { $set: { matches } },
        { new: true, runValidators: true }
      ).exec();

      if (!tournament) {
        throw new Error(`Torneo con UUID: ${uuid} no encontrado`);
      }

      return tournament;
    } catch (error) {
      throw new Error(`Error al guardar los resultados: ${error.message}`);
    }
  }
}
