import request from "supertest";
import { app } from "@/app";
import { StatusCodes } from "http-status-codes";

describe("first unit test", () => {
  const url = {
    get_users: "/api/users",
  };

  it("returns all users", async () => {
    await request(app.callback())
      .get(url.get_users)
      .expect(StatusCodes.OK)
      .expect(({ body }) => {
        expect(body).toMatchObject({ users: [{ name: "angel" }] });
      });
  });
});
