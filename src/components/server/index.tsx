/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import DiskChart from "../charts/disk";
import CPUChart from "../charts/cpu";
import NetworkChart from "../charts/network";
import MemoryChart from "../charts/memory";
import ServerContent from "../server-content";
import ServerSections from "../server-sections";
import { useEffect, useState } from "react";
import Button from "../ui/button";

const StatTypeMapping: Record<StatisticType, string> = {
    MINUTE: "",
    HOUR: "MINUTE",
    DAY: "HOUR",
    MONTH: "DAY",
    YEAR: "MONTH"
}

const Server: FunctionalComponent<ServerConnectedProps> = (props: ServerConnectedProps) => {
    const [statType, setStatType] = useState<StatisticType>("HOUR");
    const [fetchedTypes, setFetchedTypes] = useState<StatisticType[]>([]);
    useEffect(() => {
        if(!fetchedTypes.includes(statType)) {
            setFetchedTypes([...fetchedTypes, statType]);
            props.actions.fetchServerStatistics({ id: props.item.id, type: statType.toLowerCase() });
        }
    }, [statType]);
    const statistics = props.statistics.filter(e => e.type === StatTypeMapping[statType]).sort((a, b) => a.timestamp - b.timestamp);
    console.log(statistics);

    return (
        <div className={baseStyle.panel} data="big">
            <div className={baseStyle["panel-header"]}>
                <div className={style["server-icon"]} style={{ background: `#${props.item.color}` }} />
                <a href={`/server/${props.item.id}`} className={style["server-name"]} style={{ color: `#${props.item.color}` }}>{props.item.name}</a>
                <a href={`/edit-server/${props.item.id}`} className={baseStyle["panel-link"]}>(Edit)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.deleteServer(props.item.id); }}>(Delete)</a>
            </div>
            <div className={style["server-charts-options"]}>
                <Button secondary={statType === "HOUR"} onClick={() => { setStatType("HOUR") }}>Hour</Button>
                <Button secondary={statType === "DAY"} onClick={() => { setStatType("DAY") }}>Day</Button>
                <Button secondary={statType === "MONTH"} onClick={() => { setStatType("MONTH") }}>Month</Button>
                <Button secondary={statType === "YEAR"} onClick={() => { setStatType("YEAR") }}>Year</Button>
            </div>
            <div className={style["server-charts"]}>
                <CPUChart type={statType} statistics={statistics} />
                <MemoryChart type={statType} item={props.item} statistics={statistics} />
                <NetworkChart type={statType} statistics={statistics} />
            </div>
            <div className={style["server-charts"]}>
                {props.disks.map((e, i) => e.statistics.length === 0 ? null : <DiskChart key={i} item={e} type={"HOUR"} />)}
            </div>
            <ServerContent {...props} />
            <ServerSections {...props} />
        </div>
    );
};

export default Server;
