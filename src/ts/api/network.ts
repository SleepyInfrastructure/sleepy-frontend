type Network = {
    id: string;
    author: string | null;
    name: string;
    ipv4: string | null;
};

/* Calls */
type NetworkCreate = {
    name: string;
    ipv4?: string;
}; 

type NetworkEdit = NetworkCreate & {
    id: string;
}; 