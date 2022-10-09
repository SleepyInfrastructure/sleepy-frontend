/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import serverStyle from "../server/style.scss";
import serverSectionsStyle from "../server-sections/style.scss";
/* Components */
import CPUChart from "../charts/cpu";
import NetworkChart from "../charts/network";
import MemoryChart from "../charts/memory";
import ServerContent from "../server-content";

const SmallServer: FunctionalComponent<ServerConnectedProps> = (props: ServerConnectedProps) => {
    const statistics = props.statistics.filter(e => e.type === "MINUTE").sort((a, b) => a.timestamp - b.timestamp);

    return (
        <div className={baseStyle.panel} data="big">
            <div className={baseStyle["panel-header"]}>
                <div className={serverStyle["icon-server"]} style={{ background: `#${props.item.color}` }} />
                <a href={`/server/${props.item.id}`} className={serverStyle["server-name"]} style={{ color: `#${props.item.color}` }}>{props.item.name}</a>
                <a href={`/edit-server/${props.item.id}`} className={baseStyle["panel-link"]}>(Edit)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.deleteServer(props.item.id); }}>(Delete)</a>
            </div>
            <ServerContent {...props} />
            {statistics.length === 0 ? null :
            <div className={serverSectionsStyle["server-section-charts"]}>
                <CPUChart type={StatisticType.HOUR} statistics={statistics} />
                <MemoryChart type={StatisticType.HOUR} statistics={statistics} memory={props.item.memory} swap={props.item.swap} />
                <NetworkChart type={StatisticType.HOUR} statistics={statistics} />
            </div>}
        </div>
    );
};

export default SmallServer;
