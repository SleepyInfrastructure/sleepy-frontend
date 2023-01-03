import { bindActionCreators, Dispatch } from "redux";

export const INITIAL: ReduxState = {
    session: null,
    users: new Map(),
    servers: new Map(),
    serverConfigs: new Map(),
    processes: new Map(),
    networks: new Map(),
    software: new Map(),
    disks: new Map(),
    partitions: new Map(),
    zfsPools: new Map(),
    zfsPartitions: new Map(),
    containers: new Map(),
    containerStatistics: new Map(),
    containerProjects: new Map(),
    containerLogs: new Map(),
    databases: new Map(),
    smbInstances: new Map(),
    smbShares: new Map(),
    smbUsers: new Map(),
    nginxInstances: new Map(),
    nginxServers: new Map(),
    nginxLocations: new Map(),
    uptimeEndpoints: new Map(),
    statistics: new Map(),
    diskStatistics: new Map(),
    uptimeEndpointStatistics: new Map(),
    tasks: new Map(),
    alerts: new Map(),
    userFiles: new Map(),
    daemons: new Map(),
    daemonTokens: new Map(),
    publicServerListings: new Map(),
    publicServers: new Map(),
    preferences: {
        theme: "dark"
    }
};
export enum ResourceType {
    USER,
    SERVER, SERVER_STRUCTURED,
    SERVER_CONFIG,
    NETWORK,
    PROCESS,
    SOFTWARE,
    DISK, DISK_STRUCTURED, DISK_STATISTIC,
    PARTITION,
    ZFS_POOL, ZFS_POOL_STRUCTURED,
    ZFS_PARTITION,
    CONTAINER, CONTAINER_STRUCTURED, CONTAINER_STATISTIC,
    CONTAINER_PROJECT,
    DATABASE,
    SMB_INSTANCE, SMB_INSTANCE_STRUCTURED, SMB_SHARE, SMB_USER,
    NGINX_INSTANCE, NGINX_INSTANCE_STRUCTURED, NGINX_SERVER, NGINX_SERVER_STRUCTURED, NGINX_LOCATION,
    STATISTIC,
    UPTIME_ENDPOINT, UPTIME_ENDPOINT_STRUCTURED, UPTIME_ENDPOINT_STATISTIC,
    TASK,
    ALERT,
    USER_FILE,
    DAEMON, DAEMON_TOKEN,
    PUBLIC_SERVER_LISTING, PUBLIC_SERVER_STRUCTURED,
    UNKNOWN
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
        case ResourceType.USER:
            return saveResources(state, "users", resources);

        case ResourceType.SERVER:
            return saveResources(state, "servers", resources);
        
        case ResourceType.SERVER_STRUCTURED: {
            const newServers = new Map(state.servers);
            resources.forEach(server => {
                state = cacheResource(state, server.config, ResourceType.SERVER_CONFIG);
                delete server.config;
                state = cacheResource(state, server.network, ResourceType.NETWORK);
                server.network = server.network.id;

                state.processes.forEach(e => {
                    if(e.server === server.id) {
                        state.processes.delete(e.id);
                    }
                });

                state = cacheResources(state, server.processes, ResourceType.PROCESS);
                delete server.processes;

                state = cacheResources(state, server.software, ResourceType.SOFTWARE);
                delete server.software;
                state = cacheResources(state, server.disks, ResourceType.DISK_STRUCTURED);
                delete server.disks;
                state = cacheResources(state, server.zfs, ResourceType.ZFS_POOL_STRUCTURED);
                delete server.zfs;
                state = cacheResources(state, server.containers, ResourceType.CONTAINER_STRUCTURED);
                delete server.containers;
                state = cacheResources(state, server.containerProjects, ResourceType.CONTAINER_PROJECT);
                delete server.containerProjects;
                state = cacheResources(state, server.databases, ResourceType.DATABASE);
                delete server.databases;
                state = cacheResources(state, server.smb, ResourceType.SMB_INSTANCE_STRUCTURED);
                delete server.smb;
                state = cacheResources(state, server.nginx, ResourceType.NGINX_INSTANCE_STRUCTURED);
                delete server.nginx;
                if(server.public !== null) {
                    state = cacheResource(state, server.public, ResourceType.PUBLIC_SERVER_LISTING);
                    delete server.public;
                }

                newServers.set(server.id, server);
            });

            return { ...state, servers: newServers };
        }

