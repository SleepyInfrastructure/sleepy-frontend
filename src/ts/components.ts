/* Base */
type HeaderConnectedProps = {
    session: Session;
    actions: ConnectedActions;
};

type ServerConnectedProps = {
    item: Server;
    config: ServerConfig | null;
    network: Network | null;
    disks: DiskWithPartitionsStructured[];
    containers: Container[];
    containerProjects: ContainerProject[];
    databases: Database[];
    statistics: Statistic[];
    daemon: Daemon | null;
    actions: ConnectedActions;
};

type TokenServerConnectedProps = {
    item: Server;
    daemonTokens: DaemonToken[];
    actions: ConnectedActions;
};

type DiskConnectedProps = {
    item: DiskWithPartitions;
    actions: ConnectedActions;
};

type PartitionConnectedProps = {
    item: Partition;
    actions: ConnectedActions;
};

type ContainerConnectedProps = {
    item: Container;
    actions: ConnectedActions;
};

type ContainerProjectConnectedProps = {
    item: ContainerProjectStructured;
    actions: ConnectedActions;
};

type DatabaseConnectedProps = {
    item: Database;
    actions: ConnectedActions;
};

type UptimeEndpointConnectedProps = {
    item: UptimeEndpointStructured;
    actions: ConnectedActions;
};

/* Charts */
type CPUChartConnectedProps = {
    statistics: Statistic[];
};

type MemoryChartConnectedProps = {
    item: Server;
    statistics: Statistic[];
};

type DiskChartConnectedProps = {
    item: DiskWithPartitionsStructured;
};

type NetworkChartConnectedProps = {
    statistics: Statistic[];
};

type UptimeEndpointChartConnectedProps = {
    item: UptimeEndpointStructured;
};