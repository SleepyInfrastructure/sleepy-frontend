/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import style from "./style.scss";
/* Components */
import DiskChart from "../charts/disk";
import CPUChart from "../charts/cpu";
import NetworkChart from "../charts/network";
import MemoryChart from "../charts/memory";
import ServerContent from "../server-content";
import ServerSections from "../server-sections";

const Server: FunctionalComponent<ServerConnectedProps> = (props: ServerConnectedProps) => {
    const statistics = props.statistics.sort((a, b) => a.timestamp - b.timestamp);

    return (
        <div className={style.server}>
            <div className={style["server-header"]}>
                <div className={style["server-icon"]} style={{ background: `#${props.item.color}` }} />
                <a href={`/server/${props.item.id}`} className={style["server-name"]} style={{ color: `#${props.item.color}` }}>{props.item.name}</a>
                <a href={`/edit-server/${props.item.id}`} className={style["server-link"]}>(Edit)</a>
            </div>
            {statistics.length === 0 ? null :
            <div className={style["server-charts"]}>
                <CPUChart statistics={statistics} />
                <MemoryChart item={props.item} statistics={statistics} />
                <NetworkChart statistics={statistics} />
            </div>}
            <div className={style["server-charts"]}>
                {props.disks.map((e, i) => e.statistics.length === 0 ? null : <DiskChart key={i} item={e} />)}
            </div>
            <ServerContent {...props} />
            <ServerSections {...props} />
        </div>
    );
};

export default Server;
