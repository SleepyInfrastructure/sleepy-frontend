/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const Database: FunctionalComponent<DatabaseConnectedProps> = (props: DatabaseConnectedProps) => {
    return (
        <div className={baseStyle.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={style["database-icon"]} />
                <div className={baseStyle["panel-name"]}>{props.item.name}</div>
                <a className={baseStyle["panel-link"]} onClick={() => {
                    props.actions.daemonRequestDatabaseBackup(props.item.server, props.item.id, true);
                    setTimeout(() => {
                        location.href = "/tasks";
                    }, 1000);
                }}>(Request Backup)</a>
                <a className={baseStyle["panel-link"]} onClick={() => {
                    props.actions.daemonRequestDatabaseBackup(props.item.server, props.item.id, false);
                    setTimeout(() => {
                        location.href = "/tasks";
                    }, 1000);
                }}>(Request Schema Backup)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.deleteDatabase(props.item.id); }}>(Delete)</a>
            </div>
            <div className={baseStyle["panel-content"]}>
                <div className={baseStyle["panel-content-row"]}>ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.id}</span></div>
                <div className={baseStyle["panel-content-row"]}>Credentials: <span className={baseStyle["panel-content-row-highlight"]} data={props.item.credentials ? "green" : "red"}>{props.item.credentials ? "Present" : "Missing"}</span></div>
            </div>
        </div>
    );
};

export default Database;
