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
type ServerContentConnectedProps = ServerConnectedProps;
type ServerSectionsConnectedProps = ServerConnectedProps;
type TokenServerConnectedProps = {
    item: Server;
    daemonTokens: DaemonToken[];
    actions: ConnectedActions;
};

type NetworkConnectedProps = {
    item: Network;
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
    logs: string[];
    actions: ConnectedActions;
};
type ContainerContentConnectedProps = ContainerConnectedProps;
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
    logs: string[];
    actions: ConnectedActions;
};
type ContainerProjectContentConnectedProps = ContainerProjectConnectedProps;

type DatabaseConnectedProps = {
    item: Database;
    actions: ConnectedActions;
};

type UptimeEndpointConnectedProps = {
    item: UptimeEndpointStructured;
    actions: ConnectedActions;
};

type TaskConnectedProps = {
    item: Task;
    object?: any;
    result?: any;
    actions: ConnectedActions;
};
type TaskResultConnectedProps = TaskConnectedProps;
type TaskObjectConnectedProps = TaskConnectedProps;

type LogViewConnectedProps = {
    logs: string[];
    requestFile?: () => void;
    actions: ConnectedActions;
};

/* Charts */
type ChartConnectedProps = {
    statistics: Statistic[];
    type: StatisticType;
};
type CPUChartConnectedProps = ChartConnectedProps;
type MemoryChartConnectedProps = ChartConnectedProps & {
    memory: number;
    swap: number;
};
type DiskChartConnectedProps = {
    type: StatisticType;
    title: string;
    statistics: DiskStatistic[];
};
type NetworkChartConnectedProps = ChartConnectedProps;
type UptimeEndpointChartConnectedProps = {
    item: UptimeEndpointStructured;
};