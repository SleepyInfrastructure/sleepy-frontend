/* Base Types */
type APIGetRequest = {
    path: string;
};

type APIPostRequest = {
    path: string;
    body: any;
};

type APIResponse = {
    status: number;
    body: any;
};

/* Types */
type Session = {
    id: string;
    user: string;
};

type User = {
    id: string;
    username: string;
};

type UptimeEndpoint = {
    id: string;
    author: string | null;
    name: string;
    host: string | null;
    requestEndpoint: string | null;
};

type UptimeEndpointStructured = UptimeEndpoint & {
    statistics: UptimeEndpointStatistic[];
};

type UptimeEndpointStatistic = {
    id: string;
    author: string;
    parent: string;
    timestamp: number;
    pingTime: number | null;
    requestTime: number | null;
};

type Daemon = {
    author: string;
    server: string;
};

type DaemonToken = {
    id: string;
    author: string;
    server: string;
    timestamp: number;
    used: number;
};

/* Edits */
type UptimeEndpointEdit = {
    id: string;
    name: string;
    host?: string;
    requestEndpoint?: string;
};