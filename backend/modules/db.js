
// modules/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db = null;
let _client = null;

const connectDB = async () => {
    // If already connected  return existing connection
    if (_db) {
        console.log('Using existing MongoDB connection');
        return _db;
    }

    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }

        _client = new MongoClient(uri, {
            
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        });

        await _client.connect();
        _db = _client.db(); // Uses database name from connection string

        console.log('MongoDB connected successfully!');

        return _db;
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        throw err;
    }
};


 // Returns the connected database instance
 // called after connectDB() has succeeded
const  getDb = () => {
    if (!_db) {
        throw new Error(
            'Database not initialized. Please call connectDB() first.'
        );
    }
    return _db;
};

// Close connection
const closeDb = async () => {
    if (_client) {
        await _client.close();
        console.log('MongoDB connection closed');
        _db = null;
        _client = null;
    }
};

module.exports = {
    connectDB,
    getDb,
    closeDb
};