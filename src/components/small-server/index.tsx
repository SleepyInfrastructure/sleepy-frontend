/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../server/style.scss";
import style from "./style.scss";
/* Components */
import DiskChart from "../charts/disk";
import CPUChart from "../charts/cpu";
import NetworkChart from "../charts/network";
import MemoryChart from "../charts/memory";
import ServerContent from "../server-content";

const SmallServer: FunctionalComponent<ServerConnectedProps> = (props: ServerConnectedProps) => {
    const statistics = props.statistics.sort((a, b) => a.timestamp - b.timestamp);

    return (
        <div className={baseStyle.server}>
            <div className={baseStyle["server-header"]}>
                <div className={baseStyle["server-icon"]} style={{ background: `#${props.item.color}` }} />
                <a href={`/server/${props.item.id}`} className={baseStyle["server-name"]} style={{ color: `#${props.item.color}` }}>{props.item.name}</a>
                <a href={`/edit-server/${props.item.id}`} className={baseStyle["server-link"]}>(Edit)</a>
            </div>
            {statistics.length === 0 ? null :
            <div className={baseStyle["server-charts"]}>
                <CPUChart statistics={statistics} />
                <MemoryChart item={props.item} statistics={statistics} />
                <NetworkChart statistics={statistics} />
            </div>}
            <div className={baseStyle["server-charts"]}>
                {props.disks.map((e, i) => e.statistics.length === 0 ? null : <DiskChart key={i} item={e} />)}
            </div>
            <ServerContent {...props} />
        </div>
    );
};

export default SmallServer;
