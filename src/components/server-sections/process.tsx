import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'react';
import { Treemap } from 'recharts';
import { humanFileSize, pickHex } from '../../scripts/util/util';
import * as c from "../../routes/server-map/models/const";

const CustomizedContent: FunctionalComponent<any> = (props: any) => {
    const { root, depth, x, y, width, height, index, colors, sizes } = props;
    let { name } = props;
    const fontSize = Math.max(Math.min(26, width / 11), 10);
    const maxAllowed = Math.round((width / (fontSize * 0.6)));
    if(name !== undefined && name.length > maxAllowed) {
        name = `${name.substring(0, maxAllowed)}...`;
    }

    return (
        depth === 1 ? <g>
            <rect
                x={x}
                y={y}
                rx={5}
                width={width}
                height={height}
                style={{
                    fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : 'none',
                    stroke: '#282828',
                    strokeWidth: 2 / (depth + 1e-10),
                    strokeOpacity: 1 / (depth + 1e-10),
                    borderRadius: 10
                }}
            />
            {width > 50 ? (
            <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="#fff" fontSize={fontSize} strokeWidth={0}>
                {name}
            </text>
            ) : null}
            {width > 50 ? (
            <text x={x + width / 2} y={y + height / 2 + fontSize + 3} textAnchor="middle" fill="#fff" fontSize={fontSize * 0.75} strokeWidth={0}>
            ({sizes[index]})
            </text>
            ) : null}
            {width > 50 ? (
            <text x={x + Math.max(8, fontSize / 2)} y={y + fontSize + 7} fill="#fff" fontSize={fontSize} fillOpacity={0.9}>
                {index + 1}
            </text>
            ) : null}
        </g> : null
    );
}

const ProcessTreeMap: FunctionalComponent<ProcessTreeMapConnectedProps> = (props: ProcessTreeMapConnectedProps) => {
    const [dimensions, setDimensions] = useState({ w: window.innerWidth, h: window.innerHeight });
    useEffect(() => {
        window.addEventListener("resize", () => {
            setDimensions({ w: window.innerWidth, h: window.innerHeight });
        });
    }, []);

    const processHighMemoryLoad = (props.server.memory) / 4.5;
    const colors = props.processes.map(e => pickHex([252, 64, 58], [68, 252, 68], Math.min(1, e.memory / processHighMemoryLoad)));
    const sizes = props.processes.map(e => humanFileSize(e.memory));
    return (
        <Treemap
            width={dimensions.w - 220}
            height={250}
            data={props.processes.map(e => { return { name: e.name, children: [{ name: e.name, size: e.memory }] }})}
            dataKey="size"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent colors={colors} sizes={sizes} />}
        />
    );
}

export default ProcessTreeMap;