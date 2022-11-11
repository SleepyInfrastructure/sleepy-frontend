/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const Network: FunctionalComponent<NetworkConnectedProps> = (props: NetworkConnectedProps) => {
    return (
        <div id={`network-${props.item.id}`} className={baseStyle.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={style["icon-network"]} />
                <div className={baseStyle["panel-name"]}>{props.item.name}</div>
                <a className={baseStyle["panel-link"]} onClick={() => { location.href = `/edit-network/${props.item.id}`; }}>(Edit)</a>
            </div>
            <div className={baseStyle["panel-content"]}>
                <div className={baseStyle["panel-content-row"]}>ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.id}</span></div>
                <div className={baseStyle["panel-content-row"]}>IPV4: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.ipv4 ?? "Not set"}</span></div>
                {props.item.ipv4 === null ? null : <div className={baseStyle["panel-content-row"]}>
                    SSH: <a className={baseStyle["panel-link"]} data="no-margin" href={`http://localhost:8888/?hostname=${props.item.ipv4}&username=${props.item.name}`} target="_blank" rel="noreferrer">Connect</a>
                </div>}
            </div>
        </div>
    );
};

export default Network;
