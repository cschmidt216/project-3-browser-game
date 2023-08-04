const { Schema, model } = require('mongoose');
const { array } = require('mongoose-validators');

const characterSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  shape: { type: String, required: true },
  style: { type: String, required: true },
  health: Number,
  strength: Number,
  defense: Number,
  speed: Number,
  moves: { 
    type: [{ type: Schema.Types.ObjectId, ref: 'Moves' }],
    validate: {
      validator: function(val) {
        return val.length <= 4;
      },
      message: 'You can only have up to 4 moves!'
    }
  }
});

module.exports = model('Characters', characterSchema);