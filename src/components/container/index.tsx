/* Base */
import { h, FunctionalComponent } from "preact";
import { humanFileSize } from "../../scripts/util/util";
/* Styles */
import style from "./style.scss";

const Container: FunctionalComponent<ContainerConnectedProps> = (props: ContainerConnectedProps) => {
    const lastStatistic = props.item.statistics[props.item.statistics.length-1];
    return (
        <div className={style.container} data={props.dark ? "dark" : undefined}>
            <div className={style["container-title-wrapper"]}>
                <div className={style["container-icon"]} />
                <div className={style["container-title"]}>{props.item.names}</div>
            </div>
            <div className={style["container-content"]}>
                <div className={style["container-content-row"]}>ID: <span className={style["container-content-row-highlight"]}>{props.item.id}</span></div>
                <div className={style["container-content-row"]}>Image: <span className={style["container-content-row-highlight"]}>{props.item.image}</span></div>
                <div className={style["container-content-row"]}>Status: <span className={style["container-content-row-highlight"]} data={props.item.status.startsWith("Up") ? "true" : "false"}>{props.item.status}</span></div>
                <div className={style["container-content-stats"]}>
                    <div className={style["container-content-row"]}>CPU: <span className={style["container-content-row-highlight"]}>{lastStatistic === undefined ? "??" : lastStatistic.cpu.toFixed(2)} %</span></div>
                    |
                    <div className={style["container-content-row"]}>Memory: <span className={style["container-content-row-highlight"]}>{lastStatistic === undefined ? "??" : humanFileSize(lastStatistic.memory)}</span></div>
                    |
                    <div className={style["container-content-row"]}>Network: <span className={style["container-content-row-highlight"]}>{lastStatistic === undefined ? "??" : humanFileSize(lastStatistic.rx + lastStatistic.tx)}/s</span></div>
                    |
                    <div className={style["container-content-row"]}>Disk: <span className={style["container-content-row-highlight"]}>{lastStatistic === undefined ? "??" : humanFileSize(lastStatistic.read + lastStatistic.write)}/s</span></div>
                </div>
            </div>
        </div>
    );
};

export default Container;
