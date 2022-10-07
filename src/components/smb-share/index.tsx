/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const SMBShare: FunctionalComponent<SMBShareConnectedProps> = (props: SMBShareConnectedProps) => {
    const flags = [props.item.browsable ? "browsable" : "not browsable", props.item.readonly ? "read only" : "write/read", props.item.guest ? "guests allowed" : "no guests"];
    const users = props.users.length < 1 ? "None" : props.users.map(e => e.name).join(", ");
    const admins = props.users.length < 1 ? "None" : props.users.filter(e => props.item.admins.includes(e.id)).map(e => e.name).join(", ");

    return (
        <div className={baseStyle.panel} data="dark">
            <div className={baseStyle["panel-header"]}>
                <div className={style["icon-share"]} />
                <div className={style["share-name"]}>{props.item.name}</div>
                <a className={baseStyle["panel-link"]} href={`/edit-smb-share/${props.item.id}`}>(Edit)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.deleteSmbShare(props.item.id); }}>(Delete)</a>
            </div>
            <div className={baseStyle["panel-content"]}>
                <div className={baseStyle["panel-content-row"]}>ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.id}</span></div>
                <div className={baseStyle["panel-content-row"]}>Path: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.path}</span></div>
                <div className={baseStyle["panel-content-row"]}>Flags: <span className={baseStyle["panel-content-row-highlight"]}>{flags.join(", ")}</span></div>
                <div className={baseStyle["panel-content-row"]}>Users: <span className={baseStyle["panel-content-row-highlight"]}>{users}</span></div>
                <div className={baseStyle["panel-content-row"]}>Admins: <span className={baseStyle["panel-content-row-highlight"]}>{admins}</span></div>
            </div>
        </div>
    );
};

export default SMBShare;
