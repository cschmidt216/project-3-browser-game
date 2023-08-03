const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, default: null, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true, match: [/.+@.+\..+/, 'Must match an email address!'] },
  token: { type: String },
  characters: [{ type: Schema.Types.ObjectId, ref: 'Characters' }]
});

module.exports = model('Users', userSchema);