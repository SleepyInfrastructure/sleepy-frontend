/* Types */
type AlmostAllProps = {
    session: Session;
    servers: Map<string, Server>;
    serverConfigs: Map<string, ServerConfig>;
    networks: Map<string, Network>;
    disks: Map<string, Disk>;
    partitions: Map<string, Partition>;
    containers: Map<string, Container>;
    databases: Map<string, Database>;
    statistics: Map<string, Statistic>;
    diskStatistics: Map<string, DiskStatistic>;
    daemons: Map<string, Daemon>;
    actions: ConnectedActions;
};

type HomeConnectedProps = AlmostAllProps & {
    path: string;
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
    users: Map<string, User>;
    servers: Map<string, Server>;
    networks: Map<string, Network>;

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
    servers: Map<string, Server>;

    actions: ConnectedActions;
};

type ServerRouteConnectedProps = AlmostAllProps & {
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



