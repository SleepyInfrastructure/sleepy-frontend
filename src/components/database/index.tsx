/* Base */
import { h, FunctionalComponent } from "preact";
import { humanFileSize } from "../../scripts/util/util";
/* Styles */
import style from "./style.scss";

const Database: FunctionalComponent<DatabaseConnectedProps> = (props: DatabaseConnectedProps) => {
    return (
        <div className={style.database}>
            <div className={style["database-title-wrapper"]}>
                <div className={style["database-icon"]} />
                <div className={style["database-title"]}>{props.item.name}</div>
                <a className={style["database-link"]} onClick={() => {
                    props.actions.daemonRequestDatabaseBackup(props.item.parent, props.item.name);
                }}>(Request Backup)</a>
            </div>
        </div>
    );
};

export default Database;
