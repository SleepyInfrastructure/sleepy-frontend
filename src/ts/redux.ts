/* Base Types */
type ReduxAction = {
    type: string;
    data: any;
};

/* Types */
type ReduxState = {
    session: Session | null;
    users: Map<string, User>;
    servers: Map<string, Server>;
    serverConfigs: Map<string, ServerConfig>;
    networks: Map<string, Network>;
    disks: Map<string, Disk>;
    partitions: Map<string, Partition>;
    containers: Map<string, Container>;
    containerStatistics: Map<string, ContainerStatistic>;
    containerProjects: Map<string, ContainerProject>;
    databases: Map<string, Database>;
    uptimeEndpoints: Map<string, UptimeEndpoint>;
    statistics: Map<string, Statistic>;
    diskStatistics: Map<string, DiskStatistic>;
    uptimeEndpointStatistics: Map<string, UptimeEndpointStatistic>;
    daemons: Map<string, Daemon>;
    daemonTokens: Map<string, DaemonToken>;
};

type ConnectedActions = {
    createUser(username: string, password: string): ReduxAction;
    fetchUser(id: string): ReduxAction;
    createSession(type: string, username?: string, password?: string): ReduxAction;
    deleteSession(): ReduxAction;
    createServer(name: string): ReduxAction;
    editServer(edit: ServerEdit): ReduxAction;
    fetchServer(id: string): ReduxAction;
    fetchServerStructured(id: string): ReduxAction;
    fetchAllServersStructured(): ReduxAction;
    fetchNetwork(id: string): ReduxAction;
    fetchDisk(id: string): ReduxAction;
    fetchAllDisksStructured(): ReduxAction;
    fetchPartition(id: string): ReduxAction;
    fetchContainer(id: string): ReduxAction;
    fetchAllContainersStructured(): ReduxAction;
    fetchContainerProject(id: string): ReduxAction;
    fetchDatabase(id: string): ReduxAction;
    createUptimeEndpoint(name: string, host?: string, requestEndpoint?: string): ReduxAction;
    editUptimeEndpoint(edit: UptimeEndpointEdit): ReduxAction;
    fetchUptimeEndpoint(id: string): ReduxAction;
    fetchAllUptimeEndpointsStructured(): ReduxAction;
    connectWebsocket(): ReduxAction;
    daemonRequestRefresh(id: string): ReduxAction;
    daemonRequestDatabaseBackup(id: string, database: string): ReduxAction;
    createServerDaemonToken(id: string): ReduxAction;
    deleteDaemonToken(id: string): ReduxAction;
    fetchServerDaemonTokens(id: string): ReduxAction;
};
