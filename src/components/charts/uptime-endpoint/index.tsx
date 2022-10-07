/* Base */
import { h, FunctionalComponent } from "preact";
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatTimestampShort } from "../../../scripts/util/util";
/* Styles */
import style from "../style.scss";

const UptimeEndpointChart: FunctionalComponent<UptimeEndpointChartConnectedProps> = (props: UptimeEndpointChartConnectedProps) => {
    const statistics = props.item.statistics.sort((a, b) => a.timestamp - b.timestamp);
    const [displayPing, setDisplayPing] = useState(true);
    const [displayRequestTime, setDisplayRequestTime] = useState(true);

    return <div className={style.chart}>
        <div className={style["chart-header"]}>
            <div className={style["icon-endpoint"]} />
            <div className={style["chart-title"]}>Ping</div>
        </div>
        <ResponsiveContainer width="100%" height="85%">
            <LineChart data={statistics} margin={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <XAxis dataKey="timestamp" tickFormatter={formatTimestampShort} tickMargin={8} padding={{ right: 20 }} tick={{ fill: "var(--color-primary-text)" }} />
                <YAxis tickFormatter={(e: number) => `${e.toFixed(0)} ms`} tickMargin={8} padding={{ top: 20, bottom: 20 }} tick={{ fill: "var(--color-primary-text)" }} />
                <Tooltip labelFormatter={formatTimestampShort} formatter={(e: number) => `${e.toFixed(0)} ms`} labelStyle={{ color: "var(--color-primary-text)" }} contentStyle={{ background: "var(--color-primary-dark)", border: 0 }} wrapperStyle={{ border: 0 }} />
                {props.item.host === null || !displayPing ? null : <Line name="Ping" type="monotone" dataKey="pingTime" stroke="#3bff6f" activeDot={{ r: 4 }} dot={{ r: 0 }} />}
                {props.item.requestEndpoint === null || !displayRequestTime ? null : <Line name="Request time" type="monotone" dataKey="requestTime" stroke="#ff8121" activeDot={{ r: 4 }} dot={{ r: 0 }} />}
            </LineChart>
        </ResponsiveContainer>
        <div className={style["chart-footer"]}>
            <div className={style["chart-footer-switch"]} onClick={() => { setDisplayPing(!displayPing); }}>
                <div className={style["icon-circle"]} data={displayPing ? "true" : "false"} style={{ background: "#3bff6f" }} />
                <div className={style["chart-footer-switch-text"]} data={displayPing ? "true" : "false"} style={{ color: "#3bff6f" }} >Ping</div>
            </div>
            <div className={style["chart-footer-switch"]} onClick={() => { setDisplayRequestTime(!displayRequestTime); }}>
                <div className={style["icon-circle"]} data={displayRequestTime ? "true" : "false"} style={{ background: "#ff8121" }} />
                <div className={style["chart-footer-switch-text"]} data={displayRequestTime ? "true" : "false"} style={{ color: "#ff8121" }}>Request Time</div>
            </div>
        </div>
    </div>;
};

export default UptimeEndpointChart;