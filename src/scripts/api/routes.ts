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
        if(type === "token" && (location.pathname !== "/login" && location.pathname !== "/register")) {
            location.href = "/login";
        }

        return undefined;
    }
    if(type === "classic") {
        location.href = "/";
    }

    return response.body;
}
export async function deleteSession(): Promise<boolean> {
    const response: APIResponse = await sendDelete({ path: `/sessions/delete` });
    location.href = "/login";

    return response.status === 200;
}

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
    return await fetchResources(`/server/statistics/${data.type}`, data.id);
}
export async function fetchServerStructured(id: string): Promise<ServerStructured | undefined> {
    return await fetchResource("/server/structured", id);
}
export async function fetchAllServersStructured(): Promise<ServerStructured[]> {
    return await fetchResources("/servers/all/structured");
}

export async function createNetwork(create: NetworkCreate): Promise<Network | undefined> {
    return await createResource("/networks", create);
}
export async function editNetwork(edit: NetworkEdit): Promise<Network | undefined> {
    return await editResource("/networks", edit);
}
export async function fetchNetwork(id: string): Promise<Network | undefined> {
    return await fetchResource("/networks", id);
}

export async function fetchDisk(id: string): Promise<Disk | undefined> {
    return await fetchResource("/disks", id);
}

export async function fetchPartition(id: string): Promise<Partition | undefined> {
    return await fetchResource("/partitions", id);
}

export async function fetchContainer(id: string): Promise<Container | undefined> {
    return await fetchResource("/containers", id);
}

export async function fetchContainerProject(id: string): Promise<ContainerProject | undefined> {
    return await fetchResource("/containerProjects", id);
}

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

export async function deleteTask(id: string): Promise<boolean> {
    return await deleteResource("/tasks", id);
}
export async function fetchTask(id: string): Promise<Task | undefined> {
    return await fetchResource("/tasks", id);
}
export async function fetchAllTasks(): Promise<Task[]> {
    return await fetchResources("/tasks/all");
}

export async function fetchUserFile(id: string): Promise<UserFile | undefined> {
    return await fetchResource("/user/files", id);
}

export async function createServerDaemonToken(id: string): Promise<DaemonToken | undefined> {
    return await createResource("/server/daemon/tokens/create", { id });
}

export async function deleteDeamonToken(id: string): Promise<boolean> {
    return await deleteResource("/daemon/tokens", id);
}

export async function fetchServerDaemonTokens(id: string): Promise<DaemonToken[]> {
    return await fetchResources("/server/daemon/tokens", id);
}
