/* Base */
import { h, FunctionalComponent } from "preact";
import { humanFileSize } from "../../scripts/util/util";
/* Styles */
import baseStyle from "../style.scss";
import diskStyle from "../disk/style.scss";
import style from "./style.scss";
/* Components */
import Partition from "../partition";

const ZFSPool: FunctionalComponent<ZFSPoolConnectedProps> = (props: ZFSPoolConnectedProps) => {
    const size = props.item.partitions.reduce((acc, curr) => acc + curr.size, 0);

    return (
        <div className={baseStyle.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={diskStyle["disk-icon"]} data="zfs" />
                <div className={baseStyle["panel-name"]}>{props.item.name} ({humanFileSize(size)})</div>
            </div>
            <div className={baseStyle["panel-content"]}>
                {props.item.partitions.length < 1 ? null :<div className={diskStyle["disk-content-items"]}>
                    {props.item.partitions.map((e, i) => <Partition key={i} item={{ ...e, name: e.partition === undefined ? "??" : e.partition.name }} actions={props.actions} />)}
                </div>}
            </div>
        </div>
    );
};

export default ZFSPool;
