import { StatisticTimeMapping } from "../../ts/common/const";
import { formatDurationNow } from "./util";

export function getContainerProjectStats(item: ContainerProjectStructured): ContainerProjectStats {
    const cpu = item.containers.reduce((acc, curr) => {
        return acc + (curr.statistics.length > 0 ? curr.statistics[curr.statistics.length-1].cpu : 0);
    }, 0);
    const memory = item.containers.reduce((acc, curr) => {
        return acc + (curr.statistics.length > 0 ? curr.statistics[curr.statistics.length-1].memory : 0);
    }, 0);
    const network = Math.round(item.containers.reduce((acc, curr) => {
        return acc + (curr.statistics.length > 0 ? curr.statistics[curr.statistics.length-1].rx + curr.statistics[curr.statistics.length-1].tx : 0);
    }, 0) / StatisticTimeMapping.MINUTE);
    const disk = item.containers.reduce((acc, curr) => {
        return acc + (curr.statistics.length > 0 ? curr.statistics[curr.statistics.length-1].read + curr.statistics[curr.statistics.length-1].write : 0);
    }, 0);
    const statusMap = item.containers.reduce((acc, curr) => {
        if(acc.has(curr.status)) {
            acc.set(curr.status, acc.get(curr.status) + 1);
        } else {
            acc.set(curr.status, 1);
        }
        
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
    return !port.startsWith(":::");
}

export function cleanDockerPort(port: string) {
    return port.replace("0.0.0.0:", "");
}