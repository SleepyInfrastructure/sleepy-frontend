/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import endpointStyle from "./style.scss";
/* Components */
import UptimeEndpointChart from "../charts/uptime-endpoint";

const UptimeEndpoint: FunctionalComponent<UptimeEndpointConnectedProps> = (props: UptimeEndpointConnectedProps) => {
    const avgTime = props.item.statistics.length < 1 ? 0 : (props.item.statistics.reduce((acc, curr) => acc + (curr.pingTime === null ? 0 : curr.pingTime), 0) / props.item.statistics.length).toFixed(2);
    const avgRequestTime = props.item.statistics.length < 1 ? 0 : (props.item.statistics.reduce((acc, curr) => acc + (curr.requestTime === null ? 0 : curr.requestTime), 0) / props.item.statistics.length).toFixed(2);

    return (
        <div className={baseStyle.panel} data="big">
            <div className={baseStyle["panel-header"]}>
                <div className={endpointStyle["icon-endpoint"]} />
                <div className={endpointStyle["endpoint-name"]}>{props.item.name}</div>
                <a href={`/edit-uptime-endpoint/${props.item.id}`} className={baseStyle["panel-link"]}>(Edit)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.deleteUptimeEndpoint(props.item.id); }}>(Delete)</a>
            </div>
            <div className={endpointStyle["endpoint-content"]}>
                {props.item.host === null ? null : 
                    <div className={endpointStyle["endpoint-field"]}>
                        Host: <span className={endpointStyle["endpoint-field-highlight"]}>{props.item.host}</span>
                    </div>
                }
                {props.item.requestEndpoint === null ? null : 
                    <div className={endpointStyle["endpoint-field"]}>
                        Request Endpoint: <span className={endpointStyle["endpoint-field-highlight"]}>{props.item.requestEndpoint}</span>
                    </div>
                }
                <div className={endpointStyle["endpoint-field"]}>
                    Average Times: <span className={endpointStyle["endpoint-field-highlight"]}>
                        <span style={{ color: "#3bff6f" }}>{avgTime}ms</span>/<span style={{ color: "#ff8121" }}>{avgRequestTime}ms</span>
                    </span>
                </div>
            </div>
            {props.item.statistics.length === 0 ? null : <UptimeEndpointChart item={props.item} />}
        </div>
    );
};

export default UptimeEndpoint;
