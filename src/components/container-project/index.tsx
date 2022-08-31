/* Base */
import { h, FunctionalComponent } from "preact";
import Container from "../container";
import Button from "../ui/button";
/* Styles */
import baseStyle from "../container/style.scss";
import style from "./style.scss";

const ContainerProject: FunctionalComponent<ContainerProjectConnectedProps> = (props: ContainerProjectConnectedProps) => {
    return (
        <div className={baseStyle.container}>
            <div className={baseStyle["container-title-wrapper"]}>
                <div className={baseStyle["container-icon"]} />
                <div className={baseStyle["container-title"]}>{props.item.name}</div>
            </div>
            <div className={baseStyle["container-content"]}>
                <div className={baseStyle["container-content-row"]}>ID: <span className={baseStyle["container-content-row-highlight"]}>{props.item.id}</span></div>
                <div className={baseStyle["container-content-row"]}>Path: <span className={baseStyle["container-content-row-highlight"]}>{props.item.path}</span></div>
                <div className={baseStyle["container-content-row"]}>Status: <span className={baseStyle["container-content-row-highlight"]} data={props.item.status.startsWith("running") ? "true" : "false"}>{props.item.status}</span></div>
                {props.item.containers.map((e, i) => <Container key={i} item={e} actions={props.actions} />)}
            </div>
        </div>
    );
};

export default ContainerProject;
