/* Base */
import { h, FunctionalComponent } from "preact";
import { object } from "zod";
/* Styles */
import baseStyle from "../style.scss";

const AlertObject: FunctionalComponent<AlertObjectConnectedProps> = (props: AlertObjectConnectedProps) => {
    if(props.object === undefined) {
        return null;
    }
    if(Array.isArray(props.object) && (props.object as object[]).some(e => e === undefined)) {
        return null;
    }

    switch(props.item.type) {
        case "SERVER_DOWN":
        case "SERVER_CPU_LOAD":
        case "SERVER_MEM_LOAD":
        case "SERVER_NET_LOAD":
            return <div className={baseStyle["panel-content-row"]}>
                Server: <span className={baseStyle["panel-content-row-highlight"]}>{props.object.name}</span>
                <a href={`/server/${props.object.id}`} className={baseStyle["panel-link"]}>(Jump)</a>
            </div>;

        case "DISK_LOAD":
        case "DISK_LATENCY":
            return <div>
                <div className={baseStyle["panel-content-row"]}>
                    Server: <span className={baseStyle["panel-content-row-highlight"]}>{props.object[1].name}</span>
                    <a href={`/server/${props.object[1].server}`} className={baseStyle["panel-link"]}>(Jump)</a>
                </div>
                <div className={baseStyle["panel-content-row"]}>
                    Disk: <span className={baseStyle["panel-content-row-highlight"]}>{props.object[0].name}</span>
                </div>
            </div>;

        case "PARTITION_LOW_SPACE":
            return <div>
                <div className={baseStyle["panel-content-row"]}>
                    Server: <span className={baseStyle["panel-content-row-highlight"]}>{props.object[1].name}</span>
                    <a href={`/container/${props.object[1].id}`} className={baseStyle["panel-link"]}>(Jump)</a>
                </div>
                <div className={baseStyle["panel-content-row"]}>
                    Partition: <span className={baseStyle["panel-content-row-highlight"]}>{props.object[0].name}</span>
                    <a href={`/server/${props.object[0].server}`} className={baseStyle["panel-link"]}>(Jump)</a>
                </div>
            </div>;

        case "CONTAINER_DOWN":
            return <div>
                <div className={baseStyle["panel-content-row"]}>
                    Server: <span className={baseStyle["panel-content-row-highlight"]}>{props.object[1].name}</span>
                    <a href={`/server/${props.object[1].id}`} className={baseStyle["panel-link"]}>(Jump)</a>
                </div>
                <div className={baseStyle["panel-content-row"]}>
                    Container: <span className={baseStyle["panel-content-row-highlight"]}>{props.object[0].name}</span>
                    <a href={`/container/${props.object[0].id}`} className={baseStyle["panel-link"]}>(Jump)</a>
                </div>
            </div>;

        case "UPTIME_ENDPOINT_DOWN":
            return <div className={baseStyle["panel-content-row"]}>
                Endpoint: <span className={baseStyle["panel-content-row-highlight"]}>{props.object.name}</span>
                <a href={`/uptime-endpoint/${props.object.id}`} className={baseStyle["panel-link"]}>(Jump)</a>
            </div>;
    }

    return null;
};

export default AlertObject;
