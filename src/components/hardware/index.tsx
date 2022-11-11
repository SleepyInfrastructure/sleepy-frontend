/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const Hardware: FunctionalComponent<HardwareConnectedProps> = (props: HardwareConnectedProps) => {
    return (
        <div className={style.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={style[`icon-${props.icon}`]} />
                <div className={style["hardware-name"]}>{props.name}</div>
            </div>
            <div className={baseStyle["panel-content"]}>
                {props.data.map((e, i) => <div key={i} className={style["hardware-row"]}>{e.name}: <span className={style["hardware-row-highlight"]}>{e.text}</span></div>)}
            </div>
        </div>
    );
};

export default Hardware;
