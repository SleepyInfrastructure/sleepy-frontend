/* Base */
import { h, FunctionalComponent } from "preact";
import { humanFileSize } from "../../scripts/util/util";
/* Styles */
import style from "./style.scss";

const Partition: FunctionalComponent<PartitionConnectedProps> = (props: PartitionConnectedProps) => {
    // TODO: sort by name
    const colorData = props.item.zfs ? "zfs" : undefined;

    return (
        <div className={style.partition}>
            <div className={style["partition-title-wrapper"]}>
                <div className={style["partition-icon"]} data={colorData} />
                <div className={style["partition-title"]} data={colorData}>{props.item.name} ({humanFileSize(props.item.size)})</div>
            </div>
            <div className={style["partition-content"]}>
                {props.item.used === null ? null : <div className={style["partition-bar-wrapper"]}>
                    <div className={style["partition-bar-percentage"]}>{Math.round((props.item.used / props.item.size) * 100)} %</div>
                    <div className={style["partition-bar"]}>
                        <span className={style["partition-bar-fill"]} style={`width: ${((props.item.used ?? 0) / props.item.size) * 100}%`} />
                    </div>
                </div>}
                {props.item.used === null ? null : <div className={style["partition-row"]}><span className={style["partition-row-highlight"]}>{humanFileSize(props.item.size - props.item.used)}</span> remaining</div>}
                {props.item.zfs ? <div className={style["partition-row"]} data={colorData}>Used in ZFS pool ({props.item.zfs})</div> : null}
            </div>
        </div>
    );
};

export default Partition;
