type Container = {
    id: string;
    author: string | null;
    server: string;
    parent: string | null;
    image: string;
    creation: number;
    ports: string;
    status: string;
    names: string;
    mounts: string;
    networks: string;
};

type ContainerStructured = Container & {
    statistics: ContainerStatistic[];
};

type ContainerStatistic = {
    id: string;
    author: string;
    parent: string;
    timestamp: number;
    rx: number;
    tx: number;
    cpu: number;
    memory: number;
    read: number;
    write: number;
};

type ContainerProject = {
    id: string;
    author: string | null;
    server: string;
    name: string;
    status: string;
    path: string;
};

type ContainerProjectStructured = ContainerProject & {
    containers: ContainerStructured[];
};