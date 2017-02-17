'use strict';

import config from '../variables';

if (config.env.CLOUDAMQP_URL || config.env.AMQP == 'true') {
    require('./rpc/rpc_server');
} else {
    require('./hapi/api_server');
}
