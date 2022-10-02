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

type UserFile = {
    id: string;
    author: string;
    type: string;
    size: number;
};

/* Calls */
type UserCreate = {
    username: string;
    password: string;
};

type SMBInstanceCreate = {
    name: string;
    server: string;
};
type SMBInstanceEdit = {
    id: string;
    name?: string;
};

type SMBShareCreate = {
    name: string;
    parent: string;
    path: string;
    browsable: boolean;
    readonly: boolean;
    guest: boolean;
    users: string[];
    admins: string[];
};
type SMBShareEdit = {
    id: string;
    name?: string;
    path?: string;
    browsable?: boolean;
    readonly?: boolean;
    guest?: boolean;
    users?: string[];
    admins?: string[];
};

type SMBUserCreate = {
    name: string;
    parent: string;
};
type SMBUserEdit = {
    id: string;
    name?: string;
};

type DatabaseCreate = {
    name: string;
    server: string;
};
type DatabaseEdit = {
    id: string;
    name?: string;
    server?: string;
};

type UptimeEndpointCreate = {
    name: string;
    host?: string;
    requestEndpoint?: string;
};
type UptimeEndpointEdit = {
    id: string;
    name?: string;
    host?: string;
    requestEndpoint?: string;
};