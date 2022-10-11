export function humanFileSize(size: number) {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return `${Number((size / Math.pow(1024, i)).toFixed(2)) * 1} ${["B", "KB", "MB", "GB", "TB"][i]}`;
}

export function formatTimestampChart(e: number | "auto", type: StatisticType) {
    if(e === 0) {
        return "";
    } else if(e === "auto") {
        return "No data";
    }

    switch(type) {
        case "MINUTE":
            return "";

        case "HOUR":
            return formatTimestampShort(e);

        case "DAY":
            return new Date(e * 1000).toLocaleTimeString([], { hour: "2-digit" });

        case "MONTH":
            return new Date(e * 1000).toLocaleDateString([], { day: "2-digit", month: "2-digit" });

        case "YEAR":
            return new Date(e * 1000).toLocaleDateString([], { month: "short" });
    }
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

export function pickHex(color1: number[], color2: number[], weight: number) {
    const w1 = weight;
    const w2 = 1 - w1;
    const rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
export function componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}
export function rgbToHex(r: number, g: number, b: number) {
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}