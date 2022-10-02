type SMBInstance = {
    id: string;
    author: string;
    server: string;
    name: string;
};

type SMBInstanceStructured = SMBInstance & {
    shares: SMBShare[];
    users: SMBUser[];
};

type SMBShareBase = {
    id: string;
    author: string;
    parent: string;
    name: string;
    path: string;
    browsable: boolean;
    readonly: boolean;
    guest: boolean;
};
type SMBShare = SMBShareBase & {
    users: string[];
    admins: string[];
};

type SMBUser = {
    id: string;
    author: string;
    parent: string;
    name: string;
};