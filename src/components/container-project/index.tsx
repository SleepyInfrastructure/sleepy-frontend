/* Base */
import { h, FunctionalComponent } from "preact";
import Container from "../container";
/* Styles */
import baseStyle from "../container/style.scss";
import style from "./style.scss";
import { humanFileSize } from "../../scripts/util/util";

const ContainerProject: FunctionalComponent<ContainerProjectConnectedProps> = (props: ContainerProjectConnectedProps) => {
    const cpu = props.item.containers.reduce((acc, curr) => {
        return acc + (curr.statistics.length > 0 ? curr.statistics[curr.statistics.length-1].cpu : 0);
    }, 0);
    const memory = props.item.containers.reduce((acc, curr) => {
        return acc + (curr.statistics.length > 0 ? curr.statistics[curr.statistics.length-1].memory : 0);
    }, 0);
    const network = props.item.containers.reduce((acc, curr) => {
        return acc + (curr.statistics.length > 0 ? curr.statistics[curr.statistics.length-1].rx + curr.statistics[curr.statistics.length-1].tx : 0);
    }, 0);
    const disk = props.item.containers.reduce((acc, curr) => {
        return acc + (curr.statistics.length > 0 ? curr.statistics[curr.statistics.length-1].read + curr.statistics[curr.statistics.length-1].write : 0);
    }, 0);

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
                <div className={baseStyle["container-content-stats"]}>
                    <div className={baseStyle["container-content-row"]}>CPU: <span className={baseStyle["container-content-row-highlight"]}>{cpu.toFixed(2)} %</span></div>
                    |
                    <div className={baseStyle["container-content-row"]}>Memory: <span className={baseStyle["container-content-row-highlight"]}>{humanFileSize(memory)}</span></div>
                    |
                    <div className={baseStyle["container-content-row"]}>Network: <span className={baseStyle["container-content-row-highlight"]}>{humanFileSize(network)}/s</span></div>
                    |
                    <div className={baseStyle["container-content-row"]}>Disk: <span className={baseStyle["container-content-row-highlight"]}>{humanFileSize(disk)}/s</span></div>
                </div>
                {props.item.containers.length < 1 ? null : <div className={style["container-content-items"]}>
                    {props.item.containers.map((e, i) => <Container key={i} item={e} actions={props.actions} dark />)}
                </div>}
            </div>
        </div>
    );
};

export default ContainerProject;
