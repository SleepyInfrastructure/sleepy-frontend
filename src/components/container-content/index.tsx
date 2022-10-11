/* Base */
import { h, FunctionalComponent } from "preact";
import { formatDurationNow, humanFileSize } from "../../scripts/util/util";
import { StatisticTimeMapping } from "../../ts/common/const";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const ContainerContent: FunctionalComponent<ContainerContentConnectedProps> = (props: ContainerContentConnectedProps) => {
    const lastStatistic = props.item.statistics[props.item.statistics.length-1];
    const net = lastStatistic === undefined ? 0 : Math.round((lastStatistic.rx + lastStatistic.rx) / StatisticTimeMapping.MINUTE);
    const disk = lastStatistic === undefined ? 0 : lastStatistic.read + lastStatistic.write;

    return (
        <div className={baseStyle["panel-content"]}>
            <div className={baseStyle["panel-content-row"]}>ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.id}</span></div>
            <div className={baseStyle["panel-content-row"]}>Container ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.rawId}</span></div>
            <div className={baseStyle["panel-content-row"]}>Image: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.image}</span></div>
            <div className={baseStyle["panel-content-row"]}>Status: <span className={baseStyle["panel-content-row-highlight"]} data={props.item.status === "running" ? "green" : "red"}>{props.item.status} ({formatDurationNow(props.item.creation)})</span></div>
            <div className={style["container-content-stats"]}>
                <div className={baseStyle["panel-content-row"]}>CPU: <span className={baseStyle["panel-content-row-highlight"]}>{lastStatistic === undefined ? "0" : lastStatistic.cpu.toFixed(2)} %</span></div>
                |
                <div className={baseStyle["panel-content-row"]}>Memory: <span className={baseStyle["panel-content-row-highlight"]}>{lastStatistic === undefined ? "0 B" : humanFileSize(lastStatistic.memory)}</span></div>
                |
                <div className={baseStyle["panel-content-row"]}>Network: <span className={baseStyle["panel-content-row-highlight"]}>{humanFileSize(net)}/s</span></div>
                |
                <div className={baseStyle["panel-content-row"]}>Disk: <span className={baseStyle["panel-content-row-highlight"]}>{humanFileSize(disk)}/s</span></div>
            </div>
        </div>
    );
};

export default ContainerContent;
