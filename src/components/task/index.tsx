/* Base */
import { h, FunctionalComponent } from "preact";
import { getTaskColor, getTaskName, getTaskStatus } from "../../scripts/util/task";
import { formatDuration, formatDurationNow } from "../../scripts/util/util";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import TaskObject from "../task-object";
import TaskResult from "../task-result";

const Task: FunctionalComponent<TaskConnectedProps> = (props: TaskConnectedProps) => {
    const color = getTaskColor(props.item);
    return (
        <div className={style.task}>
            <div className={baseStyle["panel-header"]}>
                <div className={style["task-icon"]} data={props.item.type} style={{ background: color }} />
                <div className={baseStyle["panel-name"]} style={{ color }}>{getTaskName(props.item)}</div>
            </div>
            <div className={baseStyle["panel-content"]}>
                <TaskObject {...props} />
                <div className={baseStyle["panel-content-row"]}>Status: <span className={baseStyle["panel-content-row-highlight"]} style={{ color }}>{getTaskStatus(props.item)}</span></div>
                <div className={baseStyle["panel-content-row"]}>Duration: <span className={baseStyle["panel-content-row-highlight"]}>{formatDuration(props.item.start, props.item.end ?? (Date.now() / 1000))}</span></div>
                {props.item.end === null ? null : <div className={baseStyle["panel-content-row"]}>Ended: <span className={baseStyle["panel-content-row-highlight"]}>{formatDurationNow(props.item.end)} ago</span></div>}
                <TaskResult {...props} />
            </div>
        </div>
    );
};

export default Task;
