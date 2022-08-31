/* Types */
type ServersProps = {
    session: Session;
    servers: Map<string, Server>;
    serverConfigs: Map<string, ServerConfig>;
    networks: Map<string, Network>;
    disks: Map<string, Disk>;
    partitions: Map<string, Partition>;
    containers: Map<string, Container>;
    containerProjects: Map<string, ContainerProject>;
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

type LoginConnectedProps = {
    path: string;
    actions: ConnectedActions;
};

type RegisterConnectedProps = {
    path: string;
    actions: ConnectedActions;
};

type SettingsConnectedProps = {
    path: string;
    session: Session;

    actions: ConnectedActions;
};

type TokensConnectedProps = {
    path: string;
    session: Session;
    servers: Map<string, Server>;
    daemonTokens: Map<string, DaemonToken>;

    actions: ConnectedActions;
};

type CreateServerConnectedProps = {
    path: string;
    session: Session;
    servers: Map<string, Server>;

    actions: ConnectedActions;
};

type EditServerConnectedProps = {
    path: string;
    id?: string;
    session: Session;
    servers: Map<string, Server>;

    actions: ConnectedActions;
};

type ServerRouteConnectedProps = ServersProps & {
    path: string;
    id?: string;
};

type InstallingDaemonConnectedProps = {
    path: string;
    id?: string;
    session: Session;
    servers: Map<string, Server>;
    daemonTokens: Map<string, DaemonToken>;

    actions: ConnectedActions;
};

type CreateUptimeEndpointConnectedProps = {
    path: string;
    session: Session;
    uptimeEndpoints: Map<string, UptimeEndpoint>;

    actions: ConnectedActions;
};

type EditUptimeEndpointConnectedProps = {
    path: string;
    id?: string;
    session: Session;
    uptimeEndpoints: Map<string, UptimeEndpoint>;

    actions: ConnectedActions;
};



