function getAction(type: string, data: any): ReduxAction {
    return {
        type, data
    }
}

/* Preferences */
export function fetchPreferences(): ReduxAction {
    return getAction("FETCH_PREFERENCES", {});
}

/* Users */
export function createUser(create: UserCreate): ReduxAction {
    return getAction("CREATE_USER", create);
}
export function createUserSuccess(user: User): ReduxAction {
    return getAction("CREATE_USER_SUCCESS", user);
}
export function fetchUser(id: string): ReduxAction {
    return getAction("FETCH_USER", id);
}
export function fetchUserSuccess(user: User): ReduxAction {
    return getAction("FETCH_USER_SUCCESS", user);
}

/* Sessions */
export function createSession(type: string, username?: string, password?: string): ReduxAction {
    return getAction("CREATE_SESSION", { type, username, password });
}
export function createSessionSuccess(session: Session): ReduxAction {
    return getAction("CREATE_SESSION_SUCCESS", session);
}
export function deleteSession(): ReduxAction {
    return getAction("DELETE_SESSION", {});
}

/* Servers */
export function createServer(create: ServerCreate): ReduxAction {
    return getAction("CREATE_SERVER", create);
}
export function createServerSuccess(server: Server): ReduxAction {
    return getAction("CREATE_SERVER_SUCCESS", server);
}
export function editServer(edit: ServerEdit): ReduxAction {
    return getAction("EDIT_SERVER", edit);
}
export function editServerSuccess(server: Server): ReduxAction {
    return getAction("EDIT_SERVER_SUCCESS", server);
}
export function deleteServer(id: string): ReduxAction {
    return getAction("DELETE_SERVER", id);
}
export function deleteServerSuccess(id: string): ReduxAction {
    return getAction("DELETE_SERVER_SUCCESS", id);
}
export function fetchServer(id: string): ReduxAction {
    return getAction("FETCH_SERVER", id);
}
export function fetchServerSuccess(server: Server): ReduxAction {
    return getAction("FETCH_SERVER_SUCCESS", server);
}
export function fetchServerStructured(id: string): ReduxAction {
    return getAction("FETCH_SERVER_STRUCTURED", id);
}
export function fetchServerStructuredSuccess(serverStructured: ServerStructured): ReduxAction {
    return getAction("FETCH_SERVER_STRUCTURED_SUCCESS", serverStructured);
}

export function fetchAllServersStructured(): ReduxAction {
    return getAction("FETCH_ALL_SERVERS_STRUCTURED", {});
}
export function fetchAllServersStructuredSuccess(servers: ServerStructured[]): ReduxAction {
    return getAction("FETCH_ALL_SERVERS_STRUCTURED_SUCCESS", servers);
}

/* Networks */
export function createNetwork(create: NetworkCreate): ReduxAction {
    return getAction("CREATE_NETWORK", create);
}
export function createNetworkSuccess(network: Network): ReduxAction {
    return getAction("CREATE_NETWORK_SUCCESS", network);
}
export function editNetwork(edit: NetworkEdit): ReduxAction {
    return getAction("EDIT_NETWORK", edit);
}
export function editNetworkSuccess(network: Network): ReduxAction {
    return getAction("EDIT_NETWORK_SUCCESS", network);
}
export function fetchNetwork(id: string): ReduxAction {
    return getAction("FETCH_NETWORK", id);
}
export function fetchNetworkSuccess(network: Network): ReduxAction {
    return getAction("FETCH_NETWORK_SUCCESS", network);
}

/* Disks */
export function fetchDisk(id: string): ReduxAction {
    return getAction("FETCH_DISK", id);
}
export function fetchDiskSuccess(disk: Disk): ReduxAction {
    return getAction("FETCH_DISK_SUCCESS", disk);
}

/* Partitions */
export function fetchPartition(id: string): ReduxAction {
    return getAction("FETCH_PARTITION", id);
}
export function fetchPartitionSuccess(partition: Partition): ReduxAction {
    return getAction("FETCH_PARTITION_SUCCESS", partition);
}

/* Containers */
export function fetchContainer(id: string): ReduxAction {
    return getAction("FETCH_CONTAINER", id);
}
export function fetchContainerSuccess(container: Container): ReduxAction {
    return getAction("FETCH_CONTAINER_SUCCESS", container);
}

/* Container projects */
export function fetchContainerProject(id: string): ReduxAction {
    return getAction("FETCH_CONTAINER_PROJECT", id);
}
export function fetchContainerProjectSuccess(containerProject: ContainerProject): ReduxAction {
    return getAction("FETCH_CONTAINER_PROJECT_SUCCESS", containerProject);
}

/* Databases */
export function createDatabase(create: DatabaseCreate): ReduxAction {
    return getAction("CREATE_DATABASE", create);
}
export function createDatabaseSuccess(database: Database): ReduxAction {
    return getAction("CREATE_DATABASE_SUCCESS", database);
}
export function editDatabase(edit: DatabaseEdit): ReduxAction {
    return getAction("EDIT_DATABASE", edit);
}
export function editDatabaseSuccess(database: Database): ReduxAction {
    return getAction("EDIT_DATABASE_SUCCESS", database);
}
export function deleteDatabase(id: string): ReduxAction {
    return getAction("DELETE_DATABASE", id);
}
export function deleteDatabaseSuccess(id: string): ReduxAction {
    return getAction("DELETE_DATABASE_SUCCESS", id);
}
export function fetchDatabase(id: string): ReduxAction {
    return getAction("FETCH_DATABASE", id);
}
export function fetchDatabaseSuccess(database: Database): ReduxAction {
    return getAction("FETCH_DATABASE_SUCCESS", database);
}

