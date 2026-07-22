import { beforeAll } from "vitest";
import orchestrator from "../../../orchestrator";

describe("GET /api/v1/status", () => {
	beforeAll(async () => {
		await orchestrator.waitForWebServer();
	});

	it("should return 'healthy' status", async () => {
		const response = await fetch("http://localhost:3000/api/v1/status");
		const responseBody = await response.json();

		expect(responseBody.status).toBe("healthy");
	});
});
