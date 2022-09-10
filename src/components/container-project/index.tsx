/* Base */
import { h, FunctionalComponent } from "preact";
import Container from "../container";
/* Styles */
import baseStyle from "../style.scss";
import containerStyle from "../container/style.scss";
import style from "./style.scss";
import { humanFileSize } from "../../scripts/util/util";
import { getContainerProjectStats } from "../../scripts/util/container";

const ContainerProject: FunctionalComponent<ContainerProjectConnectedProps> = (props: ContainerProjectConnectedProps) => {
    const stats = getContainerProjectStats(props.item);

    return (
        <div className={baseStyle.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={containerStyle["container-icon"]} />
                <div className={baseStyle["panel-name"]}>{props.item.name}</div>
            </div>
            <div className={baseStyle["panel-content"]}>
                <div className={baseStyle["panel-content-row"]}>ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.id}</span></div>
                <div className={baseStyle["panel-content-row"]}>Path: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.path}</span></div>
                <div className={baseStyle["panel-content-row"]}>Status: <span className={baseStyle["panel-content-row-highlight"]} data={props.item.status === "running" ? "green" : "red"}>{stats.status}</span></div>
                <div className={containerStyle["container-content-stats"]}>
                    <div className={baseStyle["panel-content-row"]}>CPU: <span className={baseStyle["panel-content-row-highlight"]}>{stats.cpu.toFixed(2)} %</span></div>
                    |
                    <div className={baseStyle["panel-content-row"]}>Memory: <span className={baseStyle["panel-content-row-highlight"]}>{humanFileSize(stats.memory)}</span></div>
                    |
                    <div className={baseStyle["panel-content-row"]}>Network: <span className={baseStyle["panel-content-row-highlight"]}>{humanFileSize(stats.network)}/s</span></div>
                    |
                    <div className={baseStyle["panel-content-row"]}>Disk: <span className={baseStyle["panel-content-row-highlight"]}>{humanFileSize(stats.disk)}/s</span></div>
                </div>
                {props.item.containers.length < 1 ? null : <div className={style["container-content-items"]}>
                    {props.item.containers.map((e, i) => <Container key={i} item={e} actions={props.actions} dark />)}
                </div>}
            </div>
        </div>
    );
};

export default ContainerProject;
