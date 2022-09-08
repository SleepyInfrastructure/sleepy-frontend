import { bindActionCreators } from "redux";

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
    daemons: new Map(),
    daemonTokens: new Map(),
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

export function cacheResource(state: ReduxState, resource: any, resourceType: ResourceType): ReduxState {
    return cacheResources(state, [ resource ], resourceType);
}

export function cacheResources(state: ReduxState, resources: any[], resourceType: ResourceType): ReduxState {
    switch (resourceType) {
        case ResourceType.SERVER: {
            const newResources = new Map(state.servers);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, servers: newResources };
        }
        
        case ResourceType.SERVER_STRUCTURED: {
            const newServers = new Map(state.servers);
            resources.forEach(server => {
                state = cacheResource(state, server.config, ResourceType.SERVER_CONFIG);
                delete server.config;
                state = cacheResource(state, server.network, ResourceType.NETWORK);
                delete server.network;
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

        case ResourceType.SERVER_CONFIG: {
            const newResources = new Map(state.serverConfigs);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, serverConfigs: newResources };
        }

        case ResourceType.NETWORK: {
            const newResources = new Map(state.networks);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, networks: newResources };
        }

        case ResourceType.SOFTWARE: {
            const newResources = new Map(state.software);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, software: newResources };
        }

        case ResourceType.DISK: {
            const newResources = new Map(state.disks);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, disks: newResources };
        }
        
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

        case ResourceType.DISK_STATISTIC: {
            const newResources = new Map(state.diskStatistics);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, diskStatistics: newResources };
        }

        case ResourceType.PARTITION: {
            const newResources = new Map(state.partitions);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, partitions: newResources };
        }

        case ResourceType.ZFS_POOL: {
            const newResources = new Map(state.zfsPools);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, zfsPools: newResources };
        }
        
        case ResourceType.ZFS_POOL_STRUCTURED: {
            const newZfsPools = new Map(state.zfsPools);
            resources.forEach(pool => {
                state = cacheResources(state, pool.partitions, ResourceType.ZFS_PARTITION);
                delete pool.partitions;
                newZfsPools.set(pool.id, pool);
            });

            return { ...state, zfsPools: newZfsPools };
        }

        case ResourceType.ZFS_PARTITION: {
            const newResources = new Map(state.zfsPartitions);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, zfsPartitions: newResources };
        }

        case ResourceType.CONTAINER: {
            const newResources = new Map(state.containers);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, containers: newResources };
        }
        
        case ResourceType.CONTAINER_STRUCTURED: {
            const newContainers = new Map(state.containers);
            resources.forEach(container => {
                state = cacheResources(state, container.statistics, ResourceType.CONTAINER_STATISTIC);
                delete container.statistics;
                newContainers.set(container.id, container);
            });

            return { ...state, containers: newContainers };
        }

        case ResourceType.CONTAINER_STATISTIC: {
            const newResources = new Map(state.containerStatistics);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, containerStatistics: newResources };
        }

        case ResourceType.CONTAINER_PROJECT: {
            const newResources = new Map(state.containerProjects);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, containerProjects: newResources };
        }

        case ResourceType.DATABASE: {
            const newResources = new Map(state.databases);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, databases: newResources };
        }

        case ResourceType.STATISTIC: {
            const newResources = new Map(state.statistics);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, statistics: newResources };
        }

        case ResourceType.UPTIME_ENDPOINT: {
            const newResources = new Map(state.uptimeEndpoints);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, uptimeEndpoints: newResources };
        }

        case ResourceType.UPTIME_ENDPOINT_STRUCTURED: {
            const newEndpoints = new Map(state.uptimeEndpoints);
            resources.forEach(endpoint => {
                state = cacheResources(state, endpoint.statistics, ResourceType.UPTIME_ENDPOINT_STATISTIC)
                delete endpoint.statistics;
                newEndpoints.set(endpoint.id, endpoint);
            });

            return { ...state, uptimeEndpoints: newEndpoints };
        }

        case ResourceType.UPTIME_ENDPOINT_STATISTIC: {
            const newResources = new Map(state.uptimeEndpointStatistics);
            resources.forEach(resource => {
                newResources.set(resource.server, resource);
            });
            return { ...state, uptimeEndpointStatistics: newResources };
        }

        case ResourceType.DAEMON: {
            const newResources = new Map(state.daemons);
            resources.forEach(resource => {
                newResources.set(resource.server, resource);
            });
            return { ...state, daemons: newResources };
        }

        case ResourceType.DAEMON_TOKEN: {
            const newResources = new Map(state.daemonTokens);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, daemonTokens: newResources };
        }
    }

    return state;
}
