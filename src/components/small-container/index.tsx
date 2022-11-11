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
            </div>
            <ContainerContent {...props} />
        </div>
    );
};

export default SmallContainer;
