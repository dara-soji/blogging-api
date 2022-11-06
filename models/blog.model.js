const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const moment = require('moment');

const BlogSchema = new Schema({
  id: ObjectId,
  created_at: {type: Date, default: moment()},
  state: { type: String, enum: ['draft', 'published'], default: "draft" },
  title: {type: String, required: true, unique: [true, 'Title must be unique'] },
  user_id: String,
  author: String,
  read_count: {type: Number, default: 0},
  reading_time: {type: Number, default: 0},
  tags: {type: Array, default: []},
  timestamp: {type: Date, default: moment()},
  body: {type: String, required: true },
  description: {type: String}
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
