import mongoose, { Schema } from 'mongoose';

export const UserModel = mongoose.model(
  'User',
  new Schema({ 
    uuid: String, 
    username: String,
    displayName: String,
    hashedPassword: String,
  })
);

export class UserMongo{
  async getList(filters /*options*/){
	  return UserModel.find(filters).exec();
 	}

  async create(data){
  	return UserModel.create(data);
  }
}
