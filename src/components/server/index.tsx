/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import style from "./style.scss";
import baseStyle from "../style.scss";
import sectionStyle from "../server-sections/style.scss";
/* Components */
import ServerContent from "../server-content";
import ServerSections from "../server-sections";

const Server: FunctionalComponent<ServerConnectedProps> = (props: ServerConnectedProps) => {
    return (
        <div className={style.server}>
            <div className={sectionStyle["server-section"]}>
                <div className={baseStyle["panel-header"]}>
                    <div className={style["icon-server"]} style={{ background: `#${props.item.color}` }} />
                    <a href={`/server/${props.item.id}`} className={style["server-name"]} style={{ color: `#${props.item.color}` }}>{props.item.name}</a>
                    <a href={`/edit-server/${props.item.id}`} className={baseStyle["panel-link"]}>(Edit)</a>
                    <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.deleteServer(props.item.id); }}>(Delete)</a>
                </div>
                <ServerContent {...props} />
            </div>
            <ServerSections {...props} />
        </div>
    );
};

export default Server;
