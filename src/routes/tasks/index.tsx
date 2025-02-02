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
import Task from "../../components/task";
import EmptyPanel from "../../components/empty-panel";

const Tasks: FunctionalComponent<TasksConnectedProps> = (props: TasksConnectedProps) => {
    const tasks = Array.from(props.tasks.values()).sort((a, b) => b.start - a.start);
    useEffect(() => {
        for(const task of tasks) {
            switch(task.type) {
                case "BACKUP_DATABASE":
                case "BACKUP_DATABASE_SCHEMA":
                case "REQUEST_CONTAINER_LOG":
                    if(task.result !== null && props.userFiles.get(task.result) === undefined) {
                        props.actions.fetchUserFile(task.result);
                    }
                    break;
            }
        }
    }, [props.actions, tasks, props.userFiles]);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-task"]} />
                <div className={baseStyle["page-title"]}>Tasks ({tasks.length})</div>
            </div>
            <div class={style["tasks-content"]}>
                {tasks.map((e, i) => {
                    let object, result;
                    switch(e.type) {
                        case "BACKUP_DATABASE":
                        case "BACKUP_DATABASE_SCHEMA":
                            object = e.object === null ? undefined : props.databases.get(e.object);
                            result = e.result === null ? undefined : props.userFiles.get(e.result);
                            break;

                        case "REQUEST_CONTAINER_LOG":
                            object = e.object === null ? undefined : props.containers.get(e.object);
                            result = e.result === null ? undefined : props.userFiles.get(e.result);
                            break;
                    }
                    return <Task key={i} item={e} object={object} result={result} actions={props.actions} />
                })}
                {tasks.length > 0 ? null : <EmptyPanel />}
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Tasks);
