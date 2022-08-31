/* Types */
type AppConnectedProps = {
    session: Session;
    users: Map<string, User>;
    servers: Map<string, Server>;
    serverConfigs: Map<string, ServerConfig>;
    networks: Map<string, Network>;
    disks: Map<string, Disk>;
    partitions: Map<string, Partition>;
    containers: Map<string, Container>;
    containerProjects: Map<string, ContainerProject>;
    databases: Map<string, Database>;
    uptimeEndpoints: Map<string, UptimeEndpoint>;
    uptimeEndpointStatistics: Map<string, UptimeEndpointStatistic>;
    statistics: Map<string, Statistic>;
    diskStatistics: Map<string, DiskStatistic>;
    daemons: Map<string, Daemon>;
    daemonTokens: Map<string, DaemonToken>;

    actions: ConnectedActions;
};
