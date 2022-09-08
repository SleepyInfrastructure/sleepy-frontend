import { get, post, sendDelete } from "./api";

export async function createUser(username: string, password: string): Promise<User | undefined> {
    const response: APIResponse = await post({ path: `/users/create`, body: JSON.stringify({ username, password }) });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}
export async function fetchUser(id: string): Promise<User | undefined> {
    const response: APIResponse = await get({ path: `/users/fetch?id=${id}` });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
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
    const response: APIResponse = await sendDelete({ path: `/sessions/delete`, body: JSON.stringify({}) });
    location.href = "/login";

    return response.status === 200;
}

export async function createServer(create: ServerCreate): Promise<Server | undefined> {
    const response: APIResponse = await post({ path: `/servers/create`, body: JSON.stringify(create) });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}
export async function editServer(edit: ServerEdit): Promise<Server | undefined> {
    const response: APIResponse = await post({ path: `/servers/edit`, body: JSON.stringify(edit) });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}
export async function fetchServer(id: string): Promise<Server | undefined> {
    const response: APIResponse = await get({ path: `/servers/fetch?id=${id}` });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}
export async function fetchServerStructured(id: string): Promise<ServerStructured | undefined> {
    const response: APIResponse = await get({ path: `/server/structured/fetch?id=${id}` });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}
export async function fetchAllServersStructured(): Promise<ServerStructured[]> {
    const response: APIResponse = await get({ path: `/servers/all/structured/fetch` });
    if (response.status !== 200) {
        return [];
    }

    return response.body;
}

export async function fetchNetwork(id: string): Promise<Network | undefined> {
    const response: APIResponse = await get({ path: `/networks/fetch?id=${id}` });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function fetchDisk(id: string): Promise<Disk | undefined> {
    const response: APIResponse = await get({ path: `/disks/fetch?id=${id}` });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function fetchPartition(id: string): Promise<Partition | undefined> {
    const response: APIResponse = await get({ path: `/partitions/fetch?id=${id}` });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function fetchContainer(id: string): Promise<Container | undefined> {
    const response: APIResponse = await get({ path: `/containers/fetch?id=${id}` });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function fetchContainerProject(id: string): Promise<ContainerProject | undefined> {
    const response: APIResponse = await get({ path: `/containerProjects/fetch?id=${id}` });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function createUptimeEndpoint(name: string, host?: string, requestEndpoint?: string): Promise<UptimeEndpoint | undefined> {
    const response: APIResponse = await post({ path: `/uptimeEndpoints/create`, body: JSON.stringify({ name, host, requestEndpoint }) });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}
export async function editUptimeEndpoint(edit: UptimeEndpointEdit): Promise<UptimeEndpoint | undefined> {
    const response: APIResponse = await post({ path: `/uptimeEndpoints/edit`, body: JSON.stringify(edit) });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}
export async function fetchUptimeEndpoint(id: string): Promise<UptimeEndpoint | undefined> {
    const response: APIResponse = await get({ path: `/uptimeEndpoints/fetch?id=${id}` });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}
export async function fetchAllUptimeEndpointsStructured(): Promise<UptimeEndpointStructured[]> {
    const response: APIResponse = await get({ path: `/uptimeEndpoints/all/structured/fetch` });
    if (response.status !== 200) {
        return [];
    }

    return response.body;
}

export async function createServerDaemonToken(id: string): Promise<DaemonToken | undefined> {
    const response: APIResponse = await post({ path: `/server/daemon/tokens/create`, body: JSON.stringify({ id }) });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function deleteDeamonToken(id: string): Promise<boolean> {
    const response: APIResponse = await sendDelete({ path: `/daemon/tokens/delete`, body: JSON.stringify({ id }) });
    return response.status === 200;
}

export async function fetchServerDaemonTokens(id: string): Promise<DaemonToken[]> {
    const response: APIResponse = await get({ path: `/server/daemon/tokens/fetch?id=${id}` });
    if (response.status !== 200) {
        return [];
    }

    return response.body;
}
