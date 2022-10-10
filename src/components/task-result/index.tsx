/* Base */
import { h, FunctionalComponent } from "preact";
import { apiVersion, getApiEndpoint } from "../../scripts/api/api";
import { humanFileSize } from "../../scripts/util/util";
/* Styles */
import baseStyle from "../style.scss";

const TaskResult: FunctionalComponent<TaskResultConnectedProps> = (props: TaskResultConnectedProps) => {
    if(props.result === undefined) {
        return null;
    }

    switch(props.item.type) {
        case "BACKUP_DATABASE":
        case "BACKUP_DATABASE_SCHEMA":
        case "REQUEST_CONTAINER_LOG":
            return <div className={baseStyle["panel-content-row"]}>
                Result: <span className={baseStyle["panel-content-row-highlight"]}>{props.result.id}</span>
                <a href={`${getApiEndpoint()}${apiVersion}/user/files/access?id=${props.result.id}`} className={baseStyle["panel-link"]} download>(Download) [{humanFileSize(props.result.size)}]</a>
            </div>;
    }

    return null;
};

export default TaskResult;
