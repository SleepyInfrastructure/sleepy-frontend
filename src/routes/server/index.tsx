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
        if(props.id !== undefined && server === undefined) {
            props.actions.fetchServerStructured(props.id);
        }
    }, [props.actions, props.id, server]);
    if(server === undefined) {
        return null;
    }

    return (
        <div className={baseStyle["page-content"]}>
            <Server {...getServerConnectedProps(server, props)} />
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(ServerRoute);
