/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";
import baseStyle from "../style.scss";

const Settings: FunctionalComponent<SettingsConnectedProps> = (props: SettingsConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
        }
    }, [props.session]);
    const servers = Array.from(props.servers.values());

    return (
        <div class={baseStyle.page}>
            <div className={baseStyle["page-content"]}>
                <div className={baseStyle["page-title-wrapper"]}>
                    <div className={style["server-icon"]} />
                    <div className={baseStyle["page-title"]}>Settings</div>
                </div>
                <div class={style["settings-section"]} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Settings);
