/* Base */
import { h, FunctionalComponent } from "preact";
/* Components */
import NginxLocation from "../nginx-location";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const NginxServer: FunctionalComponent<NginxServerConnectedProps> = (props: NginxServerConnectedProps) => {
    const flags = [props.item.httpRedirect ? "redirects http" : "http allowed", props.item.http2 ? "http 2" : "http 1"];

    return (
        <div className={baseStyle.panel} data="dark">
            <div className={baseStyle["panel-header"]}>
                <div className={style["icon-nginx"]} />
                <div className={style["nginx-name"]}>{props.item.name}</div>
                <a className={baseStyle["panel-link"]} data="green" onClick={() => { location.href = `/create-nginx-location/${props.item.id}`; }}>(Add location)</a>
                <a className={baseStyle["panel-link"]} href={`/edit-nginx-server/${props.item.id}`}>(Edit)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.deleteNginxServer(props.item.id); }}>(Delete)</a>
            </div>
            <div className={baseStyle["panel-content"]}>
                <div className={baseStyle["panel-content-row"]}>ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.id}</span></div>
                <div className={baseStyle["panel-content-row"]}>Domain: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.domain} (live/{props.item.ssl})</span></div>
                <div className={baseStyle["panel-content-row"]}>Expires: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.expires}</span></div>
                <div className={baseStyle["panel-content-row"]}>Origins: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.origins.join(", ")}</span></div>
                <div className={baseStyle["panel-content-row"]}>Flags: <span className={baseStyle["panel-content-row-highlight"]}>{flags.join(", ")}</span></div>
                <div className={style["nginx-content-items"]}>
                    <div className={style["nginx-content-locations"]}>
                        {props.item.locations.map((e, i) => <NginxLocation key={i} item={e} actions={props.actions} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NginxServer;
