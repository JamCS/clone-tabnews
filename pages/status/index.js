import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DbVersion />
      <MaxConnections />
      <OpenedConnections />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updateAtText = "Carregando...";

  if (!isLoading && data) {
    updateAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return <div>Última atualização: {updateAtText}</div>;
}

function DbVersion() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let dbVersionText = "Carregando...";

  if (!isLoading && data) {
    dbVersionText = data.dependencies.database.db_version;
  }

  return <div>Versão Banco de Dados: {dbVersionText} </div>;
}

function MaxConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let maxConnectionsText = "Carregando...";

  if (!isLoading && data) {
    maxConnectionsText = data.dependencies.database.max_connections;
  }

  return <div> Máximo de Conexões: {maxConnectionsText} </div>;
}

function OpenedConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let openedConnectionsText = "Carregando...";

  if (!isLoading && data) {
    openedConnectionsText = data.dependencies.database.opened_connections;
  }

  return <div>Conexões Abertas: {openedConnectionsText} </div>;
}
