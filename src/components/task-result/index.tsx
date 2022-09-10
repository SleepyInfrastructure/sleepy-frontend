/* Base */
import { h, FunctionalComponent } from "preact";
import { apiVersion, getApiEndpoint } from "../../scripts/api/api";
import { humanFileSize } from "../../scripts/util/util";
import { TaskType } from "../../ts/const";
/* Styles */
import baseStyle from "../style.scss";

const TaskResult: FunctionalComponent<TaskResultConnectedProps> = (props: TaskResultConnectedProps) => {
    if(props.result === undefined) {
        return null;
    }

    switch(props.item.type) {
        case TaskType.BACKUP_DATABASE:
            return <div className={baseStyle["panel-content-row"]}>
                Result: <span className={baseStyle["panel-content-row-highlight"]}>{props.result.id}</span>
                <a href={`${getApiEndpoint()}${apiVersion}/user/files/access?id=${props.result.id}`} className={baseStyle["panel-link"]} download>(Download) [{humanFileSize(props.result.size)}]</a>
            </div>;
    }

    return null;
};

export default TaskResult;
