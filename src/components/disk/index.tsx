/* Base */
import { h, FunctionalComponent } from "preact";
import { humanFileSize } from "../../scripts/util/util";
/* Styles */
import style from "./style.scss";
/* Components */
import Partition from "../partition";

const Disk: FunctionalComponent<DiskConnectedProps> = (props: DiskConnectedProps) => {
    return (
        <div className={style.disk}>
            <div className={style["disk-title-wrapper"]}>
                <div className={style["disk-icon"]} />
                <div className={style["disk-title"]}>{props.item.model} ({humanFileSize(props.item.size)})</div>
            </div>
            <div className={style["disk-content"]}>
                {props.item.partitions.map((e, i) => <Partition key={i} item={e} actions={props.actions} />)}
            </div>
        </div>
    );
};

export default Disk;
