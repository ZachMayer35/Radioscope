'use strict';

import config from '../variables';

if (config.env.CLOUDAMQP_URL) {
    require('./rpc/rpc_server');
} else {
    require('./hapi/api_server');
}
