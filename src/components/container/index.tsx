/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { isConnected } from "../../scripts/ws/ws";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import ContainerContent from "../container-content";
import LogView from "../log-view";

const Container: FunctionalComponent<ContainerConnectedProps> = (props: ContainerConnectedProps) => {
    useEffect(() => {
        if(isConnected()) {
            props.actions.daemonConnectContainerLog(props.item.id);
        }
    }, [isConnected()]);

    return (
        <div className={baseStyle.panel} data="big">
            <div className={baseStyle["panel-header"]}>
                <div className={style["icon-container"]} />
                <a href={`/container-project/${props.item.id}`} className={baseStyle["panel-name"]}>{props.item.names}</a>
            </div>
            <ContainerContent {...props} />
            <LogView logs={props.logs} actions={props.actions} requestFile={() => { props.actions.daemonRequestContainerLog(props.item.id); }} />
        </div>
    );
};

export default Container;
