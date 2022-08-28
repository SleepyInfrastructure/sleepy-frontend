/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import style from "./style.scss";
/* Components */
import UptimeEndpointChart from "../charts/uptime-endpoint";

const UptimeEndpoint: FunctionalComponent<UptimeEndpointConnectedProps> = (props: UptimeEndpointConnectedProps) => {
    const avgTime = props.item.statistics.length < 1 ? 0 : (props.item.statistics.reduce((acc, curr) => acc + (curr.pingTime === null ? 0 : curr.pingTime), 0) / props.item.statistics.length).toFixed(2);
    const avgRequestTime = props.item.statistics.length < 1 ? 0 : (props.item.statistics.reduce((acc, curr) => acc + (curr.requestTime === null ? 0 : curr.requestTime), 0) / props.item.statistics.length).toFixed(2);

    return (
        <div className={style.endpoint}>
            <div className={style["endpoint-header"]}>
                <div className={style["endpoint-icon"]} />
                <div className={style["endpoint-name"]}>{props.item.name}</div>
                <a href={`/edit-uptime-endpoint/${props.item.id}`} className={style["endpoint-link"]}>(Edit)</a>
            </div>
            <div className={style["endpoint-content"]}>
                {props.item.host === null ? null : 
                    <div className={style["endpoint-field"]}>
                        Host: <span className={style["endpoint-field-highlight"]}>{props.item.host}</span>
                    </div>
                }
                {props.item.requestEndpoint === null ? null : 
                    <div className={style["endpoint-field"]}>
                        Request Endpoint: <span className={style["endpoint-field-highlight"]}>{props.item.requestEndpoint}</span>
                    </div>
                }
                <div className={style["endpoint-field"]}>
                    Average Times: <span className={style["endpoint-field-highlight"]}>
                        <span style={{ color: "#3bff6f" }}>{avgTime}ms</span>/<span style={{ color: "#ff8121" }}>{avgRequestTime}ms</span>
                    </span>
                </div>
            </div>
            {props.item.statistics.length === 0 ? null : <UptimeEndpointChart item={props.item} />}
        </div>
    );
};

export default UptimeEndpoint;
