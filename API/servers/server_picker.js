
if (!process.env.CLOUDAMQP_URL) {
    require('./rpc/rpc_server');
}
require('./hapi/api_server');
