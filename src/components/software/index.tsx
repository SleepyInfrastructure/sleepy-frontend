/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const Software: FunctionalComponent<SoftwareConnectedProps> = (props: SoftwareConnectedProps) => {
    return (
        <div className={style.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={style["icon-software"]} />
                <div className={style["software-name"]}>{props.item.name}</div>
            </div>
            <div className={baseStyle["panel-content"]}>
                <div className={style["software-row"]}>Version: <span className={style["software-row-highlight"]}>{props.item.version}</span></div>
            </div>
        </div>
    );
};

export default Software;
