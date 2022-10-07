/* Base */
import { h, FunctionalComponent } from "preact";
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { humanFileSize, formatTimestampChart } from "../../../scripts/util/util";
/* Styles */
import style from "../style.scss";

const NetworkChart: FunctionalComponent<NetworkChartConnectedProps> = (props: NetworkChartConnectedProps) => {
    const [displayDownload, setDisplayDownload] = useState(true);
    const [displayUpload, setDisplayUpload] = useState(true);

    return <div className={style.chart}>
        <div className={style["chart-header"]}>
            <div className={style["icon-network"]} />
            <div className={style["chart-title"]}>Network Usage</div>
        </div>
        <ResponsiveContainer width="100%" height="85%">
            <LineChart data={props.statistics} margin={{ top: 10, bottom: 10, left: 20, right: 20 }}>
                <XAxis dataKey="timestamp" tickFormatter={(e) => { return formatTimestampChart(e, props.type); }} tickMargin={8} padding={{ right: 20 }} tick={{ fill: "var(--color-primary-text)" }} />
                <YAxis tickFormatter={(e: number) => `${humanFileSize(e)}/s`} tickMargin={8} padding={{ top: 20, bottom: 20 }} tick={{ fill: "var(--color-primary-text)" }} />
                <Tooltip labelFormatter={(e) => { return formatTimestampChart(e, props.type); }} formatter={(e: number) => `${humanFileSize(e)}/s`} labelStyle={{ color: "var(--color-primary-text)" }} contentStyle={{ background: "var(--color-primary-dark)", border: 0 }} wrapperStyle={{ border: 0 }} />
                {displayDownload ? <Line name="Download" type="monotone" dataKey="rx" stroke="#3bff6f" activeDot={{ r: 4 }} dot={{ r: 0 }} /> : null}
                {displayUpload ? <Line name="Upload" type="monotone" dataKey="tx" stroke="#3bb4ff" activeDot={{ r: 4 }} dot={{ r: 0 }} /> : null}
            </LineChart>
        </ResponsiveContainer>
        <div className={style["chart-footer"]}>
            <div className={style["chart-footer-switch"]} onClick={() => { setDisplayDownload(!displayDownload); }}>
                <div className={style["icon-circle"]} data={displayDownload ? "true" : "false"} style={{ background: "#3bff6f" }} />
                <div className={style["chart-footer-switch-text"]} data={displayDownload ? "true" : "false"} style={{ color: "#3bff6f" }} >Download</div>
            </div>
            <div className={style["chart-footer-switch"]} onClick={() => { setDisplayUpload(!displayUpload); }}>
                <div className={style["icon-circle"]} data={displayUpload ? "true" : "false"} style={{ background: "#3bb4ff" }} />
                <div className={style["chart-footer-switch-text"]} data={displayUpload ? "true" : "false"} style={{ color: "#3bb4ff" }}>Upload</div>
            </div>
        </div>
    </div>;
};

export default NetworkChart;