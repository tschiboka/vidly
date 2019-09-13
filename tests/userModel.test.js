const { User } = require("../models/user");

describe("userModel", () => {
    it("should return a valid JWT", () => {
        const user = new User({ name: "tibike", email: "tibike123@gmail.com", password: "12345678" });
        const token = user.generateAuthToken();

        expect(token).toMatch(/^.+\..+\..+$/);
    });
});