import { resolve } from "node:path";
import { NextResponse } from "next/server";
import { runner } from "node-pg-migrate";
import database from "@/infra/database";

const defaultConfig = {
	dir: resolve("src/infra/migrations"),
	migrationsTable: "pgmigrations",
	direction: "up",
	verbose: true,
};

export async function GET() {
	const databaseClient = await database.getNewClient();

	const migrations = await runner({
		...defaultConfig,
		dryRun: true,
		dbClient: databaseClient,
	});

	await databaseClient.end();

	return NextResponse.json(migrations);
}

export async function POST() {
	let statusCode = 200;
	const databaseClient = await database.getNewClient();

	const migrations = await runner({
		...defaultConfig,
		dbClient: databaseClient,
	});

	await databaseClient.end();

	if (migrations.length) {
		statusCode = 201;
	}

	return NextResponse.json(migrations, { status: statusCode });
}
