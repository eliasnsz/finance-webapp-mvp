import orchestrator from "@tests/orchestrator";
import { beforeAll } from "vitest";

describe("GET /api/v1/migrations", () => {
	beforeAll(async () => {
		await orchestrator.waitForWebServer();
		await orchestrator.clearDatabase();
	});

	it("should return a migrations list", async () => {
		const response = await fetch("http://localhost:3000/api/v1/migrations");
		const responseBody = await response.json();

		expect(response.status).toEqual(200);
		expect(responseBody).length.greaterThan(0);
		expect(responseBody).toBeInstanceOf(Array);
	});
});
