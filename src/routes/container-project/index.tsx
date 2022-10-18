/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { getContainerProjectConnectedProps } from "../../scripts/util/server";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
/* Components */
import ContainerProject from "../../components/container-project";

const ContainerProjectRoute: FunctionalComponent<ContainerRouteConnectedProps> = (props: ContainerRouteConnectedProps) => {
    if(props.id === undefined) {
        return null;
    }
    const containerProject = props.containerProjects.get(props.id);
    if(containerProject === undefined) {
        return null;
    }
    const containerProjectProps = getContainerProjectConnectedProps(containerProject, props);
    const logs = props.daemons.has(containerProjectProps.item.server) ? containerProjectProps.logs : ["Daemon is offline..."];
    
    return (
        <div class={baseStyle.page}>
            <div className={baseStyle["page-content"]}>
                <ContainerProject {...containerProjectProps} logs={logs} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(ContainerProjectRoute);
