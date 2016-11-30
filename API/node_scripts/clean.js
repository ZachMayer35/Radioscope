'use strict';

import path from 'path';
import FileWriter from './tools/file-writer';

FileWriter.remove('.env');
FileWriter.remove('.eslintignore');
FileWriter.remove('nodemon.json');
