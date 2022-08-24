/* Base Types */
type APIGetRequest = {
    path: string;
};

type APIPostRequest = {
    path: string;
    body: any;
};

type APIResponse = {
    status: number;
    body: any;
};

/* Types */
type Session = {
    id: string;
    user: string;
};

type User = {
    id: string;
    username: string;
};

type Server = {
    id: string;
    author: string;
    name: string;
    config: string;
    network: string | null;
    color: string;
    memory: number;
    swap: number;
};

type ServerConfig = {
    id: string;
    author: string;
    statsInterval: number;
    statsCleanAge: number;
    databaseBackupInterval: number | null;
};

type ServerStructured = Server & {
    config: ServerConfig;
    network: Network;
    disks: Disk[];
    partitions: Partition[];
    containers: Container[];
    databases: Database[];
    statistics: Statistic[];
};

type Statistic = {
    id: string;
    author: string;
    parent: string;
    timestamp: number;
    rx: number;
    tx: number;
    memory: number;
    swap: number;
};

type Network = {
    id: string;
    author: string | null;
    name: string;
    ipv4: string | null;
};

type Disk = {
    id: string;
    ptuuid: string | null;
    author: string | null;
    parent: string;
    name: string;
    ssd: boolean;
    size: number;
    model: string | null;
};

type DiskStructured = Disk & {
    statistics: DiskStatistic[];
};

type DiskStatistic = {
    id: string;
    author: string;
    parent: string;
    timestamp: number;
    read: number;
    write: number;
};

type Partition = {
    id: string;
    uuid: string | null;
    partuuid: string | null;
    author: string | null;
    parent: string;
    name: string;
    type: string;
    version: string | null;
    size: number;
    used: number | null;
    mountpoint?: string;
};

type DiskWithPartitions = Disk & {
    partitions: Partition[];
};

type DiskWithPartitionsStructured = DiskStructured & {
    partitions: Partition[];
};

type Container = {
    id: string;
    author: string | null;
    parent: string;
    image: string;
    creation: number;
    ports: string;
    status: string;
    names: string;
    mounts: string;
    networks: string;
};

type Database = {
    id: string;
    author: string | null;
    parent: string;
    name: string;
};

type Daemon = {
    author: string;
    server: string;
};

type DaemonToken = {
    id: string;
    author: string;
    server: string;
    timestamp: number;
    used: number;
};