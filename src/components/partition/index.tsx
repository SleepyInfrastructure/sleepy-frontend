/* Base */
import { h, FunctionalComponent } from "preact";
import { humanFileSize } from "../../scripts/util/util";
/* Styles */
import style from "./style.scss";

const Partition: FunctionalComponent<PartitionConnectedProps> = (props: PartitionConnectedProps) => {
    return (
        <div className={style.partition}>
            <div className={style["partition-title-wrapper"]}>
                <div className={style["partition-icon"]} />
                <div className={style["partition-title"]}>{props.item.name} ({humanFileSize(props.item.size)})</div>
            </div>
            <div className={style["partition-content"]}>
                <div className={style["partition-bar-percentage"]}>{props.item.used === null ? "Unknown" : `${Math.round((props.item.used / props.item.size) * 100)} %`}</div>
                <div className={style["partition-bar"]}>
                    <span className={style["partition-bar-fill"]} style={`width: ${((props.item.used ?? 0) / props.item.size) * 100}%`} />
                </div>
            </div>
        </div>
    );
};

export default Partition;
