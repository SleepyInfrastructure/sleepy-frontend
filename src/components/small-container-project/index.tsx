/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import containerStyle from "../container/style.scss";
/* Components */
import ContainerProjectContent from "../container-project-content";

const SmallContainerProject: FunctionalComponent<ContainerProjectConnectedProps> = (props: ContainerProjectConnectedProps) => {
    return (
        <div id={`container-project-${props.item.id}`} className={baseStyle.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={containerStyle["icon-container"]} />
                <a href={`/container-project/${props.item.id}`} className={baseStyle["panel-name"]}>{props.item.name}</a>
                <a className={baseStyle["panel-link"]} data="green" onClick={() => { props.actions.daemonRequestContainerAction(props.item.id, true, "START"); }}>(Start)</a>
                <a className={baseStyle["panel-link"]} data="rose" onClick={() => { props.actions.daemonRequestContainerAction(props.item.id, true, "STOP"); }}>(Stop)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.daemonRequestContainerAction(props.item.id, true, "REMOVE"); }}>(Remove)</a>
                <a className={baseStyle["panel-link"]} onClick={() => { props.actions.daemonRequestContainerAction(props.item.id, true, "RESTART"); }}>(Restart)</a>
                <a className={baseStyle["panel-link"]} data="purple" onClick={() => { props.actions.daemonRequestContainerAction(props.item.id, true, "REBUILD"); }}>(Rebuild)</a>
            </div>
            <ContainerProjectContent {...props} />
        </div>
    );
};

export default SmallContainerProject;
