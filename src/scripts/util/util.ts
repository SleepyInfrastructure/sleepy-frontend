export function humanFileSize(size: number) {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return `${Number((size / Math.pow(1024, i)).toFixed(2)) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`;
}

export function formatTimestampShort(e: number) {
    return new Date(e * 1000).toLocaleTimeString([], { hour: "2-digit", minute:"2-digit" });
}

export function formatTimestampLong(e: number) {
    return new Date(e * 1000).toLocaleTimeString();
}

export function formatDurationNow(start: number) {
    return formatDuration(start, Date.now() / 1000);
}

export function formatDuration(start: number, end: number) {
    const s = Math.round(end - start);
    if(s < 60) { return `${s} seconds`; }
    const time = {
        month: Math.floor(s / 2592000),
        day: Math.floor(s / 86400) % 30,
        hour: Math.floor(s / 3600) % 24,
        minute: Math.floor(s / 60) % 60
    };
    return Object.entries(time)
        .filter(val => val[1] !== 0)
        .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
        .join(", ");
}