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
    processes: Map<string, Process>;
    software: Map<string, ServerSoftware>;
    disks: Map<string, Disk>;
    partitions: Map<string, Partition>;
    zfsPools: Map<string, ZFSPool>;
    zfsPartitions: Map<string, ZFSPartition>;
    containers: Map<string, Container>;
    containerStatistics: Map<string, ContainerStatistic>;
    containerProjects: Map<string, ContainerProject>;
    containerLogs: Map<string, string[]>;
    databases: Map<string, Database>;
    smbInstances: Map<string, SMBInstance>;
    smbShares: Map<string, SMBShare>;
    smbUsers: Map<string, SMBUser>;
    nginxInstances: Map<string, NginxInstance>;
    nginxServers: Map<string, NginxServer>;
    nginxLocations: Map<string, NginxLocation>;
    uptimeEndpoints: Map<string, UptimeEndpoint>;
    statistics: Map<string, Statistic>;
    diskStatistics: Map<string, DiskStatistic>;
    uptimeEndpointStatistics: Map<string, UptimeEndpointStatistic>;
    tasks: Map<string, Task>;
    alerts: Map<string, Alert>;
    userFiles: Map<string, UserFile>;
    daemons: Map<string, Daemon>;
    daemonTokens: Map<string, DaemonToken>;
    publicServerListings: Map<string, PublicServerListing>;
    publicServers: Map<string, PublicServer>;
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
    fetchDiskStatistics(data: { id: string, type: string }): ReduxAction;
    fetchPartition(id: string): ReduxAction;

    fetchContainer(id: string): ReduxAction;
    fetchContainerProject(id: string): ReduxAction;

    createDatabase(create: DatabaseCreate): ReduxAction;
    editDatabase(edit: DatabaseEdit): ReduxAction;
    deleteDatabase(id: string): ReduxAction;
    fetchDatabase(id: string): ReduxAction;

    createSmbInstance(create: SMBInstanceCreate): ReduxAction;
    editSmbInstance(edit: SMBInstanceEdit): ReduxAction;
    deleteSmbInstance(id: string): ReduxAction;
    fetchSmbInstance(id: string): ReduxAction;
    createSmbShare(create: SMBShareCreate): ReduxAction;
    editSmbShare(edit: SMBShareEdit): ReduxAction;
    deleteSmbShare(id: string): ReduxAction;
    fetchSmbShare(id: string): ReduxAction;
    createSmbUser(create: SMBUserCreate): ReduxAction;
    editSmbUser(edit: SMBUserEdit): ReduxAction;
    deleteSmbUser(id: string): ReduxAction;
    fetchSmbUser(id: string): ReduxAction;
    
    createNginxInstance(create: NginxInstanceCreate): ReduxAction;
    editNginxInstance(edit: NginxInstanceEdit): ReduxAction;
    deleteNginxInstance(id: string): ReduxAction;
    fetchNginxInstance(id: string): ReduxAction;
    createNginxServer(create: NginxServerCreate): ReduxAction;
    editNginxServer(edit: NginxServerEdit): ReduxAction;
    deleteNginxServer(id: string): ReduxAction;
    fetchNginxServer(id: string): ReduxAction;
    createNginxLocation(create: NginxLocationCreate): ReduxAction;
    editNginxLocation(edit: NginxLocationEdit): ReduxAction;
    deleteNginxLocation(id: string): ReduxAction;
    fetchNginxLocation(id: string): ReduxAction;

    createUptimeEndpoint(create: UptimeEndpointCreate): ReduxAction;
    editUptimeEndpoint(edit: UptimeEndpointEdit): ReduxAction;
    deleteUptimeEndpoint(id: string): ReduxAction;
    fetchUptimeEndpoint(id: string): ReduxAction;
    fetchAllUptimeEndpointsStructured(): ReduxAction;

    deleteTask(id: string): ReduxAction;
    fetchTask(id: string): ReduxAction;
    fetchAllTasks(): ReduxAction;

    fetchAllAlerts(): ReduxAction;

    fetchUserFile(id: string): ReduxAction;

    createServerDaemonToken(id: string): ReduxAction;
    deleteDaemonToken(id: string): ReduxAction;
    fetchServerDaemonTokens(id: string): ReduxAction;

    fetchPublicServerListings(): ReduxAction;
    fetchPublicServer(id: string): ReduxAction;

    connectWebsocket(): ReduxAction;
    daemonRequestResources(id: string, resources: string[]): ReduxAction;
    daemonRequestDatabaseBackup(id: string, database: string, data: boolean): ReduxAction;
    daemonRequestContainerLog(id: string): ReduxAction;
    daemonConnectContainerLog(id: string): ReduxAction;
    daemonConnectContainerProjectLog(id: string): ReduxAction;
    addContainerLog(id: string, message: string): ReduxAction;
    daemonRequestContainerAction(id: string, project: boolean, action: ContainerAction): ReduxAction;
    daemonBuildSmbConfig(id: string): ReduxAction;
    daemonBuildNginxConfig(id: string): ReduxAction;
};