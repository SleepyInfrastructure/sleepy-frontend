/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
import Server from "../../components/server";
import { getServerConnectedProps } from "../../scripts/util/util";
/* Components */

const ServerRoute: FunctionalComponent<ServerRouteConnectedProps> = (props: ServerRouteConnectedProps) => {
    useEffect(() => {
        if(props.id === undefined) { return; }
        if(props.session !== null) {
            props.actions.fetchServerStructured(props.id);
            props.actions.fetchAllDisksStructured();
            props.actions.connectWebsocket();
        }
    }, [props.session]);
    if(props.id === undefined) {
        return null;
    }
    const server = props.servers.get(props.id);
    if(server === undefined) {
        return null;
    }

    return (
        <div class={baseStyle.page}>
            <div className={baseStyle["page-content"]}>
                <Server {...getServerConnectedProps(server, props)} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(ServerRoute);
