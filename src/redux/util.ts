import { bindActionCreators, Dispatch } from "redux";
import { AppPreferencesTheme } from "../ts/const";

export const INITIAL: ReduxState = {
    session: null,
    users: new Map(),
    servers: new Map(),
    serverConfigs: new Map(),
    networks: new Map(),
    software: new Map(),
    disks: new Map(),
    partitions: new Map(),
    zfsPools: new Map(),
    zfsPartitions: new Map(),
    containers: new Map(),
    containerStatistics: new Map(),
    containerProjects: new Map(),
    databases: new Map(),
    uptimeEndpoints: new Map(),
    statistics: new Map(),
    diskStatistics: new Map(),
    uptimeEndpointStatistics: new Map(),
    tasks: new Map(),
    userFiles: new Map(),
    daemons: new Map(),
    daemonTokens: new Map(),
    preferences: {
        theme: AppPreferencesTheme.DARK
    }
};
export enum ResourceType {
    USER = "user",
    SERVER = "server",
    SERVER_CONFIG = "server-config",
    SERVER_STRUCTURED = "server-structured",
    NETWORK = "network",
    SOFTWARE = "software",
    DISK = "disk",
    DISK_STRUCTURED = "disk-structured",
    DISK_STATISTIC = "disk-statistic",
    PARTITION = "partition",
    ZFS_POOL = "zfs-pool",
    ZFS_POOL_STRUCTURED = "zfs-pool-structured",
    ZFS_PARTITION = "zfs-partition",
    CONTAINER = "container",
    CONTAINER_STRUCTURED = "container-structured",
    CONTAINER_STATISTIC = "container-statistic",
    CONTAINER_PROJECT = "container-project",
    DATABASE = "database",
    STATISTIC = "statistic",
    UPTIME_ENDPOINT = "uptime-endpoint",
    UPTIME_ENDPOINT_STRUCTURED = "uptime-endpoint-structured",
    UPTIME_ENDPOINT_STATISTIC = "uptime-endpoint-statistic",
    TASK = "task",
    USER_FILE = "user-file",
    DAEMON = "deamon",
    DAEMON_TOKEN = "deamonToken",
    UNKNOWN = "unknown",
}

export function mapState(state: ReduxState | undefined): ReduxState {
    if (state === undefined) {
        return INITIAL;
    }

    return state;
}

export function mapDispatch(actions: Record<string, any>): any {
    return (dispatch: any) => ({
        actions: { ...bindActionCreators(actions, dispatch) },
    });
}

export function saveResources(state: ReduxState, key: KeysOfType<ReduxState, Map<string, object>>, resources: any[]) {
    const newResources = new Map(state[key] as Map<string, object>);
    resources.forEach(resource => {
        newResources.set(resource.id, resource);
    });
    return { ...state, [key]: newResources };
}

export function cacheResource(state: ReduxState, resource: any, resourceType: ResourceType): ReduxState {
    return cacheResources(state, [ resource ], resourceType);
}

