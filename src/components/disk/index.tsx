/* Base */
import { h, FunctionalComponent } from "preact";
import { humanFileSize } from "../../scripts/util/util";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import Partition from "../partition";

const Disk: FunctionalComponent<DiskConnectedProps> = (props: DiskConnectedProps) => {
    return (
        <div className={baseStyle.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={style["disk-icon"]} />
                <div className={baseStyle["panel-name"]}>{props.item.model} ({humanFileSize(props.item.size)})</div>
            </div>
            <div className={baseStyle["panel-content"]}>
                {props.item.partitions.length < 1 ? null :<div className={style["disk-content-items"]}>
                    {props.item.partitions.map((e, i) => <Partition key={i} item={e} actions={props.actions} />)}
                </div>}
            </div>
        </div>
    );
};

export default Disk;
