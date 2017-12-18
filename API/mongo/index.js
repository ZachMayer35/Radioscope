import mongoose from 'mongoose';
import chalk from 'chalk';

mongoose.connect('mongodb://localhost/radioscope/');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log(chalk.green('Connection with database succeeded.'));
    
});

export default db;