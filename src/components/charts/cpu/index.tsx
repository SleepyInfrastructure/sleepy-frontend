/* Base */
import { h, FunctionalComponent } from "preact";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatTimestampShort } from "../../../scripts/util/util";
/* Styles */
import style from "../style.scss";

const CPUChart: FunctionalComponent<CPUChartConnectedProps> = (props: CPUChartConnectedProps) => {
    return <div className={style.chart}>
        <div className={style["chart-header"]}>
            <div className={style["cpu-icon"]} />
            <div className={style["chart-title"]}>CPU Usage</div>
        </div>
        <ResponsiveContainer width="100%" height="85%">
            <LineChart data={props.statistics} margin={{ top: 10, bottom: 10 }}>
                <XAxis dataKey="timestamp" tickFormatter={formatTimestampShort} tickMargin={8} padding={{ right: 20 }} tick={{ fill: "#ff3645" }} />
                <YAxis tickFormatter={(e: number) => `${e.toFixed(0)}%`} tickMargin={8} padding={{ top: 20, bottom: 20 }} tick={{ fill: "#ff3645" }} domain={[0, 100]} />
                <Tooltip labelFormatter={formatTimestampShort} formatter={(e: number) => `${e.toFixed(2)}%`} labelStyle={{ color: "#ff3645" }} contentStyle={{ background: "#202020", border: 0 }} wrapperStyle={{ border: 0 }} />
                <Line name="CPU" type="monotone" dataKey="cpu" stroke="#3bff6f" activeDot={{ r: 4 }} dot={{ r: 0 }} />
            </LineChart>
        </ResponsiveContainer>
    </div>;
};

export default CPUChart;