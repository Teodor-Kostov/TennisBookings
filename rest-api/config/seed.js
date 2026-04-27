const User = require('../models/userModel');

const seedUsers = [
    {
        email: 'user@test.com',
        username: 'testuser',
        password: 'test123',
        role: 'user'
    },
    {
        email: 'admin@test.com',
        username: 'testadmin',
        password: 'admin123',
        role: 'admin'
    }
];

async function seedDatabase() {
    try {
        for (const userData of seedUsers) {
            const existingUser = await User.findOne({ email: userData.email });

            if (!existingUser) {
                await User.create(userData);
                console.log(`Seed user created: ${userData.email} (${userData.role})`);
            } else {
                console.log(`Seed user already exists: ${userData.email}`);
            }
        }
        console.log('Database seeding completed');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

module.exports = seedDatabase;
