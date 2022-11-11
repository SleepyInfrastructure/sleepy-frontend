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
    processes: Map<string, Process>;
    software: Map<string, ServerSoftware>;
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
    smbInstances: Map<string, SMBInstance>;
    smbShares: Map<string, SMBShare>;
    smbUsers: Map<string, SMBUser>;
    publicServerListings: Map<string, PublicServerListing>;
    statistics: Map<string, Statistic>;
    diskStatistics: Map<string, DiskStatistic>;
    daemons: Map<string, Daemon>;
    actions: ConnectedActions;
};

type HomeConnectedProps = RouteProps;
type PublicServersConnectedProps = RouteProps & {
    publicServerListings: Map<string, PublicServerListing>;
    publicServers: Map<string, PublicServer>;
    statistics: Map<string, Statistic>;
};

type LoginConnectedProps = RouteProps;
type RegisterConnectedProps = RouteProps;
type SettingsConnectedProps = RouteProps;
type TokensConnectedProps = RouteProps & {
    servers: Map<string, Server>;
    daemonTokens: Map<string, DaemonToken>;
};
type TasksConnectedProps = RouteProps & AppConnectedProps;
type AlertsConnectedProps = RouteProps & AppConnectedProps;

type OverviewConnectedProps = ServersProps & {
    path: string;
    uptimeEndpoints: Map<string, UptimeEndpoint>;
    uptimeEndpointStatistics: Map<string, UptimeEndpointStatistic>;
};
type CreateServerConnectedProps = RouteProps & {
    servers: Map<string, Server>;
};
type EditServerConnectedProps = CreateServerConnectedProps;
type InstallingDaemonConnectedProps = CreateServerConnectedProps & {
    daemonTokens: Map<string, DaemonToken>;
};
type ServerRouteConnectedProps = RouteProps & ServersProps;
type ContainerRouteConnectedProps = RouteProps & ServersProps;
type ContainerProjectRouteConnectedProps = RouteProps & ServersProps;

type CreateUptimeEndpointConnectedProps = RouteProps & {
    uptimeEndpoints: Map<string, UptimeEndpoint>;
};
type EditUptimeEndpointConnectedProps = CreateUptimeEndpointConnectedProps;

type CreateDatabaseConnectedProps = RouteProps & {
    databases: Map<string, Database>;
};
type CreateSMBInstanceConnectedProps = RouteProps & {
    smbInstances: Map<string, SMBInstance>;
};
type EditSMBInstanceConnectedProps = CreateSMBInstanceConnectedProps;
type CreateSMBShareConnectedProps = RouteProps & {
    smbShares: Map<string, SMBShare>;
    smbUsers: Map<string, SMBUser>;
};
type EditSMBShareConnectedProps = CreateSMBShareConnectedProps;
type CreateSMBUserConnectedProps = RouteProps & {
    smbUsers: Map<string, SMBUser>;
};
type EditSMBUserConnectedProps = CreateSMBUserConnectedProps;

type EditNetworkConnectedProps = RouteProps & {
    networks: Map<string, Network>;
};



