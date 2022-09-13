/* Types */
type RouteProps = {
    path: string;
    session: Session | null;
    id?: string;
    actions: ConnectedActions;
};

type ServersProps = {
    session: Session | null;
    servers: Map<string, Server>;
    serverConfigs: Map<string, ServerConfig>;
    networks: Map<string, Network>;
    disks: Map<string, Disk>;
    partitions: Map<string, Partition>;
    zfsPools: Map<string, ZFSPool>;
    zfsPartitions: Map<string, ZFSPartition>;
    containers: Map<string, Container>;
    containerStatistics: Map<string, ContainerStatistic>;
    containerProjects: Map<string, ContainerProject>;
    containerLogs: Map<string, string[]>;
    databases: Map<string, Database>;
    statistics: Map<string, Statistic>;
    diskStatistics: Map<string, DiskStatistic>;
    daemons: Map<string, Daemon>;
    actions: ConnectedActions;
};

type HomeConnectedProps = ServersProps & {
    path: string;
    uptimeEndpoints: Map<string, UptimeEndpoint>;
    uptimeEndpointStatistics: Map<string, UptimeEndpointStatistic>;
};

type LoginConnectedProps = RouteProps;
type RegisterConnectedProps = RouteProps;
type SettingsConnectedProps = RouteProps;

type TokensConnectedProps = RouteProps & {
    servers: Map<string, Server>;
    daemonTokens: Map<string, DaemonToken>;
};

type TasksConnectedProps = RouteProps & AppConnectedProps;

type CreateServerConnectedProps = RouteProps & {
    servers: Map<string, Server>;
};
type EditServerConnectedProps = RouteProps & {
    servers: Map<string, Server>;
};
type InstallingDaemonConnectedProps = RouteProps & {
    servers: Map<string, Server>;
    daemonTokens: Map<string, DaemonToken>;
};
type ServerRouteConnectedProps = RouteProps & ServersProps;
type ContainerRouteConnectedProps = RouteProps & ServersProps;
type ContainerProjectRouteConnectedProps = RouteProps & ServersProps;

type CreateUptimeEndpointConnectedProps = RouteProps & {
    uptimeEndpoints: Map<string, UptimeEndpoint>;
};
type EditUptimeEndpointConnectedProps = RouteProps & {
    uptimeEndpoints: Map<string, UptimeEndpoint>;
};

type CreateDatabaseConnectedProps = RouteProps & {
    databases: Map<string, Database>;
};

type EditNetworkConnectedProps = RouteProps & {
    networks: Map<string, Network>;
};



