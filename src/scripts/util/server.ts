import { getContainerProjectStats } from "./container";

export function getServerConnectedProps(server: Server, props: ServersProps): ServerConnectedProps {
    // this is stupid
    const processes = Array.from(props.processes.values());
    const software = Array.from(props.software.values());
    const disks = Array.from(props.disks.values());
    const partitions = Array.from(props.partitions.values());
    const zfsPools = Array.from(props.zfsPools.values());
    const zfsPartitions = Array.from(props.zfsPartitions.values());
    const containers = Array.from(props.containers.values());
    const containerProjects = Array.from(props.containerProjects.values());
    const databases = Array.from(props.databases.values());
    const smbInstances = Array.from(props.smbInstances.values());
    const smbShares = Array.from(props.smbShares.values());
    const smbUsers = Array.from(props.smbUsers.values());
    const nginxInstances = Array.from(props.nginxInstances.values());
    const nginxServers = Array.from(props.nginxServers.values());
    const nginxLocations = Array.from(props.nginxLocations.values());
    const statistics = Array.from(props.statistics.values());
    const diskStatistics = Array.from(props.diskStatistics.values());
    
    const config = props.serverConfigs.get(server.config);
    const network = server.network === null ? undefined : props.networks.get(server.network);
    const serverProcesses = processes.filter(e => e.server === server.id);
    const serverSoftware = software.filter(e => e.server === server.id);
    const serverDisks = disks.filter(e => e.server === server.id).map(e => {
        return {
            ...e,
            partitions: partitions.filter(el => el.parent === e.id).map(el => {
                const zfsPartition = props.zfsPartitions.get(el.id);
                return { ...el, zfs: zfsPartition === undefined ? undefined : props.zfsPools.get(zfsPartition.parent)?.name  }
            }),
            statistics: diskStatistics.filter(el => el.parent === e.id)
        };
    });
    const serverZfsPools = zfsPools.filter(e => e.server === server.id).map(e => {
        return {
            ...e,
            partitions: zfsPartitions.filter(el => el.parent === e.id).map(el => {
                return { ...el, partition: props.partitions.get(el.id) }
            })
        };
    });
    const serverContainers = containers.filter(e => e.server === server.id).map(e => getContainerConnectedProps(e, props));
    const serverContainerProjects = containerProjects.filter(e => e.server === server.id).map(e => getContainerProjectConnectedProps(e, props));
    const serverDatabases = databases.filter(e => e.server === server.id);
    const serverSmbInstances = smbInstances.filter(e => e.server === server.id).map(e => {
        return {
            ...e,
            shares: smbShares.filter(el => el.parent === e.id),
            users: smbUsers.filter(el => el.parent === e.id)
        };
    });
    const serverNginxInstances = nginxInstances.filter(e => e.server === server.id).map(e => {
        return {
            ...e,
            servers: nginxServers.filter(el => el.parent === e.id).map(el => {
                return { ...el, locations: nginxLocations.filter(ele => ele.parent === el.id) }
            })
        };
    });
    const publicServerListing = props.publicServerListings.get(server.id);
    const serverStatistics = statistics.filter(el => el.server === server.id);
    const daemon = props.daemons.get(server.id);
    
    return {
        item: server,
        config: config ?? null,
        network: network ?? null,
        processes: serverProcesses,
        software: serverSoftware,
        disks: serverDisks,
        zfs: serverZfsPools,
        containers: serverContainers,
        containerProjects: serverContainerProjects,
        databases: serverDatabases,
        smb: serverSmbInstances,
        nginx: serverNginxInstances,
        public: publicServerListing ?? null,
        statistics: serverStatistics,
        daemon: daemon ?? null,
        actions: props.actions
    }
}

export function getContainerConnectedProps(e: Container, props: ServersProps): ContainerConnectedProps {
    const containerStatistics = Array.from(props.containerStatistics.values());
    return {
        item: { ...e, statistics: containerStatistics.filter(el => el.parent === e.id) },
        logs: props.containerLogs.get(e.id) ?? [],
        actions: props.actions
    }
}

export function getContainerProjectConnectedProps(e: ContainerProject, props: ServersProps): ContainerProjectConnectedProps {
    const containers = Array.from(props.containers.values());
    const containerStatistics = Array.from(props.containerStatistics.values());
    const item = {
        ...e,
        containers: containers.filter(el => el.parent === e.id).map(el => {
            return { ...el, statistics: containerStatistics.filter(ele => ele.parent === el.id) }
        })
    };

    return {
        item: {
            ...item,
        },
        statistics: getContainerProjectStats(item),
        logs: props.containerLogs.get(e.id) ?? [],
        actions: props.actions
    }
}