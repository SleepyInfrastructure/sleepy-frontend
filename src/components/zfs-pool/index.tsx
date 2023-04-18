/* Base */
import { h, FunctionalComponent } from "preact";
import { humanFileSize } from "../../scripts/util/util";
/* Styles */
import baseStyle from "../style.scss";
import diskStyle from "../disk/style.scss";
/* Components */
import Partition from "../partition";
import PanelHeaderTag from "../panel-header-tag";


const ZFSPool: FunctionalComponent<ZFSPoolConnectedProps> = (props: ZFSPoolConnectedProps) => {
    const size = props.item.partitions.reduce((acc, curr) => acc + curr.size, 0);

    return (
        <div id={`pool-${props.item.id}`} className={baseStyle.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={diskStyle["disk-icon"]} data="zfs" />
                <div className={baseStyle["panel-name"]}>{props.item.name} ({humanFileSize(size)})</div>
                {props.item.compression === null ? null : <PanelHeaderTag icon="compress" tooltip={`Compression ratio: ${props.item.compressRatio.toFixed(2)}x`} />}
                {!props.item.encryption ? null : <PanelHeaderTag icon="encryption" tooltip={`Encrypted`} />}
                {!props.item.deduplication ? null : <PanelHeaderTag icon="deduplication" tooltip={`Deduplication: On`} />}
                {!props.item.atime ? null : <PanelHeaderTag icon="atime" tooltip={`Atime: On`} />}
                {!props.item.relatime ? null : <PanelHeaderTag icon="relatime" tooltip={`Relatime: On`} />}
                <PanelHeaderTag icon="version" tooltip={`Version: ${props.item.version}`} />
            </div>
            <div className={baseStyle["panel-content"]}>
                {props.item.partitions.length < 1 ? null :<div className={diskStyle["disk-content-items"]}>
                    {props.item.partitions.map((e, i) => {
                        return e.partition !== undefined ? <Partition key={i} item={e.partition} actions={props.actions} /> : null;
                    })}
                </div>}
            </div>
        </div>
    );
};

export default ZFSPool;
