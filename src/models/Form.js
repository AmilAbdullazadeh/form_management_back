const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  isReadOnly: {
    type: Boolean,
    default: false
  },
  fields: [{
    name: String,
    type: {
      type: String,
      enum: ['text', 'number', 'email', 'date', 'checkbox', 'select'],
      default: 'text'
    },
    isRequired: {
      type: Boolean,
      default: false
    },
  }]
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema); 