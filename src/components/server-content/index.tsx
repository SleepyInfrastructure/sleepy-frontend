/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import style from "./style.scss";

const ServerContent: FunctionalComponent<ServerContentConnectedProps> = (props: ServerContentConnectedProps) => {
    return (
        <div>
            <div className={style["server-content-row"]}>
                ID: <span className={style["server-daemon-highlight-red"]}>{props.item.id}</span>
                <a className={style["server-content-link-right"]} data="purple" href={`/server/${props.item.id}/map`}>(Show map)</a>
            </div>
            {props.daemon === null ?
            <div className={style["server-content-row"]}>
                Daemon: <span className={style["server-daemon-highlight-red"]}>Not Connected</span>
                <a className={style["server-content-link-right"]} href= {`/installing-daemon/${props.item.id}`}>(Install)</a>
            </div> :
            <div className={style["server-content-row"]}>
                Daemon: <span className={style["server-daemon-highlight-green"]}>Connected</span>
                <a className={style["server-content-link-right"]} onClick={() => {
                    if(props.daemon === null) { return; }
                    props.actions.daemonRequestResources(props.daemon?.server, REFRESH_ALL);
                }}>(Request Refresh)</a>
            </div>}
        </div>
    );
};

export default ServerContent;
