/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import containerStyle from "../container/style.scss";
/* Components */
import ContainerProjectContent from "../container-project-content";

const SmallContainerProject: FunctionalComponent<ContainerProjectConnectedProps> = (props: ContainerProjectConnectedProps) => {
    return (
        <div className={baseStyle.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={containerStyle["icon-container"]} />
                <a href={`/container-project/${props.item.id}`} className={baseStyle["panel-name"]}>{props.item.name}</a>
            </div>
            <ContainerProjectContent {...props} />
        </div>
    );
};

export default SmallContainerProject;
