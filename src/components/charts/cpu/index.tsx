/* Base */
import { h, FunctionalComponent } from "preact";
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatTimestampChart } from "../../../scripts/util/util";
/* Styles */
import style from "../style.scss";

const CPUChart: FunctionalComponent<CPUChartConnectedProps> = (props: CPUChartConnectedProps) => {
    const [displayTotal, setDisplayTotal] = useState(true);
    const [displaySystem, setDisplaySystem] = useState(true);

    return <div className={style.chart}>
        <div className={style["chart-header"]}>
            <div className={style["icon-cpu"]} />
            <div className={style["chart-title"]}>CPU Usage</div>
        </div>
        <ResponsiveContainer width="100%" height="85%">
            <LineChart data={props.statistics} margin={{ top: 10, bottom: 10 }}>
                <XAxis dataKey="timestamp" tickFormatter={(e) => { return formatTimestampChart(e, props.type); }} tickMargin={8} padding={{ right: 20 }} tick={{ fill: "var(--color-primary-text)" }} />
                <YAxis tickFormatter={(e: number) => `${e.toFixed(0)}%`} tickMargin={8} padding={{ top: 20, bottom: 20 }} tick={{ fill: "var(--color-primary-text)" }} domain={[0, 100]} />
                <Tooltip labelFormatter={(e) => { return formatTimestampChart(e, props.type); }} formatter={(e: number) => `${e.toFixed(2)}%`} labelStyle={{ color: "var(--color-primary-text)" }} contentStyle={{ background: "var(--color-primary-dark)", border: 0 }} wrapperStyle={{ border: 0 }} />
                {displayTotal ? <Line name="CPU" type="monotone" dataKey={displaySystem ? ((e: Statistic) => e.cpuSystem + e.cpuUser) : "cpuUser"} stroke="#3bff6f" activeDot={{ r: 4 }} dot={{ r: 0 }} /> : null}
                {displaySystem ? <Line name="CPU (System)" type="monotone" dataKey="cpuSystem" stroke="#3bb4ff" activeDot={{ r: 4 }} dot={{ r: 0 }} /> : null}
            </LineChart>
        </ResponsiveContainer>
        <div className={style["chart-footer"]}>
            <div className={style["chart-footer-switch"]} onClick={() => { setDisplayTotal(!displayTotal); }}>
                <div className={style["icon-circle"]} data={displayTotal ? "true" : "false"} style={{ background: "#3bff6f" }} />
                <div className={style["chart-footer-switch-text"]} data={displayTotal ? "true" : "false"} style={{ color: "#3bff6f" }}>Total</div>
            </div>
            <div className={style["chart-footer-switch"]} onClick={() => { setDisplaySystem(!displaySystem); }}>
                <div className={style["icon-circle"]} data={displaySystem ? "true" : "false"} style={{ background: "#3bb4ff" }} />
                <div className={style["chart-footer-switch-text"]} data={displaySystem ? "true" : "false"} style={{ color: "#3bb4ff" }}>System</div>
            </div>
        </div>
    </div>;
};

export default CPUChart;