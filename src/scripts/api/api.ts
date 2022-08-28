const apiVersion = "/v1";
function getApiEndpoint() {
    return location.host === "sleepy.lamkas.dev" ? "https://api.sleepy.lamkas.dev" : "http://localhost:9001";
}

export async function get(descriptor: APIGetRequest): Promise<APIResponse> {
    const response: Response = await fetch(getApiEndpoint() + apiVersion + descriptor.path, { method: "GET", credentials: "include", headers: { "Content-Type": "application/json" } });
    return { status: response.status, body: response.json() };
}

export async function post(descriptor: APIPostRequest): Promise<APIResponse> {
    const response: Response = await fetch(getApiEndpoint() + apiVersion + descriptor.path, { method: "POST", body: descriptor.body, credentials: "include", headers: { "Content-Type": "application/json" } });
    return { status: response.status, body: response.json() };
}

export async function sendDelete(descriptor: APIPostRequest): Promise<APIResponse> {
    const response: Response = await fetch(getApiEndpoint() + apiVersion + descriptor.path, { method: "DELETE", body: descriptor.body, credentials: "include", headers: { "Content-Type": "application/json" } });
    return { status: response.status, body: response.json() };
}
