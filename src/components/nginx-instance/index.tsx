/* Base */
import { h, FunctionalComponent } from "preact";
/* Components */
import NginxServer from "../nginx-server";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const NginxInstance: FunctionalComponent<NginxInstanceConnectedProps> = (props: NginxInstanceConnectedProps) => {
    return (
        <div id={`nginx-instance-${props.item.id}`} className={baseStyle.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={style["icon-nginx-instance"]} />
                <div className={baseStyle["panel-name"]}>{props.item.name}</div>
                <a className={baseStyle["panel-link"]} data="green" onClick={() => { location.href = `/create-nginx-server/${props.item.id}`; }}>(Add server)</a>
                <a className={baseStyle["panel-link"]} onClick={() => { location.href = `/edit-nginx-instance/${props.item.id}`; }}>(Edit)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.deleteNginxInstance(props.item.id); }}>(Delete)</a>
            </div>
            <div className={baseStyle["panel-content"]}>
                <div className={baseStyle["panel-content-row"]}>ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.id}</span></div>
                <div className={style["nginx-content-items"]}>
                    <div className={style["nginx-content-servers"]}>
                        {props.item.servers.map((e, i) => <NginxServer key={i} item={e} actions={props.actions} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NginxInstance;
