/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { getContainerConnectedProps } from "../../scripts/util/server";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
/* Components */
import Container from "../../components/container";

const ContainerRoute: FunctionalComponent<ContainerRouteConnectedProps> = (props: ContainerRouteConnectedProps) => {
    useEffect(() => {
        if(props.id === undefined) { return; }
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
            props.actions.connectWebsocket();
        }
    }, [props.session]);
    if(props.id === undefined) {
        return null;
    }
    const container = props.containers.get(props.id);
    if(container === undefined) {
        return null;
    }
    const containerProps = getContainerConnectedProps(container, props);
    console.log(props.daemons);
    const logs = props.daemons.has(containerProps.item.server) ? containerProps.logs : ["Daemon is offline..."];
    
    return (
        <div class={baseStyle.page}>
            <div className={baseStyle["page-content"]}>
                <Container {...containerProps} logs={logs} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(ContainerRoute);
