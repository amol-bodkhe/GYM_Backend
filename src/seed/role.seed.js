const Role = require('../modules/models/role.model');

const seedRoles = async () => {
  try {
    const count = await Role.countDocuments();

    if (count > 0) {
      console.log('Roles already seeded');
      return;
    }

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

    console.log('Roles seeded successfully');
  } catch (error) {
    console.error('Role seeding failed:', error.message);
  }
};

module.exports = seedRoles;