/* Uptime endpoints */
export function createUptimeEndpoint(name: string, host?: string, requestEndpoint?: string): ReduxAction {
    return getAction("CREATE_UPTIME_ENDPOINT", { name, host, requestEndpoint });
}
export function createUptimeEndpointSuccess(endpoint: UptimeEndpoint): ReduxAction {
    return getAction("CREATE_UPTIME_ENDPOINT_SUCCESS", endpoint);
}
export function editUptimeEndpoint(edit: UptimeEndpointEdit): ReduxAction {
    return getAction("EDIT_UPTIME_ENDPOINT", edit);
}
export function editUptimeEndpointSuccess(endpoint: UptimeEndpoint): ReduxAction {
    return getAction("EDIT_UPTIME_ENDPOINT_SUCCESS", endpoint);
}
export function deleteUptimeEndpoint(id: string): ReduxAction {
    return getAction("DELETE_UPTIME_ENDPOINT", id);
}
export function deleteUptimeEndpointSuccess(id: string): ReduxAction {
    return getAction("DELETE_UPTIME_ENDPOINT_SUCCESS", id);
}
export function fetchUptimeEndpoint(id: string): ReduxAction {
    return getAction("FETCH_UPTIME_ENDPOINT", id);
}
export function fetchUptimeEndpointSuccess(endpoint: UptimeEndpoint): ReduxAction {
    return getAction("FETCH_UPTIME_ENDPOINT_SUCCESS", endpoint);
}

export function fetchAllUptimeEndpointsStructured(): ReduxAction {
    return getAction("FETCH_ALL_UPTIME_ENDPOINTS_STRUCTURED", {});
}
export function fetchAllUptimeEndpointsStructuredSuccess(endpoints: UptimeEndpointStructured[]): ReduxAction {
    return getAction("FETCH_ALL_UPTIME_ENDPOINTS_STRUCTURED_SUCCESS", endpoints);
}

/* Tasks */
export function deleteTask(id: string): ReduxAction {
    return getAction("DELETE_TASK", id);
}
export function deleteTaskSuccess(id: string): ReduxAction {
    return getAction("DELETE_TASK_SUCCESS", id);
}
export function fetchTask(id: string): ReduxAction {
    return getAction("FETCH_TASK", id);
}
export function fetchTaskSuccess(task: Task): ReduxAction {
    return getAction("FETCH_TASK_SUCCESS", task);
}

export function fetchAllTasks(): ReduxAction {
    return getAction("FETCH_ALL_TASKS", {});
}
export function fetchAllTasksSuccess(tasks: Task[]): ReduxAction {
    return getAction("FETCH_ALL_TASKS_SUCCESS", tasks);
}

/* Tasks */
export function fetchUserFile(id: string): ReduxAction {
    return getAction("FETCH_USER_FILE", id);
}
export function fetchUserFileSuccess(file: UserFile): ReduxAction {
    return getAction("FETCH_USER_FILE_SUCCESS", file);
}

/* Daemon Tokens */
export function createServerDaemonToken(id: string): ReduxAction {
    return getAction("CREATE_SERVER_DAEMON_TOKEN", id);
}
export function createServerDaemonTokenSuccess(token: DaemonToken): ReduxAction {
    return getAction("CREATE_SERVER_DAEMON_TOKEN_SUCCESS", token);
}
export function deleteDaemonToken(id: string): ReduxAction {
    return getAction("DELETE_DAEMON_TOKEN", id);
}
export function deleteDaemonTokenSuccess(id: string): ReduxAction {
    return getAction("DELETE_DAEMON_TOKEN_SUCCESS", id);
}

export function fetchServerDaemonTokens(id: string): ReduxAction {
    return getAction("FETCH_SERVER_DAEMON_TOKENS", id);
}
export function fetchServerDaemonTokensSuccess(tokens: DaemonToken[]): ReduxAction {
    return getAction("FETCH_SERVER_DAEMON_TOKENS_SUCCESS", tokens);
}

/* Websocket */
export function connectWebsocket(): ReduxAction {
    return getAction("CONNECT_WEBSOCKET", {});
}
export function fetchAllDaemonsSuccess(daemons: Daemon[]): ReduxAction {
    return getAction("FETCH_ALL_DAEMONS_SUCCESS", daemons);
}
export function daemonRequestResources(id: string, resources: string[]): ReduxAction {
    return getAction("DAEMON_REQUEST_RESOURCES", { id, resources });
}
export function daemonRequestDatabaseBackup(id: string, database: string, data: boolean): ReduxAction {
    return getAction("DAEMON_REQUEST_DATABASE_BACKUP", { id, database, data });
}
export function daemonConnectContainerLog(id: string): ReduxAction {
    return getAction("DAEMON_CONNECT_CONTAINER_LOG", { id, project: false });
}
export function daemonConnectContainerProjectLog(id: string): ReduxAction {
    return getAction("DAEMON_CONNECT_CONTAINER_LOG", { id, project: true });
}
export function addContainerLog(id: string, message: string): ReduxAction {
    return getAction("ADD_CONTAINER_LOG", { id, message });
}