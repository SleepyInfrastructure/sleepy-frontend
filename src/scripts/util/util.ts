export function humanFileSize(size: number) {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return `${Number((size / Math.pow(1024, i)).toFixed(2)) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`;
}

export function formatTimestamp(e: number) {
    return new Date(e * 1000).toLocaleTimeString([], { hour: "2-digit", minute:"2-digit" });
}

export function getServerConnectedProps(e: Server, props: ServersProps): ServerConnectedProps {
    // this is stupid
    const disks = Array.from(props.disks.values());
    const partitions = Array.from(props.partitions.values());
    const containers = Array.from(props.containers.values());
    const containerStatistics = Array.from(props.containerStatistics.values());
    const containerProjects = Array.from(props.containerProjects.values());
    const databases = Array.from(props.databases.values());
    const statistics = Array.from(props.statistics.values());
    const diskStatistics = Array.from(props.diskStatistics.values());

    const config = props.serverConfigs.get(e.config);
    const network = e.network === null ? undefined : props.networks.get(e.network);
    const serverDisks = disks.filter(el => el.server === e.id).map(el => {
        return { ...el, partitions: partitions.filter(ele => ele.parent === el.id), statistics: diskStatistics.filter(ele => ele.parent === el.id) };
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
        containers: serverContainers,
        containerProjects: serverContainerProjects,
        databases: serverDatabases,
        statistics: serverStatistics,
        daemon: daemon ?? null,
        actions: props.actions
    }
}