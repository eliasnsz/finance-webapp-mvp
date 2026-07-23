import retry from "async-retry";
import database from "@/infra/database.js";

async function waitForWebServer() {
	await retry(checkHealth, { maxTimeout: 1000, retries: 100 });

	async function checkHealth() {
		const response = await fetch("http://localhost:3000/api/v1/status");

		if (!response.ok) {
			throw new Error();
		}
	}
}

async function clearDatabase() {
	return await database.query(
		"DROP SCHEMA public CASCADE; CREATE SCHEMA public;",
	);
}

export default Object.freeze({
	waitForWebServer,
	clearDatabase,
});
