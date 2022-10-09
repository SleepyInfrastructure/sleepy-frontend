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
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
            props.actions.fetchAllTasks();
        }
    }, [props.actions, props.session]);
    useEffect(() => {
        for(const task of Array.from(props.tasks.values())) {
            switch(task.type) {
                case TaskType.BACKUP_DATABASE:
                case TaskType.BACKUP_DATABASE_SCHEMA:
                case TaskType.REQUEST_CONTAINER_LOG:
                    if(task.result !== null && props.userFiles.get(task.result) === undefined) {
                        props.actions.fetchUserFile(task.result);
                    }
                    break;
            }
        }
    }, [props.actions, props.tasks, props.userFiles]);
    const tasks = Array.from(props.tasks.values()).sort((a, b) => b.start - a.start);

    return (
        <div class={baseStyle.page}>
            <div className={baseStyle["page-content"]}>
                <div className={baseStyle["page-header"]}>
                    <div className={style["icon-task"]} />
                    <div className={baseStyle["page-title"]}>Tasks</div>
                </div>
                <div class={style["tasks-content"]}>
                    {tasks.map((e, i) => {
                        let object, result;
                        switch(e.type) {
                            case TaskType.BACKUP_DATABASE:
                            case TaskType.BACKUP_DATABASE_SCHEMA:
                                object = e.object === null ? undefined : props.databases.get(e.object);
                                result = e.result === null ? undefined : props.userFiles.get(e.result);
                                break;

                            case TaskType.REQUEST_CONTAINER_LOG:
                                object = e.object === null ? undefined : props.containers.get(e.object);
                                result = e.result === null ? undefined : props.userFiles.get(e.result);
                                break;
                        }
                        return <Task key={i} item={e} object={object} result={result} actions={props.actions} />
                    })}
                    {tasks.length > 0 ? null : <EmptyPanel />}
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Tasks);
