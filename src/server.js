const http = require("http");

const ResourceService = require("./services/resource");

const usersService = new ResourceService("user");

const getReqBody = (req, callback) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    callback(null, JSON.parse(data));
  });
  req.on("error", (error) => {
    callback(error);
  });
};

const sendResData = (res, status, data) => {
  res.writeHead(status);
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    if (req.url === "/users") {
      getReqBody(req, (error, user) => {
        sendResData(res, 201, usersService.addOne(user));
      });
    }
  } else if (req.method === "GET") {
    if (req.url.startsWith("/users")) {
      const [, id] = req.url.split("/users/");
      if (id) {
        sendResData(res, 200, usersService.getOne(id));
      } else {
        sendResData(res, 200, usersService.getAll());
      }
    }
  } else if (req.method === "PUT") {
    if (req.url.startsWith("/users")) {
      const [, id] = req.url.split("/users/");
      if (id) {
        getReqBody(req, (error, user) => {
          sendResData(
            res,
            200,
            usersService.updateOne(id, user)
          );
        });
      }
    }
  } else if (req.method === "DELETE") {
    if (req.url.startsWith("/users")) {
      const [, id] = req.url.split("/users/");
      if (id) {
        usersService.deleteOne(id);
        sendResData(res, 204);
      }
    }
  } else {
    sendResData(res, 404);
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`HTTP REST API started on: ${PORT}`);
});

module.exports = server;
