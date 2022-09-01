import { bindActionCreators } from "redux";

export const INITIAL: ReduxState = {
    session: null,
    users: new Map(),
    servers: new Map(),
    serverConfigs: new Map(),
    networks: new Map(),
    disks: new Map(),
    partitions: new Map(),
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
    DISK = "disk",
    DISK_STRUCTURED = "disk-structured",
    PARTITION = "partition",
    CONTAINER = "container",
    CONTAINER_STRUCTURED = "container-structured",
    CONTAINER_PROJECT = "container-project",
    DATABASE = "database",
    UPTIME_ENDPOINT = "uptime-endpoint",
    UPTIME_ENDPOINT_STRUCTURED = "uptime-endpoint-structured",
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

        case ResourceType.SERVER_CONFIG: {
            const newResources = new Map(state.serverConfigs);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, serverConfigs: newResources };
        }
        
        case ResourceType.SERVER_STRUCTURED: {
            const newServerConfigs = new Map(state.serverConfigs);
            resources.forEach(server => {
                newServerConfigs.set(server.config.id, server.config);
                delete server.config;
            });

            const newNetworks = new Map(state.networks);
            resources.forEach(server => {
                newNetworks.set(server.network.id, server.network);
                delete server.network;
            });
            
            const newDisks = new Map(state.disks);
            resources.forEach(server => {
                server.disks.forEach((disk: any) => {
                    newDisks.set(disk.id, disk);
                });
                delete server.disks;
            });
            
            const newPartitions = new Map(state.partitions);
            resources.forEach(server => {
                server.partitions.forEach((partition: any) => {
                    newPartitions.set(partition.id, partition);
                });
                delete server.partitions;
            });
            
            const newContainers = new Map(state.containers);
            resources.forEach(server => {
                server.containers.forEach((container: any) => {
                    newContainers.set(container.id, container);
                });
                delete server.containers;
            });
            
            const newContainersProjects = new Map(state.containerProjects);
            resources.forEach(server => {
                server.containerProjects.forEach((containerProject: any) => {
                    newContainersProjects.set(containerProject.id, containerProject);
                });
                delete server.containerProjects;
            });
            
            const newDatabases = new Map(state.databases);
            resources.forEach(server => {
                server.databases.forEach((database: any) => {
                    newDatabases.set(database.id, database);
                });
                delete server.databases;
            });
            
            const newStatistics = new Map(state.statistics);
            resources.forEach(server => {
                server.statistics.forEach((statistic: any) => {
                    newStatistics.set(statistic.id, statistic);
                });
                delete server.statistics;
            });
            
            const newServers = new Map(state.servers);
            resources.forEach(server => {
                newServers.set(server.id, server);
            });

            return {
                ...state,
                servers: newServers,
                serverConfigs: newServerConfigs,
                networks: newNetworks,
                disks: newDisks,
                partitions: newPartitions,
                containers: newContainers,
                containerProjects: newContainersProjects,
                databases: newDatabases,
                statistics: newStatistics
            };
        }

        case ResourceType.NETWORK: {
            const newResources = new Map(state.networks);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, networks: newResources };
        }

        case ResourceType.DISK: {
            const newResources = new Map(state.disks);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, disks: newResources };
        }
        
        case ResourceType.DISK_STRUCTURED: {
            const newStatistics = new Map(state.diskStatistics);
            resources.forEach(disk => {
                disk.statistics.forEach((statistic: any) => {
                    newStatistics.set(statistic.id, statistic);
                });
                delete disk.statistics;
            });
            
            const newDisks = new Map(state.disks);
            resources.forEach(disk => {
                newDisks.set(disk.id, disk);
            });

            return { ...state, disks: newDisks, diskStatistics: newStatistics };
        }

        case ResourceType.PARTITION: {
            const newResources = new Map(state.partitions);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, partitions: newResources };
        }

        case ResourceType.CONTAINER: {
            const newResources = new Map(state.containers);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, containers: newResources };
        }
        
        case ResourceType.CONTAINER_STRUCTURED: {
            const newStatistics = new Map(state.containerStatistics);
            resources.forEach(container => {
                container.statistics.forEach((statistic: any) => {
                    newStatistics.set(statistic.id, statistic);
                });
                delete container.statistics;
            });
            
            const newContainers = new Map(state.containers);
            resources.forEach(container => {
                newContainers.set(container.id, container);
            });

            return { ...state, containers: newContainers, containerStatistics: newStatistics };
        }


        case ResourceType.CONTAINER_PROJECT: {
            const newResources = new Map(state.containerProjects);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, containerProjects: newResources };
        }

        case ResourceType.UPTIME_ENDPOINT: {
            const newResources = new Map(state.uptimeEndpoints);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, uptimeEndpoints: newResources };
        }

        case ResourceType.UPTIME_ENDPOINT_STRUCTURED: {
            const newStatistics = new Map(state.uptimeEndpointStatistics);
            resources.forEach(endpoint => {
                endpoint.statistics.forEach((statistic: any) => {
                    newStatistics.set(statistic.id, statistic);
                });
                delete endpoint.statistics;
            });
            
            const newEndpoints = new Map(state.uptimeEndpoints);
            resources.forEach(endpoint => {
                newEndpoints.set(endpoint.id, endpoint);
            });

            return { ...state, uptimeEndpoints: newEndpoints, uptimeEndpointStatistics: newStatistics };
        }

        case ResourceType.DATABASE: {
            const newResources = new Map(state.databases);
            resources.forEach(resource => {
                newResources.set(resource.id, resource);
            });
            return { ...state, databases: newResources };
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
