/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { isConnected } from "../../scripts/ws/ws";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import ContainerProjectContent from "../container-project-content";
import LogView from "../log-view";

const ContainerProject: FunctionalComponent<ContainerProjectConnectedProps> = (props: ContainerProjectConnectedProps) => {
    useEffect(() => {
        if(isConnected()) {
            props.actions.daemonConnectContainerProjectLog(props.item.id);
        }
    }, [isConnected()]);

    return (
        <div className={baseStyle.panel} data="big">
            <div className={baseStyle["panel-header"]}>
                <div className={style["container-icon"]} />
                <a href={`/container-project/${props.item.id}`} className={baseStyle["panel-name"]}>{props.item.name}</a>
            </div>
            <ContainerProjectContent {...props} />
            <LogView logs={props.logs} actions={props.actions} />
        </div>
    );
};

export default ContainerProject;
