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
    software: Map<string, Software>;
    disks: Map<string, Disk>;
    partitions: Map<string, Partition>;
    zfsPools: Map<string, ZFSPool>;
    zfsPartitions: Map<string, ZFSPartition>;
    containers: Map<string, Container>;
    containerStatistics: Map<string, ContainerStatistic>;
    containerProjects: Map<string, ContainerProject>;
    containerLogs: Map<string, string[]>;
    databases: Map<string, Database>;
    uptimeEndpoints: Map<string, UptimeEndpoint>;
    statistics: Map<string, Statistic>;
    diskStatistics: Map<string, DiskStatistic>;
    uptimeEndpointStatistics: Map<string, UptimeEndpointStatistic>;
    tasks: Map<string, Task>;
    userFiles: Map<string, UserFile>;
    daemons: Map<string, Daemon>;
    daemonTokens: Map<string, DaemonToken>;
    preferences: AppPreferences;
};

type ConnectedActions = {
    setDimensions(w: number, h: number): ReduxAction;
    fetchPreferences(): ReduxAction;
    createUser(create: UserCreate): ReduxAction;
    fetchUser(id: string): ReduxAction;
    createSession(type: string, username?: string, password?: string): ReduxAction;
    deleteSession(): ReduxAction;
    createServer(create: ServerCreate): ReduxAction;
    editServer(edit: ServerEdit): ReduxAction;
    deleteServer(id: string): ReduxAction;
    fetchServer(id: string): ReduxAction;
    fetchServerStatistics(data: { id: string, type: string }): ReduxAction;
    fetchServerStructured(id: string): ReduxAction;
    fetchAllServersStructured(): ReduxAction;
    createNetwork(create: NetworkCreate): ReduxAction;
    editNetwork(edit: NetworkEdit): ReduxAction;
    fetchNetwork(id: string): ReduxAction;
    fetchDisk(id: string): ReduxAction;
    fetchPartition(id: string): ReduxAction;
    fetchContainer(id: string): ReduxAction;
    fetchContainerProject(id: string): ReduxAction;
    createDatabase(create: DatabaseCreate): ReduxAction;
    editDatabase(edit: DatabaseEdit): ReduxAction;
    deleteDatabase(id: string): ReduxAction;
    fetchDatabase(id: string): ReduxAction;
    createUptimeEndpoint(create: UptimeEndpointCreate): ReduxAction;
    editUptimeEndpoint(edit: UptimeEndpointEdit): ReduxAction;
    deleteUptimeEndpoint(id: string): ReduxAction;
    fetchUptimeEndpoint(id: string): ReduxAction;
    fetchAllUptimeEndpointsStructured(): ReduxAction;
    deleteTask(id: string): ReduxAction;
    fetchTask(id: string): ReduxAction;
    fetchAllTasks(): ReduxAction;
    fetchUserFile(id: string): ReduxAction;
    connectWebsocket(): ReduxAction;
    daemonRequestResources(id: string, resources: string[]): ReduxAction;
    daemonRequestDatabaseBackup(id: string, database: string, data: boolean): ReduxAction;
    daemonRequestContainerLog(id: string): ReduxAction;
    daemonConnectContainerLog(id: string): ReduxAction;
    daemonConnectContainerProjectLog(id: string): ReduxAction;
    addContainerLog(id: string, message: string): ReduxAction;
    createServerDaemonToken(id: string): ReduxAction;
    deleteDaemonToken(id: string): ReduxAction;
    fetchServerDaemonTokens(id: string): ReduxAction;
};