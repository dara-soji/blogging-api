const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  created_at: {type: Date, default: moment()},
  lastUpdateAt: { type: Date, default: moment() },
  email: {type: String, required: true, unique: [true, 'Email must be unique'] },
  first_name: {type: String, required: true },
  last_name: {type: String, required: true },
  password: {type: String, required: true },
  username: {type: String, unique: [true, "The Username must be unique"]}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
