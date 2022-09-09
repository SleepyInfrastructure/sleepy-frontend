export function getServerConnectedProps(e: Server, props: ServersProps): ServerConnectedProps {
    // this is stupid
    const disks = Array.from(props.disks.values());
    const partitions = Array.from(props.partitions.values());
    const zfsPools = Array.from(props.zfsPools.values());
    const zfsPartitions = Array.from(props.zfsPartitions.values());
    const containers = Array.from(props.containers.values());
    const containerStatistics = Array.from(props.containerStatistics.values());
    const containerProjects = Array.from(props.containerProjects.values());
    const databases = Array.from(props.databases.values());
    const statistics = Array.from(props.statistics.values());
    const diskStatistics = Array.from(props.diskStatistics.values());
    
    const config = props.serverConfigs.get(e.config);
    const network = e.network === null ? undefined : props.networks.get(e.network);
    const serverDisks = disks.filter(el => el.server === e.id).map(el => {
        return {
            ...el,
            partitions: partitions.filter(ele => ele.parent === el.id).map(ele => {
                const zfsPartition = props.zfsPartitions.get(ele.id);
                return { ...ele, zfs: zfsPartition === undefined ? undefined : props.zfsPools.get(zfsPartition.parent)?.name  }
            }),
            statistics: diskStatistics.filter(ele => ele.parent === el.id)
        };
    });
    const serverZfsPools = zfsPools.filter(el => el.server === e.id).map(el => {
        return {
            ...el,
            partitions: zfsPartitions.filter(ele => ele.parent === el.id).map(ele => {
                return { ...ele, partition: props.partitions.get(ele.id) }
            })
        };
    });
    const serverContainers = containers.filter(el => el.server === e.id).map(el => {
        return { ...el, statistics: containerStatistics.filter(ele => ele.parent === el.id) };
    });
    const serverContainerProjects = containerProjects.filter(el => el.server === e.id);
    const serverDatabases = databases.filter(el => el.server === e.id);
    const serverStatistics = statistics.filter(el => el.server === e.id);
    const daemon = props.daemons.get(e.id);

    return {
        item: e,
        config: config ?? null,
        network: network ?? null,
        disks: serverDisks,
        zfsPools: serverZfsPools,
        containers: serverContainers,
        containerProjects: serverContainerProjects,
        databases: serverDatabases,
        statistics: serverStatistics,
        daemon: daemon ?? null,
        actions: props.actions
    }
}