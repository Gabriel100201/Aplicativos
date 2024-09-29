import { Dependency } from '../../libs/dependency.js';
import { checkPermission } from '../../libs/check_permision.js';

export class TournamentController {
  constructor() {
    this.tournamentService = Dependency.get('tournamentService');
  }

  async get(req, res) {
    checkPermission(req, 'admin');

    const tournamentList = await this.tournamentService.getList();
    res.send(tournamentList);
  }

  async post(req, res) {
    checkPermission(req, 'admin');

    try {
      await this.tournamentService.create(req.body);
      res.status(200).send({
        message: 'Tournament created successfully',
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }

  async delete(req, res) {
    checkPermission(req, 'admin');

    const { uuid } = req.body;

    try {
      const result = await this.tournamentService.delete(uuid);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }

  async update(req, res) {
    checkPermission(req, 'admin');

    const { uuid } = req.body;
    const updateData = req.body;

    try {
      const updatedTournament = await this.tournamentService.update(uuid, updateData);
      res.status(200).send({
        message: 'Tournament updated successfully',
        tournament: updatedTournament
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }

  async generateMatches(req, res) {
    checkPermission(req, 'admin');

    const { uuid } = req.body;

    try {
      const matches = await this.tournamentService.generateMatches(uuid);
      res.status(200).send({
        message: 'Matches generated successfully',
        matches
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }
}