const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: Number, required: true },
  suffix: { type: String, default: '+' },
  color: { type: String, default: 'text-blue-500' },
  bg: { type: String, default: 'bg-blue-50' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Stat', statSchema);
