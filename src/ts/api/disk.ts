type Disk = {
    id: string;
    ptuuid: string | null;
    author: string | null;
    server: string;
    name: string;
    ssd: boolean;
    size: number;
    model: string | null;
};

type DiskStructured = Disk & {
    partitions: Partition[];
    statistics: DiskStatistic[];
};

type DiskStatistic = {
    id: string;
    author: string;
    parent: string;
    timestamp: number;
    type: StatisticType;
    read: number;
    write: number;
    readLatency: number;
    writeLatency: number;
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

/* ZFS */
type ZFSPool = {
    id: string;
    author: string | null;
    server: string;
    name: string;
    size: number;
    used: number;
    compression: string | null;
    compressRatio: number;
    encryption: boolean;
    atime: boolean;
    version: number;
    deduplication: boolean;
    relatime: boolean;
};

type ZFSPoolStructured = ZFSPool & {
    partitions: ZFSPartition[];
};

type ZFSPartition = {
    id: string;
    author: string | null;
    parent: string;
    server: string;
    device: string;
    size: number;
    used: number;
};