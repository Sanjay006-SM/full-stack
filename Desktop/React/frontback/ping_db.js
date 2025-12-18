const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;
console.log('Testing connection to:', uri.split('@')[1]); // Log host part only for security

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('✅ Success! Connected to MongoDB Atlas.');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Connection Failed!');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        if (err.message.includes('IP address')) {
            console.error('👉 This confirms your IP is NOT whitelisted in MongoDB Atlas.');
        }
        process.exit(1);
    });
