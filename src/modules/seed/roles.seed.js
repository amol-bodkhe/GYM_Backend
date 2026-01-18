const mongoose = require('mongoose');
const Role = require('../models/role.model');
mongoose.connect('mongodb://localhost:27017/gym_management');

const seedRoles = async () => {
  await Role.deleteMany();

  await Role.insertMany([
    {
      name: 'ADMIN',
      permissions: [
        'create_user',
        'delete_user',
        'view_user',
        'view_reports'
      ]
    },
    {
      name: 'TRAINER',
      permissions: [
        'view_user',
        'update_profile'
      ]
    },
    {
      name: 'USER',
      permissions: [
        'update_profile'
      ]
    }
  ]);

  console.log('Roles seeded');
  process.exit();
};

module.exports = seedRoles;
