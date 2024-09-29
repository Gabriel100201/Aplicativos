import { Dependency } from '../../libs/dependency.js';
import { MissingParameterError } from '../../libs/missing_parameter_error.js';
import * as uuid from 'uuid';

export class TournamentService {
  constructor() {
    this.tournamentData = Dependency.get('tournamentData');
    this.teamService = Dependency.get('teamService'); // Para cargar equipos
  }

  async getList(filters, options) {
    return this.tournamentData.getList(filters, options);
  }

  async getForUuidOrNull(uuid) {
    const tournamentList = await this.tournamentData.getList({ uuid });
    if (tournamentList.length) {
      return tournamentList[0];
    }
    return null;
  }

  async create(data) {
    if (!data?.name) {
      throw new MissingParameterError('name');
    }
    if (!data.teams || data.teams.length < 2) {
      throw new MissingParameterError('teams');
    }

    data.uuid = uuid.v4();
    await this.tournamentData.create(data);
  }

  async generateMatches(uuid) {
    const tournament = await this.getForUuidOrNull(uuid);
    if (!tournament) {
      throw new Error('Torneo no encontrado');
    }

    // Generar enfrentamientos (todos contra todos)
    const matches = [];
    for (let i = 0; i < tournament.teams.length; i++) {
      for (let j = i + 1; j < tournament.teams.length; j++) {
        matches.push({ teamA: tournament.teams[i], teamB: tournament.teams[j], result: null });
      }
    }

    // Guardar los enfrentamientos en el torneo
    tournament.matches = matches;
    await this.tournamentData.updateByUuid(uuid, { matches });

    return matches;
  }

  async delete(uuid) {
    if (!uuid) {
      throw new MissingParameterError('uuid');
    }

    const tournament = await this.getForUuidOrNull(uuid);
    if (!tournament) {
      throw new Error('Torneo no encontrado');
    }

    await this.tournamentData.deleteByUuid(uuid);
    return { message: 'Torneo eliminado correctamente' };
  }

  async update(uuid, updateData) {
    if (!uuid) {
      throw new MissingParameterError('uuid');
    }

    const tournament = await this.getForUuidOrNull(uuid);
    if (!tournament) {
      throw new Error('Torneo no encontrado');
    }

    const updatedTournament = await this.tournamentData.updateByUuid(uuid, updateData);
    return updatedTournament;
  }
}
