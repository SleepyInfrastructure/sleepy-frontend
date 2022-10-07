/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const SMBUser: FunctionalComponent<SMBUserConnectedProps> = (props: SMBUserConnectedProps) => {
    return (
        <div className={baseStyle.panel} data="dark">
            <div className={baseStyle["panel-header"]}>
                <div className={style["icon-user"]} />
                <div className={style["user-name"]}>{props.item.name}</div>
                <a className={baseStyle["panel-link"]} href={`/edit-smb-user/${props.item.id}`}>(Edit)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.deleteSmbUser(props.item.id); }}>(Delete)</a>
            </div>
            <div className={baseStyle["panel-content"]}>
                <div className={baseStyle["panel-content-row"]}>ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.id}</span></div>
            </div>
        </div>
    );
};

export default SMBUser;
