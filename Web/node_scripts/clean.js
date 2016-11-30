'use strict';

import path from 'path';
import FileWriter from './tools/file-writer';
import config from '../variables';

FileWriter.remove('.env');
FileWriter.remove('.eslintignore');
FileWriter.remove('nodemon.json');
FileWriter.remove(path.relative(config.paths.root, path.join(config.paths.build, '*')));