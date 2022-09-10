/* Base */
import { h, FunctionalComponent } from "preact";
import { formatDurationNow, humanFileSize } from "../../scripts/util/util";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const Container: FunctionalComponent<ContainerConnectedProps> = (props: ContainerConnectedProps) => {
    const lastStatistic = props.item.statistics[props.item.statistics.length-1];
    return (
        <div className={baseStyle.panel} data={props.dark ? "dark" : undefined}>
            <div className={baseStyle["panel-header"]}>
                <div className={style["container-icon"]} />
                <div className={baseStyle["panel-name"]}>{props.item.names}</div>
            </div>
            <div className={baseStyle["panel-content"]}>
                <div className={baseStyle["panel-content-row"]}>ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.id}</span></div>
                <div className={baseStyle["panel-content-row"]}>Image: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.image}</span></div>
                <div className={baseStyle["panel-content-row"]}>Status: <span className={baseStyle["panel-content-row-highlight"]} data={props.item.status === "running" ? "green" : "red"}>{props.item.status} ({formatDurationNow(props.item.creation)})</span></div>
                <div className={style["container-content-stats"]}>
                    <div className={baseStyle["panel-content-row"]}>CPU: <span className={baseStyle["panel-content-row-highlight"]}>{lastStatistic === undefined ? "??" : lastStatistic.cpu.toFixed(2)} %</span></div>
                    |
                    <div className={baseStyle["panel-content-row"]}>Memory: <span className={baseStyle["panel-content-row-highlight"]}>{lastStatistic === undefined ? "??" : humanFileSize(lastStatistic.memory)}</span></div>
                    |
                    <div className={baseStyle["panel-content-row"]}>Network: <span className={baseStyle["panel-content-row-highlight"]}>{lastStatistic === undefined ? "??" : humanFileSize(lastStatistic.rx + lastStatistic.tx)}/s</span></div>
                    |
                    <div className={baseStyle["panel-content-row"]}>Disk: <span className={baseStyle["panel-content-row-highlight"]}>{lastStatistic === undefined ? "??" : humanFileSize(lastStatistic.read + lastStatistic.write)}/s</span></div>
                </div>
            </div>
        </div>
    );
};

export default Container;
