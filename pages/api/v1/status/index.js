import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const dbVersionResult = await database.query("SHOW SERVER_VERSION");
  const dbVersionValue = dbVersionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query("SHOW MAX_CONNECTIONS");
  const maxConnectionsValue = maxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM  pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        db_version: dbVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
