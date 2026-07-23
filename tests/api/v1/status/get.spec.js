import orchestrator from "@tests/orchestrator";
import { beforeAll } from "vitest";

describe("GET /api/v1/status", () => {
	beforeAll(async () => {
		await orchestrator.waitForWebServer();
	});

	it("should return 'healthy' status and database info", async () => {
		const response = await fetch("http://localhost:3000/api/v1/status");
		const responseBody = await response.json();

		expect(responseBody.status).toBe("healthy");
		expect(responseBody.database).toEqual(
			expect.objectContaining({
				max_connections: expect.any(Number),
				total_used_connections: expect.any(Number),
				active_connections: expect.any(Number),
				idle_connections: expect.any(Number),
				remaining_slots: expect.any(Number),
			}),
		);
	});
});
