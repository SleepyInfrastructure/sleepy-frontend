/* Base */
import { h, FunctionalComponent } from "preact";
import SmallContainer from "../small-container";
import { StatisticTimeMapping } from "../../ts/common/const";
/* Styles */
import baseStyle from "../style.scss";
import containerContentStyle from "../container-content/style.scss";
import style from "./style.scss";
import { humanFileSize } from "../../scripts/util/util";

const ContainerProjectContent: FunctionalComponent<ContainerProjectContentConnectedProps> = (props: ContainerProjectContentConnectedProps) => {
    const net = Math.round(props.statistics.network / StatisticTimeMapping.MINUTE);
    const disk = Math.round(props.statistics.disk / StatisticTimeMapping.MINUTE);

    return (
        <div className={baseStyle["panel-content"]}>
            <div className={baseStyle["panel-content-row"]}>ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.id}</span></div>
            <div className={baseStyle["panel-content-row"]}>Path: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.path}</span></div>
            <div className={baseStyle["panel-content-row"]}>Status: <span className={baseStyle["panel-content-row-highlight"]} data={props.item.status === "running" ? "green" : "red"}>{props.statistics.status}</span></div>
            <div className={containerContentStyle["container-content-stats"]}>
                <div className={baseStyle["panel-content-row"]}>CPU: <span className={baseStyle["panel-content-row-highlight"]}>{props.statistics.cpu.toFixed(2)} %</span></div>
                |
                <div className={baseStyle["panel-content-row"]}>Memory: <span className={baseStyle["panel-content-row-highlight"]}>{humanFileSize(props.statistics.memory)}</span></div>
                |
                <div className={baseStyle["panel-content-row"]}>Network: <span className={baseStyle["panel-content-row-highlight"]}>{humanFileSize(net)}/s</span></div>
                |
                <div className={baseStyle["panel-content-row"]}>Disk: <span className={baseStyle["panel-content-row-highlight"]}>{humanFileSize(disk)}/s</span></div>
            </div>
            {props.item.containers.length < 1 ? null : <div className={style["container-content-items"]}>
                {props.item.containers.map((e, i) => <SmallContainer key={i} item={e} logs={[]} actions={props.actions} />)}
            </div>}
        </div>
    );
};

export default ContainerProjectContent;
