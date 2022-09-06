/* Base */
type HeaderConnectedProps = {
    session: Session | null;
    actions: ConnectedActions;
};

type ServerConnectedProps = {
    item: Server;
    config: ServerConfig | null;
    network: Network | null;
    disks: DiskConnectedPropsItem[];
    zfsPools: ZFSPoolConnectedPropsItem[];
    containers: ContainerStructured[];
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
    item: DiskConnectedPropsItem;
    actions: ConnectedActions;
};

type DiskConnectedPropsItem = Omit<DiskStructured, "partitions"> & {
    partitions: PartitionConnectedPropsItem[];
};

type PartitionConnectedProps = {
    item: PartitionConnectedPropsItem;
    actions: ConnectedActions;
};

type PartitionConnectedPropsItem = {
    id: string;
    name: string;
    size: number;
    used: number | null;
    zfs?: string;
};

type ZFSPoolConnectedProps = {
    item: ZFSPoolConnectedPropsItem;
    actions: ConnectedActions;
};

type ZFSPoolConnectedPropsItem = Omit<ZFSPoolStructured, "partitions"> & {
    partitions: ZFSPartitionConnectedPropsItem[];
};

type ZFSPartitionConnectedPropsItem = ZFSPartition & {
    partition?: Partition;
};

type ContainerConnectedProps = {
    item: ContainerStructured;
    dark?: boolean;
    actions: ConnectedActions;
};

type ContainerProjectStats = {
    cpu: number;
    memory: number;
    network: number;
    disk: number;
    status: string;
    time: number;
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
    item: DiskConnectedPropsItem;
};

type NetworkChartConnectedProps = {
    statistics: Statistic[];
};

type UptimeEndpointChartConnectedProps = {
    item: UptimeEndpointStructured;
};