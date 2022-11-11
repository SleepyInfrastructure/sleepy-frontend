/* Base */
import { h, FunctionalComponent } from "preact";
import { humanFileSize } from "../../scripts/util/util";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const Process: FunctionalComponent<ProcessConnectedProps> = (props: ProcessConnectedProps) => {
    return (
        <div className={style.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={style["icon-process"]} />
                <div className={style["process-name"]}>{props.item.name} ({props.item.instances})</div>
            </div>
            <div className={baseStyle["panel-content"]}>
                <div className={style["process-row"]}>Memory: <span className={style["process-row-highlight"]}>{humanFileSize(props.item.memory)}</span></div>
            </div>
        </div>
    );
};

export default Process;
