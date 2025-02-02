/* Base */
import { h, FunctionalComponent } from "preact";
import { humanFileSize } from "../../scripts/util/util";
import { PartitionFlagBoot } from "../../ts/common/const";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import PanelHeaderTag from "../panel-header-tag";

const Partition: FunctionalComponent<PartitionConnectedProps> = (props: PartitionConnectedProps) => {
    // TODO: sort by name
    const colorData = props.item.zfs ? "zfs" : undefined;

    return (
        <div id={`partition-${props.item.id}`} className={baseStyle.panel} data="dark">
            <div className={baseStyle["panel-header"]}>
                <div className={style["icon-partition"]} data={colorData} />
                <div className={style["partition-name"]} data={colorData}>{props.item.name} ({humanFileSize(props.item.size)})</div>
                {props.item.type === null ? null : <PanelHeaderTag icon="filesystem" tooltip={`Filesystem: ${props.item.type}`} />}
                {(props.item.flags & PartitionFlagBoot) !== PartitionFlagBoot ? null : <PanelHeaderTag icon="boot" tooltip={`Boot partition`} />}
            </div>
            <div className={baseStyle["panel-content"]}>
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
