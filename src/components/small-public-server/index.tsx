/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import serverStyle from "../server/style.scss";
import style from "./style.scss";
/* Components */
import CPUChart from "../charts/cpu";
import NetworkChart from "../charts/network";
import MemoryChart from "../charts/memory";

const SmallPublicServer: FunctionalComponent<PublicServerConnectedProps> = (props: PublicServerConnectedProps) => {
    const statistics = props.statistics.filter(e => e.type === "MINUTE").sort((a, b) => a.timestamp - b.timestamp);

    return (
        <div className={baseStyle.panel} data="big">
            <div className={baseStyle["panel-header"]}>
                <div className={serverStyle["icon-server"]} />
                <div className={serverStyle["server-name"]}>{props.item.name}</div>
            </div>
            {statistics.length === 0 ? null :
            <div className={style["server-section-charts"]}>
                <CPUChart type={"HOUR"} statistics={statistics} />
                <MemoryChart type={"HOUR"} statistics={statistics} memory={props.item.memory} swap={props.item.swap} />
                <NetworkChart type={"HOUR"} statistics={statistics} />
            </div>}
        </div>
    );
};

export default SmallPublicServer;
