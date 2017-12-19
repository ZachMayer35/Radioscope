import mongoose from 'mongoose';
import chalk from 'chalk';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/radioscope', {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log(chalk.green('Connection with database succeeded.'));
});

export default db;
