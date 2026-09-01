// IMPORTANT:
// Default admin password is stored in the environment variables.
const mongoose = require('mongoose');
const readline = require('readline');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const User = require('../src/models/User');

const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD;

const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => rl.question(query, (ans) => {
    rl.close();
    resolve(ans);
  }));
};

const run = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('Error: MONGODB_URI is not defined in the environment variables.');
      process.exit(1);
    }

    console.log('Connecting to database...');
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB.');

    // Check command line arguments first
    let username = process.argv[2];
    if (username) {
      username = username.trim();
    }

    if (!username) {
      username = await askQuestion('Enter the admin username to seed: ');
      username = username.trim();
    }

    if (!username) {
      console.error('Error: Username cannot be empty.');
      await mongoose.disconnect();
      process.exit(1);
    }

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      console.log(`User "${username}" already exists with role: "${user.role}".`);
      const answer = await askQuestion(`Do you want to update this user to Admin and reset their password to "${DEFAULT_PASSWORD}"? (y/N): `);
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        user.role = 'admin';
        user.password = DEFAULT_PASSWORD;
        user.isSetup = false; // Set to false to force password change on first login
        await user.save();
        console.log(`Successfully updated user "${username}" to Admin and reset password to "${DEFAULT_PASSWORD}" (isSetup: false).`);
      } else {
        console.log('Operation cancelled. No changes made.');
      }
    } else {
      // Create new Admin user
      user = new User({
        username,
        password: DEFAULT_PASSWORD,
        role: 'admin',
        isSetup: false // Set to false to force password change on first login
      });
      await user.save();
      console.log(`Successfully seeded Admin user "${username}" with default password: "${DEFAULT_PASSWORD}" (isSetup: false).`);
    }

  } catch (error) {
    console.error('An error occurred during seeding:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
};

run();
