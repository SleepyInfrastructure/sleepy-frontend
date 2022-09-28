/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import serverStyle from "../server/style.scss";
/* Components */
import DiskChart from "../charts/disk";
import CPUChart from "../charts/cpu";
import NetworkChart from "../charts/network";
import MemoryChart from "../charts/memory";
import ServerContent from "../server-content";

const SmallServer: FunctionalComponent<ServerConnectedProps> = (props: ServerConnectedProps) => {
    const statistics = props.statistics.filter(e => e.type === "MINUTE").sort((a, b) => a.timestamp - b.timestamp);

    return (
        <div className={baseStyle.panel} data="big">
            <div className={baseStyle["panel-header"]}>
                <div className={serverStyle["server-icon"]} style={{ background: `#${props.item.color}` }} />
                <a href={`/server/${props.item.id}`} className={serverStyle["server-name"]} style={{ color: `#${props.item.color}` }}>{props.item.name}</a>
                <a href={`/edit-server/${props.item.id}`} className={baseStyle["panel-link"]}>(Edit)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.deleteServer(props.item.id); }}>(Delete)</a>
            </div>
            {statistics.length === 0 ? null :
            <div className={serverStyle["server-charts"]}>
                <CPUChart type={"MINUTE"} statistics={statistics} />
                <MemoryChart type={"MINUTE"} item={props.item} statistics={statistics} />
                <NetworkChart type={"MINUTE"} statistics={statistics} />
            </div>}
            <div className={serverStyle["server-charts"]}>
                {props.disks.map((e, i) => e.statistics.length === 0 ? null : <DiskChart key={i} item={e} type={"HOUR"} />)}
            </div>
            <ServerContent {...props} />
        </div>
    );
};

export default SmallServer;
