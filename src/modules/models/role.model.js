const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // ADMIN, TRAINER, USER
  },
  permissions: [
    {
      type: String // e.g. 'create_user', 'view_user'
    }
  ]
});

module.exports = mongoose.model('Role', roleSchema);
