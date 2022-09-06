/* Base */
import { h, FunctionalComponent } from "preact";
import { humanFileSize } from "../../scripts/util/util";
/* Styles */
import baseStyle from "../disk/style.scss";
import style from "./style.scss";
/* Components */
import Partition from "../partition";

const ZFSPool: FunctionalComponent<ZFSPoolConnectedProps> = (props: ZFSPoolConnectedProps) => {
    const size = props.item.partitions.reduce((acc, curr) => acc + curr.size, 0);

    return (
        <div className={baseStyle.disk}>
            <div className={baseStyle["disk-title-wrapper"]}>
                <div className={baseStyle["disk-icon"]} />
                <div className={baseStyle["disk-title"]}>{props.item.name} ({humanFileSize(size)})</div>
            </div>
            <div className={baseStyle["disk-content"]}>
                {props.item.partitions.length < 1 ? null :<div className={baseStyle["disk-content-items"]}>
                    {props.item.partitions.map((e, i) => <Partition key={i} item={{ ...e, name: e.partition === undefined ? "??" : e.partition.name, zfs: false }} actions={props.actions} />)}
                </div>}
            </div>
        </div>
    );
};

export default ZFSPool;
