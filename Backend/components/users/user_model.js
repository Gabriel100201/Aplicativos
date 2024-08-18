import mongoose, { Schema } from 'mongoose';

export const UserModel = mongoose.model(
  'User',
  new Schema({ 
    uuid: String, 
    username: String,
    displayName: String,
    hashedPassword: String,
    isEnabled: Boolean,
    roles: String
  })
);

export class UserMongo{
  async getList(filters /*options*/){
    return (await UserModel.find(filters).exec())
      .map(user => user.toJSON());
 	}

  async create(data){
  	return UserModel.create(data);
  }
}
