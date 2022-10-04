import { formatDurationNow } from "./util";

export function getContainerProjectStats(item: ContainerProjectStructured): ContainerProjectStats {
    const cpu = item.containers.reduce((acc, curr) => {
        return acc + (curr.statistics.length > 0 ? curr.statistics[curr.statistics.length-1].cpu : 0);
    }, 0);
    const memory = item.containers.reduce((acc, curr) => {
        return acc + (curr.statistics.length > 0 ? curr.statistics[curr.statistics.length-1].memory : 0);
    }, 0);
    const network = item.containers.reduce((acc, curr) => {
        return acc + (curr.statistics.length > 0 ? curr.statistics[curr.statistics.length-1].rx + curr.statistics[curr.statistics.length-1].tx : 0);
    }, 0);
    const disk = item.containers.reduce((acc, curr) => {
        return acc + (curr.statistics.length > 0 ? curr.statistics[curr.statistics.length-1].read + curr.statistics[curr.statistics.length-1].write : 0);
    }, 0);
    const statusMap = item.containers.reduce((acc, curr) => {
        acc.set(curr.status, acc.get(curr.status) ?? 1);
        return acc;
    }, new Map());
    const statusText = Array.from(statusMap.keys()).map(e => `${e}(${statusMap.get(e)})`).join(", ");
    const shortestRunningContainer = item.containers.length < 1 ? null : item.containers.reduce((acc, curr) => acc.creation > curr.creation ? acc : curr, item.containers[0]);
    const runningTime = shortestRunningContainer === null ? 0 : shortestRunningContainer.creation;

    return {
        cpu, memory, network, disk,
        status: `${statusText} (${formatDurationNow(runningTime)})`,
        time: runningTime
    }
}

export function showDockerPort(port: string): boolean {
    console.log(port);
    return !port.startsWith("0.0.0.0");
}

export function cleanDockerPort(port: string) {
    return port;
}