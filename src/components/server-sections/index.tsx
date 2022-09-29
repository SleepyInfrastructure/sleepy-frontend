/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useState } from "react";
/* Styles */
import baseStyle from "../style.scss";
import networkStyle from "../network/style.scss";
import diskStyle from "../disk/style.scss";
import containerStyle from "../container/style.scss";
import databaseStyle from "../database/style.scss";
import style from "./style.scss";
/* Components */
import Disk from "../disk";
import ZFSPool from "../zfs-pool";
import SmallContainer from "../small-container";
import Database from "../database";
import SmallContainerProject from "../small-container-project";
import Button from "../ui/button";
import Network from "../network";
/* Charts */
import CPUChart from "../charts/cpu";
import MemoryChart from "../charts/memory";
import NetworkChart from "../charts/network";
import DiskChart from "../charts/disk";
import React from "react";
const StatTypeMapping: Record<StatisticType, string> = {
    MINUTE: "",
    HOUR: "MINUTE",
    DAY: "HOUR",
    MONTH: "DAY",
    YEAR: "MONTH"
}

const ServerSections: FunctionalComponent<ServerSectionsConnectedProps> = (props: ServerSectionsConnectedProps) => {
    const containerProjects = props.containerProjects.map((e) => {
        const containers = props.containers.filter(el => el.parent === e.id);
        return { ...e, containers };
    });

    const [chartsOpen, setChartsOpen] = useState(true);
    const [statType, setStatType] = useState<StatisticType>("HOUR");
    const [fetchedTypes, setFetchedTypes] = useState<StatisticType[]>([]);
    useEffect(() => {
        if(!fetchedTypes.includes(statType)) {
            setFetchedTypes([...fetchedTypes, statType]);
            props.actions.fetchServerStatistics({ id: props.item.id, type: statType.toLowerCase() });
        }
    }, [statType]);
    const statistics = props.statistics.filter(e => e.type === StatTypeMapping[statType]).sort((a, b) => a.timestamp - b.timestamp);

    const [networksOpen, setNetworksOpen] = useState(true);
    const [disksOpen, setDisksOpen] = useState(true);
    const [containersOpen, setContainersOpen] = useState(true);
    const [databasesOpen, setDatabasesOpen] = useState(true);
    const processSwitch = (e: React.MouseEvent, type: "NETWORK" | "DISK" | "CONTAINER" | "DATABASE") => {
        if(!e.shiftKey) {
            setNetworksOpen(false);
            setDisksOpen(false);
            setContainersOpen(false);
            setDatabasesOpen(false);
        }
        switch(type) {
            case "NETWORK":
                setNetworksOpen(!e.shiftKey ? true : !networksOpen);
                break;
            case "DISK":
                setDisksOpen(!e.shiftKey ? true : !disksOpen);
                break;
            case "CONTAINER":
                setContainersOpen(!e.shiftKey ? true : !containersOpen);
                break;
            case "DATABASE":
                setDatabasesOpen(!e.shiftKey ? true : !databasesOpen);
                break;
        }
    };

    return (
        <div className={style["server-sections"]}>
            <div className={style["server-section"]}>
                <div className={style["server-section-title-wrapper"]}>
                    <div className={style["server-section-title"]}>Charts</div>
                </div>
                <div className={style["server-section-items"]}>
                    <Button secondary={chartsOpen} onClick={() => { setChartsOpen(!chartsOpen); }}>Show</Button>
                    {!chartsOpen ? null : <React.Fragment>
                        <Button secondary={statType === "HOUR"} onClick={() => { setStatType("HOUR") }}>Hour</Button>
                        <Button secondary={statType === "DAY"} onClick={() => { setStatType("DAY") }}>Day</Button>
                        <Button secondary={statType === "MONTH"} onClick={() => { setStatType("MONTH") }}>Month</Button>
                        <Button secondary={statType === "YEAR"} onClick={() => { setStatType("YEAR") }}>Year</Button>
                    </React.Fragment>}
                </div>
                {!chartsOpen ? null : <div className={style["server-charts"]}>
                    <CPUChart type={statType} statistics={statistics} />
                    <MemoryChart type={statType} item={props.item} statistics={statistics} />
                    <NetworkChart type={statType} statistics={statistics} />
                    {props.disks.map((e, i) => e.statistics.length === 0 ? null : <DiskChart key={i} item={e} type={"HOUR"} />)}
                </div>}
            </div>
            <div className={style["server-section"]}>
                <div className={style["server-section-title-wrapper"]}>
                    <div className={style["server-section-title"]}>Actions</div>
                </div>
                <div className={style["server-section-items"]}>
                    <Button className={style["server-section-button"]} onClick={() => { location.href = `/create-database/${props.item.id}`; }}>
                        <div className={databaseStyle["icon-database"]} />
                        Add Database
                    </Button>
                </div>
            </div>
            <div className={style["server-section"]}>
                <div className={style["server-section-title-wrapper"]}>
                    <div className={style["server-section-title"]}>Toggles</div>
                </div>
                <div className={style["server-section-items"]}>
                    <Button className={style["server-section-button"]} secondary={networksOpen} onClick={(e) => { processSwitch(e, "DISK"); }}>
                        <div className={networkStyle["icon-network"]} style={networksOpen ? { background: "var(--color-secondary-text)" } : {}} />
                        Networks
                    </Button>
                    <Button className={style["server-section-button"]} secondary={disksOpen} onClick={(e) => { processSwitch(e, "DISK"); }}>
                        <div className={diskStyle["icon-disk"]} style={disksOpen ? { background: "var(--color-secondary-text)" } : {}} />
                        Disks
                    </Button>
                    <Button className={style["server-section-button"]} secondary={containersOpen} onClick={(e) => { processSwitch(e, "CONTAINER");  }}>
                        <div className={containerStyle["icon-container"]} style={containersOpen ? { background: "var(--color-secondary-text)" } : {}} />
                        Containers
                    </Button>
                    <Button className={style["server-section-button"]} secondary={databasesOpen} onClick={(e) => { processSwitch(e, "DATABASE");  }}>
                        <div className={databaseStyle["icon-database"]} style={databasesOpen ? { background: "var(--color-secondary-text)" } : {}} />
                        Databases
                    </Button>
                </div>
            </div>
            {!networksOpen || props.network === null ? null : <div className={style["server-section"]}>
                <Network item={props.network} actions={props.actions} />
            </div>}
            {!disksOpen || (props.disks.length + props.zfsPools.length < 1) ? null : <div className={style["server-section"]}>
                {props.disks.map((e, i) => <Disk key={i} item={e} actions={props.actions} />)}
                {props.zfsPools.map((e, i) => <ZFSPool key={i} item={e} actions={props.actions} />)}
            </div>}
            {!containersOpen || (containerProjects.length + props.containers.length < 1) ? null : <div className={style["server-section"]}>
                {containerProjects.map((e, i) => <SmallContainerProject key={i} item={e} logs={[]} actions={props.actions} />)}
                {props.containers.filter(e => e.parent === null).map((e, i) => <SmallContainer key={i} item={e} logs={[]} actions={props.actions} />)}
            </div>}
            {!databasesOpen || (props.databases.length < 1) ? null : <div className={style["server-section"]}>
                {props.databases.map((e, i) => <Database key={i} item={e} actions={props.actions} />)}
            </div>}
        </div>
    );
};

export default ServerSections;