export function cacheResources(state: ReduxState, resources: any[], resourceType: ResourceType): ReduxState {
    switch (resourceType) {
        case ResourceType.SERVER:
            return saveResources(state, "servers", resources);
        
        case ResourceType.SERVER_STRUCTURED: {
            const newServers = new Map(state.servers);
            resources.forEach(server => {
                state = cacheResource(state, server.config, ResourceType.SERVER_CONFIG);
                delete server.config;
                state = cacheResource(state, server.network, ResourceType.NETWORK);
                server.network = server.network.id;
                state = cacheResources(state, server.software, ResourceType.SOFTWARE);
                delete server.software;
                state = cacheResources(state, server.disks, ResourceType.DISK_STRUCTURED);
                delete server.disks;
                state = cacheResources(state, server.zfsPools, ResourceType.ZFS_POOL_STRUCTURED);
                delete server.zfsPools;
                state = cacheResources(state, server.containers, ResourceType.CONTAINER_STRUCTURED);
                delete server.containers;
                state = cacheResources(state, server.containerProjects, ResourceType.CONTAINER_PROJECT);
                delete server.containerProjects;
                state = cacheResources(state, server.databases, ResourceType.DATABASE);
                delete server.databases;
                state = cacheResources(state, server.statistics, ResourceType.STATISTIC);
                delete server.statistics;

                newServers.set(server.id, server);
            });

            return { ...state, servers: newServers };
        }

        case ResourceType.SERVER_CONFIG:
            return saveResources(state, "serverConfigs", resources);

        case ResourceType.NETWORK:
            return saveResources(state, "networks", resources);

        case ResourceType.SOFTWARE:
            return saveResources(state, "software", resources);

        case ResourceType.DISK:
            return saveResources(state, "disks", resources);
        
        case ResourceType.DISK_STRUCTURED: {
            const newDisks = new Map(state.disks);
            resources.forEach(disk => {
                state = cacheResources(state, disk.partitions, ResourceType.PARTITION);
                delete disk.partitions;
                state = cacheResources(state, disk.statistics, ResourceType.DISK_STATISTIC);
                delete disk.statistics;
                newDisks.set(disk.id, disk);
            });

            return { ...state, disks: newDisks };
        }

        case ResourceType.DISK_STATISTIC:
            return saveResources(state, "diskStatistics", resources);

        case ResourceType.PARTITION:
            return saveResources(state, "partitions", resources);

        case ResourceType.ZFS_POOL:
            return saveResources(state, "zfsPools", resources);
        
        case ResourceType.ZFS_POOL_STRUCTURED: {
            const newZfsPools = new Map(state.zfsPools);
            resources.forEach(pool => {
                state = cacheResources(state, pool.partitions, ResourceType.ZFS_PARTITION);
                delete pool.partitions;
                newZfsPools.set(pool.id, pool);
            });

            return { ...state, zfsPools: newZfsPools };
        }

        case ResourceType.ZFS_PARTITION:
            return saveResources(state, "zfsPartitions", resources);

        case ResourceType.CONTAINER:
            return saveResources(state, "containers", resources);
        
        case ResourceType.CONTAINER_STRUCTURED: {
            const newContainers = new Map(state.containers);
            resources.forEach(container => {
                state = cacheResources(state, container.statistics, ResourceType.CONTAINER_STATISTIC);
                delete container.statistics;
                newContainers.set(container.id, container);
            });

            return { ...state, containers: newContainers };
        }

        case ResourceType.CONTAINER_STATISTIC:
            return saveResources(state, "containerStatistics", resources);

        case ResourceType.CONTAINER_PROJECT:
            return saveResources(state, "containerProjects", resources);

        case ResourceType.DATABASE:
            return saveResources(state, "databases", resources);

        case ResourceType.STATISTIC:
            return saveResources(state, "statistics", resources);

        case ResourceType.UPTIME_ENDPOINT:
            return saveResources(state, "uptimeEndpoints", resources);

        case ResourceType.UPTIME_ENDPOINT_STRUCTURED: {
            const newEndpoints = new Map(state.uptimeEndpoints);
            resources.forEach(endpoint => {
                state = cacheResources(state, endpoint.statistics, ResourceType.UPTIME_ENDPOINT_STATISTIC)
                delete endpoint.statistics;
                newEndpoints.set(endpoint.id, endpoint);
            });

            return { ...state, uptimeEndpoints: newEndpoints };
        }

        case ResourceType.UPTIME_ENDPOINT_STATISTIC:
            return saveResources(state, "uptimeEndpointStatistics", resources);

        case ResourceType.TASK:
            return saveResources(state, "tasks", resources);

        case ResourceType.USER_FILE:
            return saveResources(state, "userFiles", resources);

        case ResourceType.DAEMON:
            return saveResources(state, "daemons", resources);

        case ResourceType.DAEMON_TOKEN:
            return saveResources(state, "daemonTokens", resources);
    }

    return state;
}

export async function reducerFetch<T, J>(dispatch: Dispatch<ReduxAction>, data: T, fetchFunc: (data: T) => Promise<J | undefined>, successFunc: (resource: J) => ReduxAction) {
    const resource = await fetchFunc(data);
    if (resource === undefined) {
        return;
    }

    dispatch(successFunc(resource));
}

export async function reducerFetchMultiple<T, J>(dispatch: Dispatch<ReduxAction>, data: T, fetchFunc: (data: T) => Promise<J[]>, successFunc: (resource: J[]) => ReduxAction) {
    const resources = await fetchFunc(data);
    dispatch(successFunc(resources));
}