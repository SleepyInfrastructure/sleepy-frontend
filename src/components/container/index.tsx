/* Base */
import { h, FunctionalComponent } from "preact";
import Button from "../ui/button";
/* Styles */
import style from "./style.scss";

const Container: FunctionalComponent<ContainerConnectedProps> = (props: ContainerConnectedProps) => {
    return (
        <div className={style.container}>
            <div className={style["container-title-wrapper"]}>
                <div className={style["container-icon"]} />
                <div className={style["container-title"]}>{props.item.names}</div>
            </div>
            <div className={style["container-content"]}>
                <div className={style["container-content-row"]}>ID: <span className={style["container-content-row-highlight"]}>{props.item.id}</span></div>
                <div className={style["container-content-row"]}>Image: <span className={style["container-content-row-highlight"]}>{props.item.image}</span></div>
                <div className={style["container-content-row"]}>Status: <span className={style["container-content-row-highlight"]} data={props.item.status.startsWith("Up") ? "true" : "false"}>{props.item.status}</span></div>
            </div>
        </div>
    );
};

export default Container;
