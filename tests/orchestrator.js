import retry from "async-retry";

async function waitForWebServer() {
	await retry(checkHealth, { maxTimeout: 1000, retries: 100 });

	async function checkHealth() {
		const response = await fetch("http://localhost:3000/api/v1/status");

		if (!response.ok) {
			throw new Error();
		}
	}
}

export default Object.freeze({
	waitForWebServer,
});