        case ResourceType.SERVER_CONFIG:
            return saveResources(state, "serverConfigs", resources);

        case ResourceType.NETWORK:
            return saveResources(state, "networks", resources);

        case ResourceType.PROCESS:
            return saveResources(state, "processes", resources);

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

        case ResourceType.SMB_INSTANCE:
            return saveResources(state, "smbInstances", resources);
        
        case ResourceType.SMB_INSTANCE_STRUCTURED: {
            const newSmbInstances = new Map(state.smbInstances);
            resources.forEach(smbInstance => {
                state = cacheResources(state, smbInstance.shares, ResourceType.SMB_SHARE);
                delete smbInstance.shares;
                state = cacheResources(state, smbInstance.users, ResourceType.SMB_USER);
                delete smbInstance.users;
                newSmbInstances.set(smbInstance.id, smbInstance);
            });

            return { ...state, smbInstances: newSmbInstances };
        }

        case ResourceType.SMB_SHARE:
            return saveResources(state, "smbShares", resources);

        case ResourceType.SMB_USER:
            return saveResources(state, "smbUsers", resources);

        case ResourceType.NGINX_INSTANCE:
            return saveResources(state, "nginxInstances", resources);
        
        case ResourceType.NGINX_INSTANCE_STRUCTURED: {
            const newNginxInstances = new Map(state.nginxInstances);
            resources.forEach(nginxInstance => {
                state = cacheResources(state, nginxInstance.servers, ResourceType.NGINX_SERVER_STRUCTURED);
                delete nginxInstance.servers;
                newNginxInstances.set(nginxInstance.id, nginxInstance);
            });

            return { ...state, nginxInstances: newNginxInstances };
        }

        case ResourceType.NGINX_SERVER:
            return saveResources(state, "nginxServers", resources);

        case ResourceType.NGINX_SERVER_STRUCTURED: {
            const newNginxServers = new Map(state.nginxServers);
            resources.forEach(nginxServer => {
                state = cacheResources(state, nginxServer.locations, ResourceType.NGINX_LOCATION);
                delete nginxServer.locations;
                newNginxServers.set(nginxServer.id, nginxServer);
            });

            return { ...state, nginxServers: newNginxServers };
        }

        case ResourceType.NGINX_LOCATION:
            return saveResources(state, "nginxLocations", resources);

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

        case ResourceType.ALERT:
            return saveResources(state, "alerts", resources);

        case ResourceType.USER_FILE:
            return saveResources(state, "userFiles", resources);

        case ResourceType.DAEMON:
            return saveResources(state, "daemons", resources);

        case ResourceType.DAEMON_TOKEN:
            return saveResources(state, "daemonTokens", resources);

        case ResourceType.PUBLIC_SERVER_LISTING:
            return saveResources(state, "publicServerListings", resources);

        case ResourceType.PUBLIC_SERVER_STRUCTURED: {
            const newPublicServers = new Map(state.publicServers);
            resources.forEach(publicServer => {
                state = cacheResources(state, publicServer.statistics, ResourceType.STATISTIC)
                delete publicServer.statistics;
                newPublicServers.set(publicServer.id, publicServer);
            });

            return { ...state, publicServers: newPublicServers };
        }
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

export async function reducerDelete<T>(dispatch: Dispatch<ReduxAction>, data: T, deleteFunc: (data: T) => Promise<boolean>, successFunc: (data: T) => ReduxAction) {
    const success = await deleteFunc(data);
    if (!success) {
        return;
    }

    dispatch(successFunc(data));
}

export async function reducerFetchMultiple<T, J>(dispatch: Dispatch<ReduxAction>, data: T, fetchFunc: (data: T) => Promise<J[]>, successFunc: (resource: J[]) => ReduxAction) {
    const resources = await fetchFunc(data);
    dispatch(successFunc(resources));
}