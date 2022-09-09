/* Base */
import { h, FunctionalComponent } from "preact";
import { REFRESH_ALL } from "../../ts/const";
/* Styles */
import style from "./style.scss";

const ServerContent: FunctionalComponent<ServerContentConnectedProps> = (props: ServerContentConnectedProps) => {
    return (
        <div className={style["server-content"]}>
            {props.daemon === null ?
            <div className={style["server-content-row"]}>
                Daemon: <span className={style["server-daemon-highlight-red"]}>Not Connected</span>
                <a className={style["server-content-link-right"]} onClick={() => {
                    location.href = `/installing-daemon/${props.item.id}`;
                }}>(Install)</a>
            </div> :
            <div className={style["server-content-row"]}>
                Daemon: <span className={style["server-daemon-highlight-green"]}>Connected</span>
                <a className={style["server-content-link-right"]} onClick={() => {
                    if(props.daemon === null) { return; }
                    props.actions.daemonRequestResources(props.daemon?.server, REFRESH_ALL);
                }}>(Request Refresh)</a>
            </div>}
            {props.network === null ? null :
            <div className={style["server-content-row"]}>
                <div className={style["server-network-title"]}>
                    Network: <span className={style["server-network-title-highlight"]}>{props.network.name}</span>
                    <a className={style["server-content-link-right"]} onClick={() => {
                        location.href = `/edit-network/${props.network?.id}`;
                    }}>(Edit)</a>
                 </div>
                <div className={style["server-network-title"]}>
                    IPV4: <span className={style["server-network-title-highlight"]}>{props.network.ipv4 ?? "Not set"}</span>
                </div>
                {props.network.ipv4 === null ? null :
                    <div className={style["server-content-row"]}>
                        SSH: {<a className={style["server-content-link"]} href={`http://localhost:8888/?hostname=${props.network.ipv4}&username=${props.item.name}`} target="_blank" rel="noreferrer">Connect</a>}
                    </div>
                }
            </div>}
        </div>
    );
};

export default ServerContent;
