import mongoose from 'mongoose';
import chalk from 'chalk';
import config from '../variables';

const mongoUrl = config.env.NODE_ENV === 'development' || !config.env.MONGODB_URI ? 
                    'mongodb://localhost/radioscope':
                    config.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log(chalk.green('Connection with database succeeded.'));
});

export default db;
