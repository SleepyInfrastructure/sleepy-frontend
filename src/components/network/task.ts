const status: Record<string, string> = {
    [TaskStatus.RUNNING]: "Running",
    [TaskStatus.FAILED]: "Failed",
    [TaskStatus.FINISHED]: "Finished",
};
export function getTaskStatus(task: Task) {
    return status[task.status];
}

const name: Record<string, string> = {
    [TaskType.BACKUP_DATABASE]: "Database Backup"
};
export function getTaskName(task: Task) {
    return name[task.type];
}

export function getTaskLink(task: Task, object: any) {
    switch(task.type) {
        case TaskType.BACKUP_DATABASE:
            return `/databases/${object.id}`;
    }
}

export function getTaskLinkName(task: Task, object: any) {
    switch(task.type) {
        case TaskType.BACKUP_DATABASE:
            return object.name;
    }
}