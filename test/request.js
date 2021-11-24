const request = require("request-promise");

module.exports = (server) => {
  const { address, port } = server.address();
  const host = address === "::" ? "localhost" : address;

  return {
    get: (path) =>
      request.get(`http://${host}:${port}${path}`, {
        resolveWithFullResponse: true,
      }),

    post: (path, data) =>
      request.post(`http://${host}:${port}${path}`, {
        json: data,
        resolveWithFullResponse: true,
      }),

    put: (path, data) =>
      request.put(`http://${host}:${port}${path}`, {
        json: data,
        resolveWithFullResponse: true,
      }),

    delete: (path) =>
      request.delete(`http://${host}:${port}${path}`, {
        resolveWithFullResponse: true,
      }),
  };
};
