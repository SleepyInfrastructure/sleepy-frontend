/* Base */
import { h, FunctionalComponent } from "preact";
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
                {props.item.status}
            </div>
        </div>
    );
};

export default Container;
