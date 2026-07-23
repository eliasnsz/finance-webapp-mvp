import { exec } from "node:child_process";

function checkPostgresHealth() {
	exec(
		`docker exec finance_app_postgres pg_isready -h localhost -U ${process.env.POSTGRES_USER} -d ${process.env.POSTGRES_DB}`,
		handleReturn,
	);

	function handleReturn(_error, stdout, _stderr) {
		if (stdout.search("accepting connections") === -1) {
			checkPostgresHealth();
			return;
		}

		process.stdout.write("🟢 Banco de dados inicializado \n");
	}
}

process.stdout.write("⏳️ Aguardando inicialização do banco de dados \n");
checkPostgresHealth();
