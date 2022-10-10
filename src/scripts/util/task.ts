const status: Record<string, string> = {
    RUNNING: "Running",
    FAILED: "Failed",
    FINISHED: "Finished",
};
export function getTaskStatus(task: Task) {
    return status[task.status];
}

const name: Record<string, string> = {
    BACKUP_DATABASE: "Database Backup",
    BACKUP_DATABASE_SCHEMA: "Schema Backup",
    REQUEST_CONTAINER_LOG: "Container Log"
};
export function getTaskName(task: Task) {
    return name[task.type];
}

const colors: Record<string, string> = {
    RUNNING: "#66f",
    FAILED: "var(--color-primary-text)",
    FINISHED: "#3ece3e",
};
export function getTaskColor(task: Task) {
    return colors[task.status];
}

export function getTaskLink(task: Task, object: any) {
    switch(task.type) {
        case "BACKUP_DATABASE":
        case "BACKUP_DATABASE_SCHEMA":
            return `/databases/${object.id}`;

        case "REQUEST_CONTAINER_LOG":
            return `/containers/${object.id}`;
    }
}

export function getTaskLinkName(task: Task, object: any) {
    switch(task.type) {
        case "BACKUP_DATABASE":
        case "BACKUP_DATABASE_SCHEMA":
        case "REQUEST_CONTAINER_LOG":
            return object.name;
    }
}