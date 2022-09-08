/* Base */
import { h, FunctionalComponent } from "preact";
import { REFRESH_ALL } from "../../ts/api/const";
/* Styles */
import baseStyle from "../server/style.scss";
import style from "./style.scss";
/* Components */
import DiskChart from "../charts/disk";
import CPUChart from "../charts/cpu";
import NetworkChart from "../charts/network";
import MemoryChart from "../charts/memory";

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
            <div className={baseStyle["server-content"]}>
                {props.daemon === null ? 
                <div className={baseStyle["server-daemon"]}>Daemon: <span className={baseStyle["server-daemon-highlight-red"]}>Not Connected</span>
                    <a className={baseStyle["server-daemon-highlight-link"]} onClick={() => {
                        location.href = `/installing-daemon/${props.item.id}`;
                    }}>(Install)</a>
                </div> :
                <div className={baseStyle["server-daemon"]}>Daemon: <span className={baseStyle["server-daemon-highlight-green"]}>Connected</span>
                    <a className={baseStyle["server-daemon-highlight-link"]} onClick={() => {
                        if(props.daemon === null) { return; }
                        props.actions.daemonRequestResources(props.daemon?.server, REFRESH_ALL);
                    }}>(Request Refresh)</a>
                </div>}
                {props.network === null ? null :
                <div className={baseStyle["server-network"]}>
                    <div className={baseStyle["server-network-title"]}>Network: <span className={baseStyle["server-network-title-highlight"]}>{props.network.ipv4}</span></div>
                    <div className={baseStyle["server-network-ssh"]}>SSH: {<a className={baseStyle["server-network-ssh-highlight"]} href={`http://localhost:8888/?hostname=${props.network.ipv4}&username=${props.item.name}`} target="_blank" rel="noreferrer">Connect</a>}</div>
                </div>}
            </div>
        </div>
    );
};

export default SmallServer;
