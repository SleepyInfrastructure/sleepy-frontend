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
    software: Software[];
    disks: DiskStructured[];
    zfsPools: ZFSPoolStructured[];
    containers: ContainerStructured[];
    databases: Database[];
    smb: SMBInstanceStructured[];
};

type StatisticType = "MINUTE" | "HOUR" | "DAY" | "MONTH" | "YEAR";
type Statistic = {
    id: string;
    author: string;
    server: string;
    timestamp: number;
    type: StatisticType;
    cpuSystem: number;
    cpuUser: number;
    rx: number;
    tx: number;
    memory: number;
    swap: number;
};

type Software = {
    name: string;
    version: string;
};

type Database = {
    id: string;
    author: string | null;
    server: string;
    name: string;
    credentials: boolean;
};

/* Calls */
type ServerCreate = {
    name: string;
    color: string;
}; 

type ServerEdit = ServerCreate & {
    id: string;
}; 