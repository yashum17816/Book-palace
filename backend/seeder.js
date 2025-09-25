const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users'); // You will create this file
const books = require('./data/books'); // You will create this file
const User = require('./models/userModel');
const Book = require('./models/bookModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Book.deleteMany();

    // Insert data
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleBooks = books.map((book) => {
      return { ...book, user: adminUser };
    });

    await Book.insertMany(sampleBooks);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Book.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}