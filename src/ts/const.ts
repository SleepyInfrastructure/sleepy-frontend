export const REFRESH_ALL = ["GENERAL", "CONTAINERS", "DISKS"];
export enum AppPreferencesTheme { DARK = "dark", LIGHT = "light" }

export enum TaskType {
    BACKUP_DATABASE = "BACKUP_DATABASE",
    BACKUP_DATABASE_SCHEMA = "BACKUP_DATABASE_SCHEMA",
    REQUEST_CONTAINER_LOG = "REQUEST_CONTAINER_LOG"
}
export enum TaskStatus {
    RUNNING = "RUNNING",
    FAILED = "FAILED",
    FINISHED = "FINISHED"
}