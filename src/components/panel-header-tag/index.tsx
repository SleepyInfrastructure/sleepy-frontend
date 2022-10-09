/* Base */
import { h, FunctionalComponent } from "preact";
import { useState } from "react";
/* Styles */
import style from "./style.scss";

const PanelHeaderTag: FunctionalComponent<PanelHeaderTagConnectedProps> = (props: PanelHeaderTagConnectedProps) => {
    const [busy, setBusy] = useState(false);
    
    return (
        <div className={style.tooltip} data={props.text === undefined ? undefined : "pointer"} onClick={() => {
            if(props.text === undefined || busy) {
                return;
            }
            navigator.clipboard.writeText(props.text);
            setBusy(true);
            setTimeout(() => {
                setBusy(false);
            }, 1500);
        }}>
            <div className={style[`${props.icon}-icon`]} />
            <span class={style["tooltip-text"]}>{busy ? "Copied!" : props.tooltip}</span>
        </div>
    );
};

export default PanelHeaderTag;
