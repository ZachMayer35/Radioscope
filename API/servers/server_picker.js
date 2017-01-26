'use strict';

import config from '../variables';

if (config.env.CLOUDAMQP_URL) {
    require('./rpc/rpc_server');
}
require('./hapi/api_server');
