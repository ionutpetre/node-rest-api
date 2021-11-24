const assert = require("assert");

const request = require("./request");
const server = require("./../src/server");

describe("/users", () => {
  let user = null;

  it("get user list empty", (done) => {
    request(server)
      .get("/users")
      .then((response) => {
        assert(response.statusCode, 200);
        assert(response.body, []);
        done();
      });
  });

  it("create user", (done) => {
    request(server)
      .post("/users", { name: "Created" })
      .then((response) => {
        assert(response.statusCode, 201);
        assert(response.body.name, "Created");
        user = response.body;
        done();
      });
  });

  it("get user by id", (done) => {
    request(server)
      .get(`/users/${user.id}`)
      .then((response) => {
        assert(response.statusCode, 200);
        assert(response.body, user);
        done();
      });
  });

  it("get user list", (done) => {
    request(server)
      .get("/users")
      .then((response) => {
        assert(response.statusCode, 200);
        assert(response.body, [user]);
        done();
      });
  });

  it("update user", (done) => {
    request(server)
      .put(`/users/${user.id}`, {
        ...user,
        name: "Updated",
      })
      .then((response) => {
        assert(response.statusCode, 200);
        assert(response.body.name, "Updated");
        user = response.body;
        done();
      });
  });

  it("delete user", (done) => {
    request(server)
      .delete(`/users/${user.id}`)
      .then((response) => {
        assert(response.statusCode, 204);
        done();
      });
  });

  it("get user list empty", (done) => {
    request(server)
      .get("/users")
      .then((response) => {
        assert(response.statusCode, 200);
        assert(response.body, []);
        done();
      });
  });
});
