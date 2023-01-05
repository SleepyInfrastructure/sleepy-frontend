import { createResource, deleteResource, editResource, fetchResource, fetchResources, post, sendDelete } from "./api";

export async function createUser(create: UserCreate): Promise<User | undefined> {
    return await createResource("/users", create);
}
export async function fetchUser(id: string): Promise<User | undefined> {
    return await fetchResource("/users", id);
}

export async function createSession(type: string, username?: string, password?: string): Promise<Session | undefined> {
    const response: APIResponse = await post({ path: `/sessions/create`, body: JSON.stringify({ type, username, password }) });
    if (response.status !== 200) {
        return undefined;
    }
    if(type === "classic") {
        location.href = "/overview";
    }

    return response.body;
}
export async function deleteSession(): Promise<boolean> {
    const response: APIResponse = await sendDelete({ path: `/sessions/delete` });
    location.href = "/";

    return response.status === 200;
}

// Servers
export async function createServer(create: ServerCreate): Promise<Server | undefined> {
    return await createResource("/servers", create);
}
export async function editServer(edit: ServerEdit): Promise<Server | undefined> {
    return await editResource("/servers", edit);
}
export async function deleteServer(id: string): Promise<boolean> {
    return await deleteResource("/servers", id);
}
export async function fetchServer(id: string): Promise<Server | undefined> {
    return await fetchResource("/servers", id);
}
export async function fetchServerStatistics(data: { id: string, type: string }): Promise<Statistic[]> {
    return await fetchResources(`/servers/statistics/${data.type}`, data.id);
}
export async function fetchServerStructured(id: string): Promise<ServerStructured | undefined> {
    return await fetchResource("/servers/structured", id);
}
export async function fetchAllServersStructured(): Promise<ServerStructured[]> {
    return await fetchResources("/servers/all/structured");
}

// Networks
export async function createNetwork(create: NetworkCreate): Promise<Network | undefined> {
    return await createResource("/networks", create);
}
export async function editNetwork(edit: NetworkEdit): Promise<Network | undefined> {
    return await editResource("/networks", edit);
}
export async function fetchNetwork(id: string): Promise<Network | undefined> {
    return await fetchResource("/networks", id);
}

// Disks
export async function fetchDisk(id: string): Promise<Disk | undefined> {
    return await fetchResource("/disks", id);
}
export async function fetchDiskStatistics(data: { id: string, type: string }): Promise<DiskStatistic[]> {
    return await fetchResources(`/disks/statistics/${data.type}`, data.id);
}
export async function fetchPartition(id: string): Promise<Partition | undefined> {
    return await fetchResource("/partitions", id);
}

// Containers
export async function fetchContainer(id: string): Promise<Container | undefined> {
    return await fetchResource("/containers", id);
}
export async function fetchContainerProject(id: string): Promise<ContainerProject | undefined> {
    return await fetchResource("/containerProjects", id);
}

// Databases
export async function createDatabase(create: DatabaseCreate): Promise<Database | undefined> {
    return await createResource("/databases", create);
}
export async function editDatabase(edit: DatabaseEdit): Promise<Database | undefined> {
    return await editResource("/databases", edit);
}
export async function deleteDatabase(id: string): Promise<boolean> {
    return await deleteResource("/databases", id);
}
export async function fetchDatabase(id: string): Promise<Database | undefined> {
    return await fetchResource("/databases", id);
}

// SMB Instances
export async function createSmbInstance(create: SMBInstanceCreate): Promise<SMBInstance | undefined> {
    return await createResource("/smbInstances", create);
}
export async function editSmbInstance(edit: SMBInstanceEdit): Promise<SMBInstance | undefined> {
    return await editResource("/smbInstances", edit);
}
export async function deleteSmbInstance(id: string): Promise<boolean> {
    return await deleteResource("/smbInstances", id);
}
export async function fetchSmbInstance(id: string): Promise<SMBInstance | undefined> {
    return await fetchResource("/smbInstances", id);
}

// SMB Shares
export async function createSmbShare(create: SMBShareCreate): Promise<SMBShare | undefined> {
    return await createResource("/smbShares", create);
}
export async function editSmbShare(edit: SMBShareEdit): Promise<SMBShare | undefined> {
    return await editResource("/smbShares", edit);
}
export async function deleteSmbShare(id: string): Promise<boolean> {
    return await deleteResource("/smbShares", id);
}
export async function fetchSmbShare(id: string): Promise<SMBShare | undefined> {
    return await fetchResource("/smbShares", id);
}

