/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { getServerConnectedProps } from "../../scripts/util/server";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
/* Components */
import Server from "../../components/server";

const ServerRoute: FunctionalComponent<ServerRouteConnectedProps> = (props: ServerRouteConnectedProps) => {
    let server: Server | undefined;
    if(props.id !== undefined) {
        server = props.servers.get(props.id);
    }
    useEffect(() => {
        if(props.id === undefined) { return; }
        if(props.session !== null) {
            props.actions.fetchServerStructured(props.id);
            props.actions.connectWebsocket();
        }
    }, [props.actions, props.id, props.session]);
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
