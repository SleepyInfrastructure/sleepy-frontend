/* Base */
import { h, FunctionalComponent } from "preact";
import { TaskType } from "../../ts/const";
/* Styles */
import baseStyle from "../style.scss";

const TaskObject: FunctionalComponent<TaskObjectConnectedProps> = (props: TaskObjectConnectedProps) => {
    if(props.object === undefined) {
        return null;
    }

    switch(props.item.type) {
        case TaskType.BACKUP_DATABASE:
            return <div className={baseStyle["panel-content-row"]}>
                Database: <span className={baseStyle["panel-content-row-highlight"]}>{props.object.name}</span>
                <a href={`/databases/${props.object.id}`} className={baseStyle["panel-link"]}>(Jump)</a>
            </div>;
    }

    return null;
};

export default TaskObject;
