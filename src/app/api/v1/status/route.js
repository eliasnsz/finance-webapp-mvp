import { NextResponse } from "next/server";
import database from "@/infra/database";

export async function GET() {
	try {
		async function getConnectionsInfo() {
			const result = await database.query(`
        SELECT 
          (SELECT setting::int FROM pg_settings WHERE name = 'max_connections') AS max_connections,
          count(*)::int AS total_used_connections,
          (count(*) FILTER (WHERE state = 'active'))::int AS active_connections,
          (count(*) FILTER (WHERE state = 'idle'))::int AS idle_connections,
          (SELECT setting::int FROM pg_settings WHERE name = 'max_connections') - count(*)::int AS remaining_slots
        FROM 
          pg_stat_activity;
      `);

			return result.rows[0];
		}

		return NextResponse.json({
			status: "healthy",
			database: await getConnectionsInfo(),
		});
	} catch (error) {
		console.error(error);

		return NextResponse.json({
			status: "unhealthy",
		});
	}
}
