const mongoose = require('mongoose');
const User = require('./models/User');
const Transaction = require('./models/Transaction');

const MONGO_URI = 'mongodb://localhost:27017/car_pro';

async function checkDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB');

        const userCount = await User.countDocuments();
        const users = await User.find().limit(5);
        console.log(`Total Users: ${userCount}`);
        console.log('Sample Users:', JSON.stringify(users, null, 2));

        const txnCount = await Transaction.countDocuments();
        const txns = await Transaction.find().limit(5);
        console.log(`Total Transactions: ${txnCount}`);
        console.log('Sample Transactions:', JSON.stringify(txns, null, 2));

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkDB();
