/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const NginxLocation: FunctionalComponent<NginxLocationConnectedProps> = (props: NginxLocationConnectedProps) => {
    const flags = [props.item.cors ? "cors" : "no cors"];

    return (
        <div className={baseStyle.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={style["icon-nginx-location"]} />
                <div className={style["nginx-name"]}>{props.item.name}</div>
                <a className={baseStyle["panel-link"]} href={`/edit-nginx-location/${props.item.id}`}>(Edit)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.deleteNginxLocation(props.item.id); }}>(Delete)</a>
            </div>
            <div className={baseStyle["panel-content"]}>
                <div className={baseStyle["panel-content-row"]}>ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.id}</span></div>
                <div className={baseStyle["panel-content-row"]}>Type: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.type} (/{props.item.path})</span></div>
                <div className={baseStyle["panel-content-row"]}>Endpoint: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.endpoint}</span></div>
                <div className={baseStyle["panel-content-row"]}>Flags: <span className={baseStyle["panel-content-row-highlight"]}>{flags.join(", ")}</span></div>
            </div>
        </div>
    );
};

export default NginxLocation;
