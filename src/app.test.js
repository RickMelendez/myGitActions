const request = require("supertest");
const app = require("./app");

describe("GET /health", () => {
  it("returns 200 with status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("GET /api/towers", () => {
  it("returns a list of towers", async () => {
    const res = await request(app).get("/api/towers");
    expect(res.statusCode).toBe(200);
    expect(res.body.towers).toBeInstanceOf(Array);
    expect(res.body.towers.length).toBeGreaterThan(0);
  });
});

describe("GET /api/towers/:id", () => {
  it("returns a tower for a valid ID", async () => {
    const res = await request(app).get("/api/towers/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("returns 400 for an invalid ID", async () => {
    const res = await request(app).get("/api/towers/abc");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /api/towers", () => {
  it("creates a tower with a valid name", async () => {
    const res = await request(app)
      .post("/api/towers")
      .send({ name: "Tower Gamma", level: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Tower Gamma");
    expect(res.body).toHaveProperty("level", 2);
  });

  it("returns 400 when name is missing", async () => {
    const res = await request(app).post("/api/towers").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

describe("404 handler", () => {
  it("returns 404 for unknown routes", async () => {
    const res = await request(app).get("/api/unknown");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Route not found");
  });
});
