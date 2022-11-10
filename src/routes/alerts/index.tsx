/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";
import baseStyle from "../style.scss";
/* Components */
import Alert from "../../components/alert";
import EmptyPanel from "../../components/empty-panel";

const Alerts: FunctionalComponent<AlertsConnectedProps> = (props: AlertsConnectedProps) => {
    const alerts = Array.from(props.alerts.values());
    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-alert"]} />
                <div className={baseStyle["page-title"]}>Alerts ({alerts.length})</div>
            </div>
            <div class={style["alerts-content"]}>
                {alerts.map((e, i) => {
                    let object;
                    switch(e.type) {
                        case "SERVER_DOWN":
                        case "SERVER_CPU_LOAD":
                        case "SERVER_MEM_LOAD":
                        case "SERVER_NET_LOAD":
                            object = e.object === null ? undefined : props.servers.get(e.object);
                            break;

                        case "DISK_LOAD":
                        case "DISK_LATENCY":
                            object = e.object === null ? undefined : props.disks.get(e.object);
                            if(object !== undefined) {
                                object = [object, props.servers.get(object.server)];
                            }
                            break;

                        case "PARTITION_LOW_SPACE":
                            object = e.object === null ? undefined : props.partitions.get(e.object);
                            if(object !== undefined) {
                                object = [object, props.servers.get(object.server)];
                            }
                            break;
                                
                        case "CONTAINER_DOWN":
                            object = e.object === null ? undefined : props.containers.get(e.object);
                            if(object !== undefined) {
                                object = [object, props.servers.get(object.server)];
                            }
                            break;

                        case "UPTIME_ENDPOINT_DOWN":
                            object = e.object === null ? undefined : props.servers.get(e.object);
                            break;
                    }
                    return <Alert key={i} item={e} object={object} actions={props.actions} />
                })}
                {alerts.length > 0 ? null : <EmptyPanel />}
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Alerts);
