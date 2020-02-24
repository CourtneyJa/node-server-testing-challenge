const server = require("./server");
const request = require('supertest');

describe("server", () => {
  //test if in testing environment
  test("in testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
  //test GET req in server working
  describe("GET /", () => {
    it("should return 200 OK", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
    it("should be json", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });
    it("should return the right object", async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual({ message: "I got it!" });
    });
  });
});
