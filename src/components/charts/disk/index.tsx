/* Base */
import { h, FunctionalComponent } from "preact";
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { humanFileSize, formatTimestamp } from "../../../scripts/util/util";
/* Styles */
import style from "../style.scss";

const DiskChart: FunctionalComponent<DiskChartConnectedProps> = (props: DiskChartConnectedProps) => {
    const statistics = props.item.statistics.sort((a, b) => a.timestamp - b.timestamp);
    const [mode, setMode] = useState("SPEED");
    const isModeSpeed = mode === "SPEED";
    const isModeLatency = mode === "LATENCY";

    return <div className={style.chart}>
        <div className={style["chart-header"]}>
            <div className={style["disk-icon"]} />
            <div className={style["chart-title"]}>{props.item.model !== undefined ? `${props.item.model} (${props.item.name})` : props.item.name}</div>
        </div>
        <ResponsiveContainer width="100%" height="85%">
            <LineChart data={statistics} margin={{ top: 10, bottom: 10, left: 20, right: 20 }}>
                <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} tickMargin={8} padding={{ right: 20 }} tick={{ fill: "#ff3645" }} />
                {isModeSpeed ?
                    <YAxis tickFormatter={(e: number) => `${humanFileSize(e)}/s`} tickMargin={8} padding={{ top: 20, bottom: 20 }} tick={{ fill: "#ff3645" }} domain={[0, 100]} /> :
                    <YAxis tickFormatter={(e: number) => `${e} ms`} tickMargin={8} padding={{ top: 20, bottom: 20 }} tick={{ fill: "#ff3645" }} />}
                {isModeSpeed ?
                    <Tooltip labelFormatter={formatTimestamp} formatter={(e: number) => `${humanFileSize(e)}/s`} labelStyle={{ color: "#ff3645" }} contentStyle={{ background: "#202020", border: 0 }} wrapperStyle={{ border: 0 }} /> :
                    <Tooltip labelFormatter={formatTimestamp} formatter={(e: number) => `${e} ms`} labelStyle={{ color: "#ff3645" }} contentStyle={{ background: "#202020", border: 0 }} wrapperStyle={{ border: 0 }} />
                }
                <Line name="Read" type="monotone" dataKey={isModeSpeed ? "read" : "readLatency"} stroke="#3bff6f" activeDot={{ r: 4 }} dot={{ r: 0 }} />
                <Line name="Write" type="monotone" dataKey={isModeSpeed ? "write" : "writeLatency"} stroke="#3bb4ff" activeDot={{ r: 4 }} dot={{ r: 0 }} />
            </LineChart>
        </ResponsiveContainer>
        <div className={style["chart-footer"]}>
            <div className={style["chart-footer-switch"]} onClick={() => { setMode("SPEED"); }}>
                <div className={style["circle-icon"]} data={isModeSpeed ? "true" : "false"} style={{ background: "#3bff6f" }} />
                <div className={style["chart-footer-switch-text"]} data={isModeSpeed ? "true" : "false"} style={{ color: "#3bff6f" }} >Speed</div>
            </div>
            <div className={style["chart-footer-switch"]} onClick={() => { setMode("LATENCY"); }}>
                <div className={style["circle-icon"]} data={isModeLatency ? "true" : "false"} style={{ background: "#3bb4ff" }} />
                <div className={style["chart-footer-switch-text"]} data={isModeLatency ? "true" : "false"} style={{ color: "#3bb4ff" }}>Latency</div>
            </div>
        </div>
    </div>;
};

export default DiskChart;