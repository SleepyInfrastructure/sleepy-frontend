import { cleanDockerPort, showDockerPort } from "../../scripts/util/container";
import { humanFileSize, pickHex } from "../../scripts/util/util";
import { GraphBetterData } from "./graph";

export function createServerGraph(data: GraphBetterData, serverProps: ServerConnectedProps, x: number, y: number) {
    const netHighLoad = 1048576;
    const diskHighLoad = 1048576;
    const lowLoadColor = [0, 255, 0];
    const highLoadColor = [255, 0, 0];

    const server = serverProps.item;
    data.nodes.push({ id: serverProps.item.id, x: 0, y, label: server.name, labelCfg: { style: { fontSize: 30 }}, size: 220, style: { fill: "#ff3645", stroke: "#de1221" }, nodeType: "far" });
    
    if(serverProps.containers.length > 0 || serverProps.containerProjects.length > 0) {
        data.nodes.push({ id: `${server.id}-docker`, x, y, label: "Docker", labelCfg: { style: { fontSize: 20 }}, size: 180, style: { fill: "#ef42ff", stroke: "#880494" }, nodeType: "far" });
        data.edges.push({ source: server.id, target: `${server.id}-docker`, edgeType: "far" });
        const processContainer = (source: string, portsSource: string, e: ContainerStructured) => {
            let size = 50;
            let fontSize = 10;
            let color = "#ffffff";
            let edgeSize = 2;
            if(e.statistics.length > 0) {
                size = Math.max(50, 360 * (e.statistics[0].memory / server.memory));
                fontSize = Math.max(10, 55 * (e.statistics[0].memory / server.memory));
                const netLoad = (e.statistics[0].rx + e.statistics[0].tx) / netHighLoad;
                color = pickHex(highLoadColor, lowLoadColor, Math.min(1, netLoad));
                edgeSize = Math.max(edgeSize, Math.round(5 * netLoad));
            }
            data.nodes.push({ id: e.id, x, y, label: e.name, labelCfg: { style: { fontSize } }, style: { fill: "#739dff", stroke: "#4e79de", color: "white" }, size, isLeaf: true, nodeType: "close" });
            data.edges.push({ source, target: e.id, color, size: edgeSize, edgeType: "close" });
            if(e.ports.length !== 0) {
                const ports = e.ports.split(",").map(e => e.trim()).filter(e => showDockerPort(e)).map(e => cleanDockerPort(e));
                for(const port of ports) {
                    data.nodes.push({ id: `${e.id}-${port}`, label: port, labelCfg: { style: { fontSize: 10 }}, style: { fill: "#ff5cbb", stroke: "#ff2ba7" }, size: 50, isLeaf: true, nodeType: "close" });
                    data.edges.push({ source: portsSource, target: `${e.id}-${port}`, edgeType: "close" });
                }
            }
        };
        for(const containerProject of serverProps.containerProjects) {
            const size = Math.max(75, 480 * (containerProject.statistics.memory / server.memory));
            const fontSize = Math.max(15, 75 * (containerProject.statistics.memory / server.memory));
            const netLoad = containerProject.statistics.network / netHighLoad;
            const color = pickHex(highLoadColor, lowLoadColor, Math.min(1, netLoad));
            const edgeSize = Math.max(2, Math.round(5 * netLoad));
            data.nodes.push({ id: containerProject.item.id, x, y, label: containerProject.item.name, labelCfg: { style: { fontSize }}, style: { fill: "#4a80ff", stroke: "#1749bf" }, size, isLeaf: true, nodeType: "middle" });
            data.edges.push({ source: `${server.id}-docker`, color, size: edgeSize, target: containerProject.item.id });
            for(const container of containerProject.item.containers) {
                processContainer(containerProject.item.id, containerProject.item.id, container);
            }
        }
        for(const container of serverProps.containers.filter(e => e.item.parent === null)) {
            processContainer(`${server.id}-docker`, container.item.id, container.item);
        }
    }
    if(serverProps.disks.length > 0) {
        data.nodes.push({ id: `${server.id}-disks`, x: -x, y, label: "Disks", labelCfg: { style: { fontSize: 20 }}, size: 180, style: { fill: "#ef42ff", stroke: "#880494" } });
        data.edges.push({ source: server.id, target: `${server.id}-disks`, edgeType: "far" });
        const existingPartitions: string[] = [];
        for(const pool of serverProps.zfsPools) {
            for(const partition of pool.partitions) {
                if(partition.partition !== undefined) {
                    const size = Math.max(40, 20 * (partition.size / 536870912000));
                    const fontSize = Math.max(10, 3 * (partition.size / 536870912000));
                    data.nodes.push({ id: partition.id, label: `${pool.name} (${partition.partition.name})\n(${humanFileSize(partition.size)})`, labelCfg: { style: { fontSize }}, style: { fill: "#f78e4d", stroke: "#d45a0f" }, size, isLeaf: true });
                    data.edges.push({ source: partition.partition.parent, target: partition.id, edgeType: "close" });
                    existingPartitions.push(partition.id);
                }
            }
        }
        for(const disk of serverProps.disks) {
            let size = Math.max(70, 30 * (disk.size / 536870912000));
            let fontSize = Math.max(10, 4 * (disk.size / 536870912000));
            let color = "#ffffff";
            let edgeSize = 2;
            if(disk.statistics.length > 0) {
                const diskLoad = (disk.statistics[0].read + disk.statistics[0].write) / diskHighLoad;
                color = pickHex(highLoadColor, lowLoadColor, Math.min(1, diskLoad));
                edgeSize = Math.max(edgeSize, Math.round(5 * diskLoad));
            }
            data.nodes.push({ id: disk.id, x: -x, y, label: `${disk.model?.trim() ?? disk.name}\n(${humanFileSize(disk.size)})`, labelCfg: { style: { fontSize }}, style: { fill: "#f78e4d", stroke: "#d45a0f" }, size, isLeaf: true });
            data.edges.push({ source: `${server.id}-disks`, target: disk.id, color, size: edgeSize, edgeType: "short" });
            const partitions = disk.partitions.filter(e => !existingPartitions.includes(e.id));
            for(const partition of partitions) {
                size = Math.max(40, 20 * (partition.size / 536870912000));
                fontSize = Math.max(10, 3 * (partition.size / 536870912000));
                data.nodes.push({ id: partition.id, label: `${partition.name}\n(${humanFileSize(partition.size)})`, labelCfg: { style: { fontSize }}, style: { fill: "#f78e4d", stroke: "#d45a0f" }, size, isLeaf: true });
                data.edges.push({ source: disk.id, target: partition.id, edgeType: "close" });
            }
        }
    }
    if(serverProps.smb.length > 0) {
        data.nodes.push({ id: `${server.id}-smb`, x: 0, y: 0, label: "SMB", labelCfg: { style: { fontSize: 16 }}, size: 120, style: { fill: "#ef42ff", stroke: "#880494" } });
        data.edges.push({ source: server.id, target: `${server.id}-smb`, edgeType: "far" });
        for(const smb of serverProps.smb) {
            data.nodes.push({ id: smb.id, x: 0, y: 0, label: smb.name, labelCfg: { style: { fontSize: 15 }}, style: { fill: "#f78e4d", stroke: "#d45a0f" }, size: 90, isLeaf: true });
            data.edges.push({ source: `${server.id}-smb`, target: smb.id, edgeType: "short" });
            for(const share of smb.shares) {
                data.nodes.push({ id: share.id, label: share.name, labelCfg: { style: { fontSize: 10 }}, style: { fill: "#f78e4d", stroke: "#d45a0f" }, size: 50, isLeaf: true });
                data.edges.push({ source: smb.id, target: share.id, edgeType: "close" });
            }
        }
    }
    if(serverProps.databases.length > 0) {
        data.nodes.push({ id: `${server.id}-db`, x: 0, y: 0, label: "Databases", labelCfg: { style: { fontSize: 16 }}, size: 120, style: { fill: "#ef42ff", stroke: "#880494" } });
        data.edges.push({ source: server.id, target: `${server.id}-db`, edgeType: "far" });
        for(const db of serverProps.databases) {
            const color = db.credentials ? "#00ff00" : "#ff0000";
            data.nodes.push({ id: db.id, x: 0, y: 0, label: db.name, labelCfg: { style: { fontSize: 15 }}, style: { fill: "#f78e4d", stroke: "#d45a0f" }, size: 90, isLeaf: true });
            data.edges.push({ source: `${server.id}-db`, color, target: db.id, edgeType: "short" });
        }
    }

    return data;
}
