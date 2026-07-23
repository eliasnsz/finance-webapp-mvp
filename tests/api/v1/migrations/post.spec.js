import orchestrator from "@tests/orchestrator";
import { beforeAll } from "vitest";

describe("POST /api/v1/migrations", () => {
	beforeAll(async () => {
		await orchestrator.waitForWebServer();
		await orchestrator.clearDatabase();
	});

	it("should run pending migrations", async () => {
		const response = await fetch("http://localhost:3000/api/v1/migrations", {
			method: "POST",
		});
		const responseBody = await response.json();

		expect(response.status).toEqual(201);
		expect(responseBody).toBeInstanceOf(Array);
		expect(responseBody).length.greaterThan(0);
	});

	it("should return empty array after run migrations", async () => {
		const response = await fetch("http://localhost:3000/api/v1/migrations", {
			method: "POST",
		});
		const responseBody = await response.json();

		expect(response.status).toEqual(200);
		expect(responseBody).toBeInstanceOf(Array);
		expect(responseBody).toHaveLength(0);
		expect(responseBody).toHaveLength(0);
	});
});
