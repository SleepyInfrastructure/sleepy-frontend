/* Base */
import { h, FunctionalComponent } from "preact";
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatTimestamp, humanFileSize } from "../../../scripts/util/util";
/* Styles */
import style from "../style.scss";

const MemoryChart: FunctionalComponent<MemoryChartConnectedProps> = (props: MemoryChartConnectedProps) => {
    const [displayPhysical, setDisplayPhysical] = useState(true);
    const [displaySwap, setDisplaySwap] = useState(true);
    const [displayPercentages, setDisplayPercentages] = useState(true);
    const memMax = Math.max(displayPhysical ? props.item.memory : 0, displaySwap ? props.item.swap : 0, 0)

    return <div className={style.chart}>
        <div className={style["chart-header"]}>
            <div className={style["memory-icon"]} />
            <div className={style["chart-title"]}>Memory Usage</div>
        </div>
        <ResponsiveContainer width="100%" height="85%">
            <LineChart data={props.statistics} margin={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} tickMargin={8} padding={{ right: 20 }} tick={{ fill: "#ff3645" }} />
                {displayPercentages ?
                    <YAxis tickFormatter={(e: number) => `${e.toFixed(0)}%`} tickMargin={8} padding={{ top: 20, bottom: 20 }} tick={{ fill: "#ff3645" }} domain={[0, 100]} /> :
                    <YAxis tickFormatter={(e: number) => humanFileSize(e)} tickMargin={8} padding={{ top: 20, bottom: 20 }} tick={{ fill: "#ff3645" }} domain={[0, memMax]} />}
                <Tooltip labelFormatter={formatTimestamp} formatter={displayPercentages ? (e: number) => `${e.toFixed(2)}%` : (e: number) => humanFileSize(e)} labelStyle={{ color: "#ff3645" }} contentStyle={{ background: "#202020", border: 0 }} wrapperStyle={{ border: 0 }} />
                {displayPhysical ? <Line name="Physical" type="monotone" dataKey={displayPercentages ? "memory" : (e: Statistic) => props.item.memory * (e.memory / 100)} stroke="#3bff6f" activeDot={{ r: 4 }} dot={{ r: 0 }} /> : null}
                {displaySwap ? <Line name="Swap" type="monotone" dataKey={displayPercentages ? "swap" : (e: Statistic) => props.item.swap * (e.swap / 100)} stroke="#3bb4ff" activeDot={{ r: 4 }} dot={{ r: 0 }} /> : null}
            </LineChart>
        </ResponsiveContainer>
        <div className={style["chart-footer"]}>
            <div className={style["chart-footer-switch"]} onClick={() => { setDisplayPhysical(!displayPhysical); }}>
                <div className={style["circle-icon"]} data={displayPhysical ? "true" : "false"} style={{ background: "#3bff6f" }} />
                <div className={style["chart-footer-switch-text"]} data={displayPhysical ? "true" : "false"} style={{ color: "#3bff6f" }} >Physical</div>
            </div>
            <div className={style["chart-footer-switch"]} onClick={() => { setDisplaySwap(!displaySwap); }}>
                <div className={style["circle-icon"]} data={displaySwap ? "true" : "false"} style={{ background: "#3bb4ff" }} />
                <div className={style["chart-footer-switch-text"]} data={displaySwap ? "true" : "false"} style={{ color: "#3bb4ff" }}>Swap</div>
            </div>
            <div className={style["chart-footer-switch"]} onClick={() => { setDisplayPercentages(!displayPercentages); }}>
                <div className={style["circle-icon"]} style={{ background: "#f5a142" }} />
                <div className={style["chart-footer-switch-text"]} style={{ color: "#f5a142" }}>{displayPercentages ? "Percentages" : "Amount"}</div>
            </div>
        </div>
    </div>;
};

export default MemoryChart;