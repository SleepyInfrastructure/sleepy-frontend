/* Users */
export function createUser(username: string, password: string): ReduxAction {
    return {
        type: "CREATE_USER",
        data: { username, password },
    };
}

export function fetchUser(id: string): ReduxAction {
    return {
        type: "FETCH_USER",
        data: id,
    };
}
export function fetchUserSuccess(user: User): ReduxAction {
    return {
        type: "FETCH_USER_SUCCESS",
        data: user,
    };
}

/* Sessions */
export function createSession(type: string, username?: string, password?: string): ReduxAction {
    return {
        type: "CREATE_SESSION",
        data: { type, username, password },
    };
}
export function createSessionSuccess(session: Session): ReduxAction {
    return {
        type: "CREATE_SESSION_SUCCESS",
        data: session,
    };
}

export function deleteSession(): ReduxAction {
    return {
        type: "DELETE_SESSION",
        data: {},
    };
}

/* Servers */
export function createServer(name: string): ReduxAction {
    return {
        type: "CREATE_SERVER",
        data: { name },
    };
}
export function createServerSuccess(server: ServerStructured): ReduxAction {
    return {
        type: "CREATE_SERVER_SUCCESS",
        data: server,
    };
}
export function editServer(edit: ServerEdit): ReduxAction {
    return {
        type: "EDIT_SERVER",
        data: edit
    };
}
export function editServerSuccess(server: Server): ReduxAction {
    return {
        type: "EDIT_SERVER_SUCCESS",
        data: server,
    };
}
export function fetchServer(id: string): ReduxAction {
    return {
        type: "FETCH_SERVER",
        data: id,
    };
}
export function fetchServerSuccess(server: Server): ReduxAction {
    return {
        type: "FETCH_SERVER_SUCCESS",
        data: server,
    };
}

export function fetchServerStructured(id: string): ReduxAction {
    return {
        type: "FETCH_SERVER_STRUCTURED",
        data: id,
    };
}
export function fetchServerStructuredSuccess(serverStructured: ServerStructured): ReduxAction {
    return {
        type: "FETCH_SERVER_STRUCTURED_SUCCESS",
        data: serverStructured,
    };
}

export function fetchAllServersStructured(): ReduxAction {
    return {
        type: "FETCH_ALL_SERVERS_STRUCTURED",
        data: {},
    };
}
export function fetchAllServersStructuredSuccess(servers: ServerStructured[]): ReduxAction {
    return {
        type: "FETCH_ALL_SERVERS_STRUCTURED_SUCCESS",
        data: servers,
    };
}

/* Networks */
export function fetchNetwork(id: string): ReduxAction {
    return {
        type: "FETCH_NETWORK",
        data: id,
    };
}
export function fetchNetworkSuccess(network: Network): ReduxAction {
    return {
        type: "FETCH_NETWORK_SUCCESS",
        data: network,
    };
}

/* Disks */
export function fetchDisk(id: string): ReduxAction {
    return {
        type: "FETCH_DISK",
        data: id,
    };
}
export function fetchDiskSuccess(disk: Disk): ReduxAction {
    return {
        type: "FETCH_DISK_SUCCESS",
        data: disk,
    };
}

/* Partitions */
export function fetchPartition(id: string): ReduxAction {
    return {
        type: "FETCH_PARTITION",
        data: id,
    };
}
export function fetchPartitionSuccess(partition: Partition): ReduxAction {
    return {
        type: "FETCH_PARTITION_SUCCESS",
        data: partition,
    };
}

/* Containers */
export function fetchContainer(id: string): ReduxAction {
    return {
        type: "FETCH_CONTAINER",
        data: id,
    };
}
export function fetchContainerSuccess(container: Container): ReduxAction {
    return {
        type: "FETCH_CONTAINER_SUCCESS",
        data: container,
    };
}

/* Containers */
export function fetchContainerProject(id: string): ReduxAction {
    return {
        type: "FETCH_CONTAINER_PROJECT",
        data: id,
    };
}
export function fetchContainerProjectSuccess(containerProject: ContainerProject): ReduxAction {
    return {
        type: "FETCH_CONTAINER_PROJECT_SUCCESS",
        data: containerProject,
    };
}

