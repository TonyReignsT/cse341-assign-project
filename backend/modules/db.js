// const {MongoClient} = require("mongodb");
// require('dotenv').config;


// async function main() {
//     const uri = process.env.MONGODB_URI;
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//     } catch (err) {
//         console.error(err);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error)

// module.exports = {main}

// modules/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db = null;
let _client = null;

const connectDB = async () => {
    // If already connected → just return existing connection
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
        _db = _client.db("professional_db"); // Uses database name from connection string
        // If you want to be explicit about database name:
        // _db = _client.db('your-database-name-here');

        console.log('MongoDB connected successfully!');

        return _db;
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        throw err;
    }
};

/**
 * Returns the connected database instance
 * Must be called after connectDB() has succeeded
 */
const getDb = () => {
    if (!_db) {
        throw new Error(
            'Database not initialized. Please call connectDB() first.'
        );
    }
    return _db;
};

// Close connection (useful for tests or graceful shutdown)
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