/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import style from "../style.scss";

const EmptyPanel: FunctionalComponent = () => {
    return (
        <div className={style.panel} data="dark">
            <div className={style["panel-header"]}>
                <div className={style["panel-name"]} data="alt">Nothing here...</div>
            </div>
        </div>
    );
};

export default EmptyPanel;