/* Databases */
export function fetchDatabase(id: string): ReduxAction {
    return {
        type: "FETCH_DATABASE",
        data: id,
    };
}
export function fetchDatabaseSuccess(database: Database): ReduxAction {
    return {
        type: "FETCH_DATABASE_SUCCESS",
        data: database,
    };
}

/* Uptime endpoints */
export function createUptimeEndpoint(name: string, host?: string, requestEndpoint?: string): ReduxAction {
    return {
        type: "CREATE_UPTIME_ENDPOINT",
        data: { name, host, requestEndpoint },
    };
}
export function createUptimeEndpointSuccess(endpoint: UptimeEndpoint): ReduxAction {
    return {
        type: "CREATE_UPTIME_ENDPOINT_SUCCESS",
        data: endpoint,
    };
}
export function editUptimeEndpoint(edit: UptimeEndpointEdit): ReduxAction {
    return {
        type: "EDIT_UPTIME_ENDPOINT",
        data: edit
    };
}
export function editUptimeEndpointSuccess(endpoint: UptimeEndpoint): ReduxAction {
    return {
        type: "EDIT_UPTIME_ENDPOINT_SUCCESS",
        data: endpoint,
    };
}
export function fetchUptimeEndpoint(id: string): ReduxAction {
    return {
        type: "FETCH_UPTIME_ENDPOINT",
        data: id,
    };
}
export function fetchUptimeEndpointSuccess(endpoint: UptimeEndpoint): ReduxAction {
    return {
        type: "FETCH_UPTIME_ENDPOINT_SUCCESS",
        data: endpoint,
    };
}

export function fetchAllUptimeEndpointsStructured(): ReduxAction {
    return {
        type: "FETCH_ALL_UPTIME_ENDPOINTS_STRUCTURED",
        data: {},
    };
}
export function fetchAllUptimeEndpointsStructuredSuccess(endpoints: UptimeEndpointStructured[]): ReduxAction {
    return {
        type: "FETCH_ALL_UPTIME_ENDPOINTS_STRUCTURED_SUCCESS",
        data: endpoints,
    };
}

/* Daemon Tokens */
export function createServerDaemonToken(id: string): ReduxAction {
    return {
        type: "CREATE_SERVER_DAEMON_TOKEN",
        data: id,
    };
}
export function createServerDaemonTokenSuccess(token: DaemonToken): ReduxAction {
    return {
        type: "CREATE_SERVER_DAEMON_TOKEN_SUCCESS",
        data: token,
    };
}

export function deleteDaemonToken(id: string): ReduxAction {
    return {
        type: "DELETE_DAEMON_TOKEN",
        data: id,
    };
}
export function deleteDaemonTokenSuccess(id: string): ReduxAction {
    return {
        type: "DELETE_DAEMON_TOKEN_SUCCESS",
        data: id,
    };
}

export function fetchServerDaemonTokens(id: string): ReduxAction {
    return {
        type: "FETCH_SERVER_DAEMON_TOKENS",
        data: id,
    };
}
export function fetchServerDaemonTokensSuccess(tokens: DaemonToken[]): ReduxAction {
    return {
        type: "FETCH_SERVER_DAEMON_TOKENS_SUCCESS",
        data: tokens,
    };
}

/* Websocket */
export function connectWebsocket(): ReduxAction {
    return {
        type: "CONNECT_WEBSOCKET",
        data: {},
    };
}
export function fetchAllDaemonsSuccess(daemons: Daemon[]): ReduxAction {
    return {
        type: "FETCH_ALL_DAEMONS_SUCCESS",
        data: daemons,
    };
}
export function daemonRequestResources(id: string, resources: string[]): ReduxAction {
    return {
        type: "DAEMON_REQUEST_RESOURCES",
        data: { id, resources },
    };
}
export function daemonRequestDatabaseBackup(id: string, database: string): ReduxAction {
    return {
        type: "DAEMON_REQUEST_DATABASE_BACKUP",
        data: { id, database },
    };
}