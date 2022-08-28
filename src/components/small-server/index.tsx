/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import style from "./style.scss";
/* Components */
import DiskChart from "../charts/disk";
import CPUChart from "../charts/cpu";
import NetworkChart from "../charts/network";
import MemoryChart from "../charts/memory";

const SmallServer: FunctionalComponent<ServerConnectedProps> = (props: ServerConnectedProps) => {
    const statistics = props.statistics.sort((a, b) => a.timestamp - b.timestamp);

    return (
        <div className={style.server}>
            <div className={style["server-header"]}>
                <div className={style["server-icon"]} style={{ background: `#${props.item.color}` }} />
                <a href={`/server/${props.item.id}`} className={style["server-name"]}>{props.item.name}</a>
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
            <div className={style["server-content"]}>
                {props.daemon === null ? 
                <div className={style["server-daemon"]}>Daemon: <span className={style["server-daemon-highlight-red"]}>Not Connected</span>
                    <a className={style["server-daemon-highlight-link"]} onClick={() => {
                        location.href = `/installing-daemon/${props.item.id}`;
                    }}>(Install)</a>
                </div> :
                <div className={style["server-daemon"]}>Daemon: <span className={style["server-daemon-highlight-green"]}>Connected</span>
                    <a className={style["server-daemon-highlight-link"]} onClick={() => {
                        if(props.daemon === null) { return; }
                        props.actions.daemonRequestRefresh(props.daemon?.server);
                    }}>(Request Refresh)</a>
                </div>}
                {props.network === null ? null :
                <div className={style["server-network"]}>
                    <div className={style["server-network-title"]}>Network: <span className={style["server-network-title-highlight"]}>{props.network.ipv4}</span></div>
                    <div className={style["server-network-ssh"]}>SSH: {<a className={style["server-network-ssh-highlight"]} href={`http://localhost:8888/?hostname=${props.network.ipv4}&username=${props.item.name}`} target="_blank" rel="noreferrer">Connect</a>}</div>
                </div>}
            </div>
        </div>
    );
};

export default SmallServer;
