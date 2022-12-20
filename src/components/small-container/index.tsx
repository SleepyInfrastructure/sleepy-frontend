/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import containerStyle from "../container/style.scss";
/* Components */
import ContainerContent from "../container-content";

const SmallContainer: FunctionalComponent<ContainerConnectedProps> = (props: ContainerConnectedProps) => {
    return (
        <div id={`container-${props.item.id}`} className={baseStyle.panel} data="dark">
            <div className={baseStyle["panel-header"]}>
                <div className={containerStyle["icon-container"]} />
                <a href={`/container/${props.item.id}`} className={baseStyle["panel-name"]}>{props.item.name}</a>
                <a className={baseStyle["panel-link"]} data="green" onClick={() => { props.actions.daemonRequestContainerAction(props.item.id, false, "START"); }}>(Start)</a>
                <a className={baseStyle["panel-link"]} data="rose" onClick={() => { props.actions.daemonRequestContainerAction(props.item.id, false, "STOP"); }}>(Stop)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.daemonRequestContainerAction(props.item.id, false, "REMOVE"); }}>(Remove)</a>
                <a className={baseStyle["panel-link"]} onClick={() => { props.actions.daemonRequestContainerAction(props.item.id, false, "RESTART"); }}>(Restart)</a>
                <a className={baseStyle["panel-link"]} data="purple" onClick={() => { props.actions.daemonRequestContainerAction(props.item.id, false, "REBUILD"); }}>(Rebuild)</a>
            </div>
            <ContainerContent {...props} />
        </div>
    );
};

export default SmallContainer;
