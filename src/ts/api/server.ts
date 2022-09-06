type Server = {
    id: string;
    author: string;
    name: string;
    config: string;
    network: string | null;
    color: string;
    memory: number;
    swap: number;
    netInterfaces: string[];
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
    disks: DiskStructured[];
    zfsPools: ZFSPoolStructured[];
    containers: ContainerStructured[];
    databases: Database[];
    statistics: Statistic[];
};

type Statistic = {
    id: string;
    author: string;
    server: string;
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

type Database = {
    id: string;
    author: string | null;
    server: string;
    name: string;
};

/* Edits */
type ServerEdit = {
    id: string;
    name: string;
}; 