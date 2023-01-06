/* Base */
type HeaderConnectedProps = {
    user: User | null;
    actions: ConnectedActions;
};
type PanelHeaderTagConnectedProps = {
    icon: string;
    tooltip: string;
    text?: string;
};
type SidebarConnectedProps = {
    servers: Map<string, Server>;
    uptimeEndpoints: Map<string, UptimeEndpoint>;
    alerts: number;
    tasks: number;
    actions: ConnectedActions;
};

/* Server */
type ServerConnectedProps = {
    item: Server;
    config: ServerConfig | null;
    network: Network | null;
    processes: Process[];
    software: ServerSoftware[];
    disks: DiskConnectedPropsItem[];
    zfs: ZFSPoolConnectedPropsItem[];
    containers: ContainerConnectedProps[];
    containerProjects: ContainerProjectConnectedProps[];
    databases: Database[];
    smb: SMBInstanceStructured[];
    nginx: NginxInstanceStructured[];
    public: PublicServerListing | null;
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
type PartitionConnectedPropsItem = Partition & {
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
    statistics: ContainerProjectStats;
    logs: string[];
    actions: ConnectedActions;
};
type ContainerProjectContentConnectedProps = ContainerProjectConnectedProps;

type DatabaseConnectedProps = {
    item: Database;
    actions: ConnectedActions;
};

type SMBInstanceConnectedProps = {
    item: SMBInstanceStructured;
    actions: ConnectedActions;
};
type SMBShareConnectedProps = {
    item: SMBShare;
    users: SMBUser[];
    actions: ConnectedActions;
};
type SMBUserConnectedProps = {
    item: SMBUser;
    actions: ConnectedActions;
};

type NginxInstanceConnectedProps = {
    item: NginxInstanceStructured;
    actions: ConnectedActions;
};
type NginxServerConnectedProps = {
    item: NginxServerStructured;
    actions: ConnectedActions;
};
type NginxLocationConnectedProps = {
    item: NginxLocation;
    actions: ConnectedActions;
};

type ProcessConnectedProps = {
    item: Process;
    actions: ConnectedActions;
};

type SoftwareConnectedProps = {
    item: ServerSoftware;
    actions: ConnectedActions;
};

type HardwareConnectedProps = {
    icon: string;
    name: string;
    data: { name: string; text: string; }[];
    actions: ConnectedActions;
};

type ProcessTreeMapConnectedProps = {
    server: Server;
    processes: Process[];
};

/* Public */
type PublicServerConnectedProps = {
    item: PublicServer;
    statistics: Statistic[];
    actions: ConnectedActions;
};

/* Uptime Endpoints */
type UptimeEndpointConnectedProps = {
    item: UptimeEndpointStructured;
    actions: ConnectedActions;
};

/* Tasks */
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

/* Alert */
type AlertConnectedProps = {
    item: Alert;
    object?: any;
    actions: ConnectedActions;
};
type AlertObjectConnectedProps = AlertConnectedProps;

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