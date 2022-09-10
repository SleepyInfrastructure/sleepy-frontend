type Task = {
    id: string;
    author: string;
    type: string;
    object: string | null;
    start: number;
    status: string;
    progress: number;
    end: number | null;
    result: string | null;
};