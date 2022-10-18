/* Base */
import { h, FunctionalComponent } from "preact";
import { getAlertName } from "../../scripts/util/alert";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import AlertObject from "../alert-object";

const Alert: FunctionalComponent<AlertConnectedProps> = (props: AlertConnectedProps) => {
    return (
        <div className={baseStyle.panel} data="big">
            <div className={baseStyle["panel-header"]}>
                <div className={style["icon-alert"]} data={props.item.type} />
                <div className={baseStyle["panel-name"]}>{getAlertName(props.item)}</div>
            </div>
            <div className={baseStyle["panel-content"]}>
                <AlertObject {...props} />
            </div>
        </div>
    );
};

export default Alert;
