import { TaskStatus, TaskType } from "../../ts/const";

const status: Record<string, string> = {
    [TaskStatus.RUNNING]: "Running",
    [TaskStatus.FAILED]: "Failed",
    [TaskStatus.FINISHED]: "Finished",
};
export function getTaskStatus(task: Task) {
    return status[task.status];
}

const name: Record<string, string> = {
    [TaskType.BACKUP_DATABASE]: "Database Backup",
    [TaskType.BACKUP_DATABASE_SCHEMA]: "Schema Backup"
};
export function getTaskName(task: Task) {
    return name[task.type];
}

const colors: Record<string, string> = {
    [TaskStatus.RUNNING]: "#66f",
    [TaskStatus.FAILED]: "var(--color-primary-text)",
    [TaskStatus.FINISHED]: "#3ece3e",
};
export function getTaskColor(task: Task) {
    return colors[task.status];
}