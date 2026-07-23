import { Client } from "pg";

async function getNewClient() {
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
	});

	return await client.connect();
}

async function query(query) {
	let client;

	try {
		client = await getNewClient();
		return await client.query(query);
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		await client?.end();
	}
}

export default Object.freeze({
	getNewClient,
	query,
});