// SMB Users
export async function createSmbUser(create: SMBUserCreate): Promise<SMBUser | undefined> {
    return await createResource("/smbUsers", create);
}
export async function editSmbUser(edit: SMBUserEdit): Promise<SMBUser | undefined> {
    return await editResource("/smbUsers", edit);
}
export async function deleteSmbUser(id: string): Promise<boolean> {
    return await deleteResource("/smbUsers", id);
}
export async function fetchSmbUser(id: string): Promise<SMBUser | undefined> {
    return await fetchResource("/smbUsers", id);
}

// Uptime Endpoints
export async function createUptimeEndpoint(create: UptimeEndpointCreate): Promise<UptimeEndpoint | undefined> {
    return await createResource("/uptimeEndpoints", create);
}
export async function editUptimeEndpoint(edit: UptimeEndpointEdit): Promise<UptimeEndpoint | undefined> {
    return await editResource("/uptimeEndpoints", edit);
}
export async function deleteUptimeEndpoint(id: string): Promise<boolean> {
    return await deleteResource("/uptimeEndpoints", id);
}
export async function fetchUptimeEndpoint(id: string): Promise<UptimeEndpoint | undefined> {
    return await fetchResource("/uptimeEndpoints", id);
}
export async function fetchAllUptimeEndpointsStructured(): Promise<UptimeEndpointStructured[]> {
    return await fetchResources("/uptimeEndpoints/all/structured");
}

// Tasks
export async function deleteTask(id: string): Promise<boolean> {
    return await deleteResource("/tasks", id);
}
export async function fetchTask(id: string): Promise<Task | undefined> {
    return await fetchResource("/tasks", id);
}
export async function fetchAllTasks(): Promise<Task[]> {
    return await fetchResources("/tasks/all");
}

// Alerts
export async function fetchAllAlerts(): Promise<Alert[]> {
    return await fetchResources("/alerts/all");
}

// User Files
export async function fetchUserFile(id: string): Promise<UserFile | undefined> {
    return await fetchResource("/user/files", id);
}

// Daemon Tokens
export async function createServerDaemonToken(id: string): Promise<DaemonToken | undefined> {
    return await createResource("/servers/daemon/tokens", { id });
}
export async function deleteDeamonToken(id: string): Promise<boolean> {
    return await deleteResource("/daemon/tokens", id);
}
export async function fetchServerDaemonTokens(id: string): Promise<DaemonToken[]> {
    return await fetchResources("/servers/daemon/tokens", id);
}

// Public Listings
export async function fetchPublicServerListings(): Promise<PublicServerListing[]> {
    return await fetchResources("/servers/public");
}
export async function fetchPublicServer(id: string): Promise<PublicServer | undefined> {
    return await fetchResource("/servers/public/structured", id);
}

// Nginx Instances
export async function createNginxInstance(create: NginxInstanceCreate): Promise<NginxInstance | undefined> {
    return await createResource("/nginxInstances", create);
}
export async function editNginxInstance(edit: NginxInstanceEdit): Promise<NginxInstance | undefined> {
    return await editResource("/nginxInstances", edit);
}
export async function deleteNginxInstance(id: string): Promise<boolean> {
    return await deleteResource("/nginxInstances", id);
}
export async function fetchNginxInstance(id: string): Promise<NginxInstance | undefined> {
    return await fetchResource("/nginxInstances", id);
}

export async function createNginxServer(create: NginxServerCreate): Promise<NginxServer | undefined> {
    return await createResource("/nginxServers", create);
}
export async function editNginxServer(edit: NginxServerEdit): Promise<NginxServer | undefined> {
    return await editResource("/nginxServers", edit);
}
export async function deleteNginxServer(id: string): Promise<boolean> {
    return await deleteResource("/nginxServers", id);
}
export async function fetchNginxServer(id: string): Promise<NginxServer | undefined> {
    return await fetchResource("/nginxServers", id);
}

export async function createNginxLocation(create: NginxLocationCreate): Promise<NginxLocation | undefined> {
    return await createResource("/nginxLocations", create);
}
export async function editNginxLocation(edit: NginxLocationEdit): Promise<NginxLocation | undefined> {
    return await editResource("/nginxLocations", edit);
}
export async function deleteNginxLocation(id: string): Promise<boolean> {
    return await deleteResource("/nginxLocations", id);
}
export async function fetchNginxLocation(id: string): Promise<NginxLocation | undefined> {
    return await fetchResource("/nginxLocations", id);
}