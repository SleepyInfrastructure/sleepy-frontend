export function hostSatisfies(host: string, endpoint: string) {
    if(host === "") { return endpoint === "" ? "(host or request endpoint has to be specified)" : "(satisfies)"; }
    const ValidIpAddressRegex = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";
    const ValidHostnameRegex = "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$";
    return host.match(ValidIpAddressRegex) !== null || host.match(ValidHostnameRegex) !== null ? "(satisfies)" : "(is not a valid ip address or hostname)";
}

export function endpointSatisfies(host: string, endpoint: string) {
    if(endpoint === "") { return host === "" ? "(host or request endpoint has to be specified)" : "(satisfies)"; }
    try {
        const testUrl = new URL(endpoint);
        return testUrl.protocol === "http:" || testUrl.protocol === "https:" ? "(satisfies)" : "(is not http or https)";
    } catch(e) {
        return "(is not http or https)";
    }
}