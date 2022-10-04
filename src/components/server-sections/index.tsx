/* Base */
import { h, FunctionalComponent, Fragment } from "preact";
import { useEffect, useState } from "react";
/* Styles */
import baseStyle from "../style.scss";
import networkStyle from "../network/style.scss";
import diskStyle from "../disk/style.scss";
import containerStyle from "../container/style.scss";
import databaseStyle from "../database/style.scss";
import smbStyle from "../smb-instance/style.scss";
import style from "./style.scss";
/* Components */
import Button from "../ui/button";
import Network from "../network";
import Disk from "../disk";
import ZFSPool from "../zfs-pool";
import SmallContainer from "../small-container";
import SmallContainerProject from "../small-container-project";
import Database from "../database";
import SMBInstance from "../smb-instance";
/* Charts */
import CPUChart from "../charts/cpu";
import MemoryChart from "../charts/memory";
import NetworkChart from "../charts/network";
import DiskChart from "../charts/disk";
const StatTypeMapping: Record<StatisticType, string> = {
    MINUTE: "",
    HOUR: "MINUTE",
    DAY: "HOUR",
    MONTH: "DAY",
    YEAR: "MONTH"
}

const ServerSections: FunctionalComponent<ServerSectionsConnectedProps> = (props: ServerSectionsConnectedProps) => {
    const containerProjects = props.containerProjects.map((e) => {
        const containers = props.containers.filter(el => el.item.parent === e.item.id);
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
    const [smbOpen, setSmbOpen] = useState(true);
    const processSwitch = (e: React.MouseEvent, type: "NETWORK" | "DISK" | "CONTAINER" | "DATABASE" | "SMB") => {
        if(!e.shiftKey) {
            setNetworksOpen(false);
            setDisksOpen(false);
            setContainersOpen(false);
            setDatabasesOpen(false);
            setSmbOpen(false);
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
            case "SMB":
                setSmbOpen(!e.shiftKey ? true : !smbOpen);
                break;
        }
    };

    return (
        <div className={style["server-sections"]}>
            <div className={style["server-section"]}>
                <div className={style["server-section-title-wrapper"]}>
                    <div className={style["icon-chart"]} />
                    <div className={style["server-section-title"]}>Charts</div>
                </div>
                <div className={style["server-section-header"]}>
                    <Button secondary={chartsOpen} onClick={() => { setChartsOpen(!chartsOpen); }}>Show</Button>
                    {!chartsOpen ? null : <Fragment>
                        <Button secondary={statType === "HOUR"} onClick={() => { setStatType("HOUR") }}>Hour</Button>
                        <Button secondary={statType === "DAY"} onClick={() => { setStatType("DAY") }}>Day</Button>
                        <Button secondary={statType === "MONTH"} onClick={() => { setStatType("MONTH") }}>Month</Button>
                        <Button secondary={statType === "YEAR"} onClick={() => { setStatType("YEAR") }}>Year</Button>
                    </Fragment>}
                </div>
                {!chartsOpen ? null : <div className={style["server-section-charts"]}>
                    <CPUChart type={statType} statistics={statistics} />
                    <MemoryChart type={statType} statistics={statistics} memory={props.item.memory} swap={props.item.swap} />
                    <NetworkChart type={statType} statistics={statistics} />
                    {props.disks.map((e, i) => {
                        if(e.statistics.length === 0) {
                            return null;
                        }
                        const statistics = e.statistics.filter(el => el.type === StatTypeMapping[statType]).sort((a, b) => a.timestamp - b.timestamp);
                        const title = e.model !== undefined ? `${e.model} (${e.name})` : e.name;
                        return <DiskChart key={i} type={statType} statistics={statistics} title={title} />;
                    })}
                </div>}
            </div>
            <div className={style["server-section"]}>
                <div className={style["server-section-title-wrapper"]}>
                    <div className={style["icon-action"]} />
                    <div className={style["server-section-title"]}>Actions</div>
                </div>
                <div className={style["server-section-header"]}>
                    <Button className={style["server-section-button"]} onClick={() => { location.href = `/create-database/${props.item.id}`; }}>
                        <div className={databaseStyle["icon-database"]} />
                        Add Database
                    </Button>
                    <Button className={style["server-section-button"]} onClick={() => { location.href = `/create-smb-instance/${props.item.id}`; }}>
                        <div className={smbStyle["icon-smb"]} />
                        Add SMB Instance
                    </Button>
                    <Button className={style["server-section-button"]} onClick={() => { props.actions.daemonBuildSmbConfig(props.item.id); }}>
                        <div className={smbStyle["icon-smb"]} />
                        Rebuild SMB
                    </Button>
                </div>
            </div>
            <div className={style["server-section"]}>
                <div className={style["server-section-title-wrapper"]}>
                    <div className={style["icon-resource"]} />
                    <div className={style["server-section-title"]}>Resources</div>
                </div>
                <div className={style["server-section-header"]}>
                    <Button className={style["server-section-button"]} secondary={networksOpen} onClick={(e) => { processSwitch(e, "NETWORK"); }}>
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
                    <Button className={style["server-section-button"]} secondary={smbOpen} onClick={(e) => { processSwitch(e, "SMB");  }}>
                        <div className={smbStyle["icon-smb"]} style={smbOpen ? { background: "var(--color-secondary-text)" } : {}} />
                        SMB Instances
                    </Button>
                </div>
                <div className={style["server-section-items"]}>
                    {!networksOpen || props.network === null ? null : <Network item={props.network} actions={props.actions} />}
                    {!disksOpen || props.disks.length < 1 ? null : props.disks.map((e, i) => <Disk key={i} item={e} actions={props.actions} />)}
                    {!disksOpen || props.zfsPools.length < 1 ? null : props.zfsPools.map((e, i) => <ZFSPool key={i} item={e} actions={props.actions} />)}
                    {!containersOpen || containerProjects.length < 1 ? null : containerProjects.map((e, i) => <SmallContainerProject key={i} item={e.item} logs={[]} actions={props.actions} />)}
                    {!containersOpen || props.containers.length < 1 ? null : props.containers.filter(e => e.item.parent === null).map((e, i) => <SmallContainer key={i} item={e.item} logs={[]} actions={props.actions} />)}
                    {!databasesOpen || props.databases.length < 1 ? null : props.databases.map((e, i) => <Database key={i} item={e} actions={props.actions} />)}
                    {!smbOpen || props.smb.length < 1 ? null : props.smb.map((e, i) => <SMBInstance key={i} item={e} actions={props.actions} />)}
                </div>
            </div>
        </div>
    );
};

export default ServerSections;
