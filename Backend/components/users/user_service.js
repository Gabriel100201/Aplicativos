import { ConflictError } from '../../libs/conflict_error.js';
import { Dependency } from '../../libs/dependency.js';
import { MissinParameterError } from '../../libs/missing_parameter_error.js';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';

export class UserService {
  constructor() {
    this.userData = Dependency.get('userData');
  }

  async getList(filters, options) {
    return this.userData.getList(filters, options);
  }

  async getForUsernameOrNull(username) {
    const userList = await this.userData.getList({ username });
    if (userList.length) {
      return userList[0];
    }
    return null;

  }


  async getForUuidOrNull(uuid) {
    const userList = await this.userData.getList({ uuid });
    if (userList.lenght) {
      return userList[0];
    }
    return null;

  }

  async hashPassword(password) {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  async create(data) {
    if (!data?.username) {
      throw new MissinParameterError('username');
    }
    if (!data.displayName) {
      throw new MissinParameterError('displayName');
    }
    if (!data.password) {
      throw new MissinParameterError('password');
    }
    if (await this.getForUsernameOrNull(data.username)) {
      throw new ConflictError('Ese nombre de usuario ya esta utilizado');
    }

    data.uuid = uuid.v4();

    data.hashedPassword = await this.hashPassword(data.password);
    delete data.password;

    this.userData.create(data);
    return data;
  }
}


//ver ashedpassword, probabkemente tenga que vokver al anterior, modifique al reves 