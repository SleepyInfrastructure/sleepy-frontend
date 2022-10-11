import { cleanDockerPort, showDockerPort } from "../../../scripts/util/container";
import { humanFileSize, pickHex } from "../../../scripts/util/util";
import { StatisticTimeMapping } from "../../../ts/common/const";
import { GraphBetterData } from "../graph";
import * as c from "./const";

export function createServerGraph(data: GraphBetterData, serverProps: ServerConnectedProps, x: number, y: number) {
    const server = serverProps.item;
    data.nodes.push({ id: serverProps.item.id, x: 0, y, label: server.name, labelCfg: { style: { fontSize: 30 }}, size: 220, style: { fill: "#ff3645", stroke: "#de1221" }, nodeType: "far", tooltip: `ID: ${server.id}` });
    
    if(serverProps.containers.length > 0 || serverProps.containerProjects.length > 0) {
        data.nodes.push({ id: `${server.id}-docker`, x, y, label: "Docker", labelCfg: { style: { fontSize: 20 }}, size: 180, style: { fill: "#ef42ff", stroke: "#880494" }, nodeType: "far", tooltip: "Docker" });
        data.edges.push({ source: server.id, target: `${server.id}-docker`, edgeType: "far", tooltip: "Link" });
        const processContainer = (source: string, portsSource: string, container: ContainerStructured) => {
            let size = 50;
            let fontSize = 10;
            let color = "#6e6e6e";
            let edgeSize = 2;
            let netLoad = 0;
            if(container.status === "running" && container.statistics.length > 0) {
                size = Math.max(50, 360 * (container.statistics[0].memory / server.memory));
                fontSize = Math.max(10, 55 * (container.statistics[0].memory / server.memory));
                netLoad = (container.statistics[0].rx + container.statistics[0].tx);
                color = pickHex(c.HIGH_LOAD_COLOR, c.LOAD_LOAD_COLOR, Math.min(1, netLoad / c.NET_HIGH_LOAD));
                edgeSize = Math.max(edgeSize, Math.round(5 * netLoad / c.NET_HIGH_LOAD));
            }
            const fill = container.status === "running" ? "#739dff" : "#6e6e6e";
            const stroke = container.status === "running" ? "#4e79de" : "#545454";

            const lastStatistic = container.statistics[container.statistics.length - 1];
            const tooltip = `
                ID: ${container.id}<br />
                CPU: ${lastStatistic === undefined ? "0" : lastStatistic.cpu.toFixed(2)} %<br />
                Memory: ${lastStatistic === undefined ? "0 B" : humanFileSize(lastStatistic.memory)}<br />
                Network: ${lastStatistic === undefined ? "0 B" : humanFileSize(lastStatistic.rx + lastStatistic.tx)}/min<br />
                Disk: ${lastStatistic === undefined ? "0 B" : humanFileSize(lastStatistic.read + lastStatistic.write)}/s`;
            data.nodes.push({ id: container.id, x, y, label: container.name, labelCfg: { style: { fontSize } }, style: { fill, stroke }, size, isLeaf: true, nodeType: "close", tooltip });
            data.edges.push({ source, target: container.id, color, size: edgeSize, edgeType: "close", tooltip });
            if(container.ports.length !== 0) {
                const ports = container.ports.map(e => cleanDockerPort(e));
                for(const port of ports) {
                    data.nodes.push({ id: `${container.id}-${port}`, label: port, labelCfg: { style: { fontSize: 10 }}, style: { fill: "#ff5cbb", stroke: "#ff2ba7" }, size: 50, isLeaf: true, nodeType: "close", tooltip: "Link" });
                    data.edges.push({ source: portsSource, target: `${container.id}-${port}`, edgeType: "close", tooltip: "Link" });
                }
            }
        };
        for(const containerProject of serverProps.containerProjects) {
            const size = Math.max(75, 480 * (containerProject.statistics.memory / server.memory));
            const fontSize = Math.max(15, 75 * (containerProject.statistics.memory / server.memory));
            let color = "#6e6e6e";
            let edgeSize = 2;
            let netLoad = 0;
            if(containerProject.item.status === "running") {
                netLoad = containerProject.statistics.network;
                color = pickHex(c.HIGH_LOAD_COLOR, c.LOAD_LOAD_COLOR, Math.min(1, netLoad / c.NET_HIGH_LOAD));
                edgeSize = Math.max(2, Math.round(5 * netLoad / c.NET_HIGH_LOAD));
            }
            const fill = containerProject.item.status === "running" ? "#4a80ff" : "#6e6e6e";
            const stroke = containerProject.item.status === "running" ? "#1749bf" : "#545454";

            const tooltip = `
                ID: ${containerProject.item.id}<br />
                CPU: ${containerProject.statistics.cpu.toFixed(2)} %<br />
                Memory: ${humanFileSize(containerProject.statistics.memory)}<br />
                Network: ${humanFileSize(containerProject.statistics.network)}/min<br />
                Disk: ${humanFileSize(containerProject.statistics.disk)}/min`;
            data.nodes.push({ id: containerProject.item.id, x, y, label: containerProject.item.name, labelCfg: { style: { fontSize }}, style: { fill, stroke }, size, isLeaf: true, nodeType: "middle", tooltip: tooltip });
            data.edges.push({ source: `${server.id}-docker`, color, size: edgeSize, target: containerProject.item.id, tooltip });
            for(const container of containerProject.item.containers) {
                processContainer(containerProject.item.id, containerProject.item.id, container);
            }
        }
        for(const container of serverProps.containers.filter(e => e.item.parent === null)) {
            processContainer(`${server.id}-docker`, container.item.id, container.item);
        }
    }
    if(serverProps.disks.length > 0) {
        data.nodes.push({ id: `${server.id}-disks`, x: -x, y, label: "Disks", labelCfg: { style: { fontSize: 20 }}, size: 180, style: { fill: "#ef42ff", stroke: "#880494" }, tooltip: "Disks" });
        data.edges.push({ source: server.id, target: `${server.id}-disks`, edgeType: "far", tooltip: `Link` });
        const processPartition = (source: string, partition: PartitionConnectedPropsItem) => {
            const size = Math.max(40, 20 * (partition.size / c.DISK_SIZE_BUBBLE));
            const fontSize = Math.max(10, 3 * (partition.size / c.DISK_SIZE_BUBBLE));
            data.nodes.push({ id: partition.id, label: `${partition.name}\n(${humanFileSize(partition.size)})`, labelCfg: { style: { fontSize }}, style: { fill: "#f78e4d", stroke: "#d45a0f" }, size, isLeaf: true, tooltip: `ID: ${partition.id}` });
            data.edges.push({ source, target: partition.id, edgeType: "close", tooltip: `Link` });
        };
        
        const existingPartitions: string[] = [];
        for(const pool of serverProps.zfsPools) {
            for(const partition of pool.partitions) {
                if(partition.partition !== undefined) {
                    processPartition(partition.parent, partition.partition);
                    existingPartitions.push(partition.id);
                }
            }
        }
        for(const disk of serverProps.disks) {
            const size = Math.max(70, 30 * (disk.size / c.DISK_SIZE_BUBBLE));
            const fontSize = Math.max(10, 4 * (disk.size / c.DISK_SIZE_BUBBLE));
            let color = "#6e6e6e";
            let edgeSize = 2;
            let diskLoad = 0;
            if(disk.statistics.length > 0) {
                diskLoad = (disk.statistics[0].read + disk.statistics[0].write);
                color = pickHex(c.HIGH_LOAD_COLOR, c.LOAD_LOAD_COLOR, Math.min(1, diskLoad / c.DISK_HIGH_LOAD));
                edgeSize = Math.max(edgeSize, Math.round(5 * diskLoad / c.DISK_HIGH_LOAD));
            }

            const lastStatistic = disk.statistics[disk.statistics.length - 1];
            const tooltip = `
                ID: ${disk.id}<br />
                Read: ${lastStatistic === undefined ? "0 B" : humanFileSize(lastStatistic.read)}/s<br />
                Write: ${lastStatistic === undefined ? "0 B" : humanFileSize(lastStatistic.write)}/s`;
            data.nodes.push({ id: disk.id, x: -x, y, label: `${disk.model?.trim() ?? disk.name}\n(${humanFileSize(disk.size)})`, labelCfg: { style: { fontSize }}, style: { fill: "#f78e4d", stroke: "#d45a0f" }, size, isLeaf: true, tooltip });
            data.edges.push({ source: `${server.id}-disks`, target: disk.id, color, size: edgeSize, edgeType: "short", tooltip });
            for(const partition of disk.partitions.filter(e => !existingPartitions.includes(e.id))) {
                processPartition(disk.id, partition);
            }
        }
    }
    if(serverProps.smb.length > 0) {
        data.nodes.push({ id: `${server.id}-smb`, x: 0, y: 0, label: "SMB", labelCfg: { style: { fontSize: 16 }}, size: 120, style: { fill: "#ef42ff", stroke: "#880494" } });
        data.edges.push({ source: server.id, target: `${server.id}-smb`, edgeType: "far", tooltip: `Link` });
        for(const smb of serverProps.smb) {
            data.nodes.push({ id: smb.id, x: 0, y: 0, label: smb.name, labelCfg: { style: { fontSize: 15 }}, style: { fill: "#f78e4d", stroke: "#d45a0f" }, size: 90, isLeaf: true, tooltip: `ID: ${smb.id}` });
            data.edges.push({ source: `${server.id}-smb`, target: smb.id, edgeType: "short", tooltip: `Link` });
            for(const share of smb.shares) {
                data.nodes.push({ id: share.id, label: share.name, labelCfg: { style: { fontSize: 10 }}, style: { fill: "#f78e4d", stroke: "#d45a0f" }, size: 50, isLeaf: true, tooltip: `ID: ${share.id}` });
                data.edges.push({ source: smb.id, target: share.id, edgeType: "close", tooltip: `Link` });
            }
        }
    }
    if(serverProps.databases.length > 0) {
        data.nodes.push({ id: `${server.id}-db`, x: 0, y: 0, label: "Databases", labelCfg: { style: { fontSize: 16 }}, size: 120, style: { fill: "#ef42ff", stroke: "#880494" }, tooltip: `Databases` });
        data.edges.push({ source: server.id, target: `${server.id}-db`, edgeType: "far", tooltip: `Link` });
        for(const db of serverProps.databases) {
            const color = db.credentials ? "#00ff00" : "#ff0000";
            data.nodes.push({ id: db.id, x: 0, y: 0, label: db.name, labelCfg: { style: { fontSize: 15 }}, style: { fill: "#f78e4d", stroke: "#d45a0f" }, size: 90, isLeaf: true, tooltip: `ID: ${db.id}` });
            data.edges.push({ source: `${server.id}-db`, color, target: db.id, edgeType: "short", tooltip: `Link` });
        }
    }

    return data;
}
