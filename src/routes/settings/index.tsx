/* Base */
import { h, FunctionalComponent } from "preact";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";
import baseStyle from "../style.scss";

const Settings: FunctionalComponent<SettingsConnectedProps> = (props: SettingsConnectedProps) => {
    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-server"]} />
                <div className={baseStyle["page-title"]}>Settings</div>
            </div>
            <div class={style["settings-section"]} />
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Settings);
