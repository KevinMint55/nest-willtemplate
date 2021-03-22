import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  }, // 用户名
  nickname: {
    type: String,
    required: true,
  }, // 昵称
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export { UserSchema };
