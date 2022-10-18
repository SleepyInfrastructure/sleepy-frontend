const name: Record<string, string> = {
    SERVER_DOWN: "Server is down.",
    SERVER_CPU_LOAD: "High CPU load.",
    SERVER_MEM_LOAD: "High memory load.",
    SERVER_NET_LOAD: "High network load.",
    DISK_LOAD: "High disk load.",
    DISK_LATENCY: "High disk latency.",
    PARTITION_LOW_SPACE: "Partition is low on space.",
    CONTAINER_DOWN: "Container is down.",
    UPTIME_ENDPOINT_DOWN: "Endpoint is down.",
}
export function getAlertName(alert: Alert) {
    return name[alert.type];
}