/* Base */
import { h, FunctionalComponent } from "preact";
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { humanFileSize, formatTimestampChart } from "../../../scripts/util/util";
/* Styles */
import style from "../style.scss";

const DiskChart: FunctionalComponent<DiskChartConnectedProps> = (props: DiskChartConnectedProps) => {
    const [mode, setMode] = useState("SPEED");
    const isModeSpeed = mode === "SPEED";
    const isModeLatency = mode === "LATENCY";

    return <div className={style.chart}>
        <div className={style["chart-header"]}>
            <div className={style["icon-disk"]} />
            <div className={style["chart-title"]}>{props.title}</div>
        </div>
        <ResponsiveContainer width="100%" height="85%">
            <LineChart data={props.statistics} margin={{ top: 10, bottom: 10, left: 20, right: 20 }}>
                <XAxis dataKey="timestamp" tickFormatter={(e) => { return formatTimestampChart(e, props.type); }} tickMargin={8} padding={{ right: 20 }} tick={{ fill: "var(--color-primary-text)" }} />
                {isModeSpeed ?
                    <YAxis tickFormatter={(e: number) => `${humanFileSize(e)}/s`} tickMargin={8} padding={{ top: 20, bottom: 20 }} tick={{ fill: "var(--color-primary-text)" }} domain={[0, 100]} /> :
                    <YAxis tickFormatter={(e: number) => `${e} ms`} tickMargin={8} padding={{ top: 20, bottom: 20 }} tick={{ fill: "var(--color-primary-text)" }} />}
                {isModeSpeed ?
                    <Tooltip labelFormatter={(e) => { return formatTimestampChart(e, props.type); }} formatter={(e: number) => `${humanFileSize(e)}/s`} labelStyle={{ color: "var(--color-primary-text)" }} contentStyle={{ background: "var(--color-primary-dark)", border: 0 }} wrapperStyle={{ border: 0 }} /> :
                    <Tooltip labelFormatter={(e) => { return formatTimestampChart(e, props.type); }} formatter={(e: number) => `${e} ms`} labelStyle={{ color: "var(--color-primary-text)" }} contentStyle={{ background: "var(--color-primary-dark)", border: 0 }} wrapperStyle={{ border: 0 }} />
                }
                <Line name="Read" type="monotone" dataKey={isModeSpeed ? "read" : "readLatency"} stroke="#3bff6f" activeDot={{ r: 4 }} dot={{ r: 0 }} />
                <Line name="Write" type="monotone" dataKey={isModeSpeed ? "write" : "writeLatency"} stroke="#3bb4ff" activeDot={{ r: 4 }} dot={{ r: 0 }} />
            </LineChart>
        </ResponsiveContainer>
        <div className={style["chart-footer"]}>
            <div className={style["chart-footer-switch"]} onClick={() => { setMode("SPEED"); }}>
                <div className={style["icon-circle"]} data={isModeSpeed ? "true" : "false"} style={{ background: "#3bff6f" }} />
                <div className={style["chart-footer-switch-text"]} data={isModeSpeed ? "true" : "false"} style={{ color: "#3bff6f" }} >Speed</div>
            </div>
            <div className={style["chart-footer-switch"]} onClick={() => { setMode("LATENCY"); }}>
                <div className={style["icon-circle"]} data={isModeLatency ? "true" : "false"} style={{ background: "#3bb4ff" }} />
                <div className={style["chart-footer-switch-text"]} data={isModeLatency ? "true" : "false"} style={{ color: "#3bb4ff" }}>Latency</div>
            </div>
        </div>
    </div>;
};

export default DiskChart;