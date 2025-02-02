/* Base */
import { StatisticTypePreviousMapping } from "../../ts/common/const";
import { h, FunctionalComponent, Fragment } from "preact";
import { useEffect, useState } from "react";
/* Styles */
import style from "./style.scss";
import baseStyle from "../style.scss";
import networkStyle from "../network/style.scss";
import diskStyle from "../disk/style.scss";
import containerStyle from "../container/style.scss";
import databaseStyle from "../database/style.scss";
import smbStyle from "../smb-instance/style.scss";
import nginxStyle from "../nginx-instance/style.scss";
/* Components */
import Button from "../ui/button";
import Process from "../process";
import Hardware from "../hardware";
import Software from "../software";
import Network from "../network";
import Disk from "../disk";
import ZFSPool from "../zfs-pool";
import SmallContainer from "../small-container";
import SmallContainerProject from "../small-container-project";
import Database from "../database";
import SMBInstance from "../smb-instance";
import NginxInstance from "../nginx-instance";
import ProcessTreeMap from "./process";
/* Charts */
import CPUChart from "../charts/cpu";
import MemoryChart from "../charts/memory";
import NetworkChart from "../charts/network";
import DiskChart from "../charts/disk";
import { humanFileSize } from "../../scripts/util/util";

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
            props.disks.forEach(disk => {
                props.actions.fetchDiskStatistics({ id: disk.id, type: statType.toLowerCase() });
            });
        }
    }, [fetchedTypes, props.actions, props.item.id, statType]);
    const statistics = props.statistics.filter(e => e.type === StatisticTypePreviousMapping[statType]).sort((a, b) => a.timestamp - b.timestamp);

    const [networksOpen, setNetworksOpen] = useState(true);
    const [disksOpen, setDisksOpen] = useState(true);
    const [containersOpen, setContainersOpen] = useState(true);
    const [databasesOpen, setDatabasesOpen] = useState(true);
    const [smbOpen, setSmbOpen] = useState(true);
    const [nginxOpen, setNginxOpen] = useState(true);
    const processSwitch = (e: React.MouseEvent, type: "NETWORK" | "DISK" | "CONTAINER" | "DATABASE" | "SMB" | "NGINX") => {
        if(!e.shiftKey) {
            setNetworksOpen(false);
            setDisksOpen(false);
            setContainersOpen(false);
            setDatabasesOpen(false);
            setSmbOpen(false);
            setNginxOpen(false);
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
            case "NGINX":
                setNginxOpen(!e.shiftKey ? true : !nginxOpen);
                break;
        }
    };
    
    const [processMapType, setProcessMapType] = useState<"MAP" | "LIST">("MAP");

    return (
        <div className={style["server-sections"]}>
            <div id="charts" className={style["server-section"]}>
                <div className={style["server-section-title-wrapper"]}>
                    <div className={style["icon-chart"]} />
                    <div className={style["server-section-title"]}>Charts</div>
                </div>
                <div className={style["server-section-charts-header"]}>
                    <Button className={style["server-section-button"]} secondary={chartsOpen} onClick={() => { setChartsOpen(!chartsOpen); }}>Show</Button>
                    {!chartsOpen ? null : <Fragment>
                        <Button className={style["server-section-button"]} secondary={statType === "HOUR"} onClick={() => { setStatType("HOUR"); }}>
                            <div className={style["icon-hour"]} data={statType === "HOUR" ? "active" : undefined} />
                            Hour
                        </Button>
                        <Button className={style["server-section-button"]} secondary={statType === "DAY"} onClick={() => { setStatType("DAY"); }}>
                            <div className={style["icon-day"]} data={statType === "DAY" ? "active" : undefined} />
                            Day
                        </Button>
                        <Button className={style["server-section-button"]} secondary={statType === "MONTH"} onClick={() => { setStatType("MONTH"); }}>
                            <div className={style["icon-month"]} data={statType === "MONTH" ? "active" : undefined} />
                            Month
                        </Button>
                        <Button className={style["server-section-button"]} secondary={statType === "YEAR"} onClick={() => { setStatType("YEAR"); }}>
                            <div className={style["icon-year"]} data={statType === "YEAR" ? "active" : undefined} />
                            Year
                        </Button>
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
                        const statistics = e.statistics.filter(el => el.type === StatisticTypePreviousMapping[statType]).sort((a, b) => a.timestamp - b.timestamp);
                        const title = e.model !== undefined ? `${e.model} (${e.name})` : e.name;
                        return <DiskChart key={i} type={statType} statistics={statistics} title={title} />;
                    })}
                </div>}
            </div>
            <div id="hardware" className={style["server-section"]}>
                <div className={style["server-section-title-wrapper"]}>
                    <div className={style["icon-hardware"]} />
                    <div className={style["server-section-title"]}>Hardware</div>
                </div>
                <div className={style["server-section-items-grid"]} data="small">
                    <Hardware icon="cpu" name="Processor" data={[
                        { name: "CPU", text: "test" },
                        { name: "Speed", text: "test" },
                        { name: "Cores/Threads", text: "test/test" },
                        { name: "L1/L2/L3 cache", text: "test/test/test" }
                    ]} actions={props.actions} />
                    <Hardware icon="memory" name="Memory" data={[
                        { name: "RAM", text: "test" },
                        { name: "Capacity", text: humanFileSize(props.item.memory) },
                        { name: "Speed", text: "test" }
                    ]} actions={props.actions} />
                </div>
            </div>
            <div id="software" className={style["server-section"]}>
                <div className={style["server-section-title-wrapper"]}>
                    <div className={style["icon-software"]} />
                    <div className={style["server-section-title"]}>Software ({props.software.length})</div>
                </div>
                {props.software.length < 1 ? null : <div className={style["server-section-items-grid"]} data="small">
                    {props.software.map((e, i) => <Software key={i} item={e} actions={props.actions} />)}
                </div>}
            </div>
            <div id="processes" className={style["server-section"]}>
                <div className={style["server-section-title-wrapper"]}>
                    <div className={style["icon-process"]} />
                    <div className={style["server-section-title"]}>Process List ({props.processes.length})</div>
                    <div className={baseStyle["panel-link"]} onClick={() => { setProcessMapType(processMapType === "LIST" ? "MAP" : "LIST"); }}>
                        (Show {processMapType === "LIST" ? "map" : "list"})
                    </div>
                </div>
                {props.processes.length < 1 ? null :
                    processMapType === "MAP" ? <ProcessTreeMap server={props.item} processes={props.processes} /> :
                    <div className={style["server-section-items-grid"]} data="small">
                        {props.processes.map((e, i) => <Process key={i} item={e} actions={props.actions} />)}
                    </div>
                }
            </div>
            <div id="actions" className={style["server-section"]}>
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
                    <Button className={style["server-section-button"]} onClick={() => { location.href = `/create-nginx-instance/${props.item.id}`; }}>
                        <div className={nginxStyle["icon-nginx-instance"]} />
                        Add Nginx Instance
                    </Button>
                    <Button className={style["server-section-button"]} onClick={() => { props.actions.daemonBuildNginxConfig(props.item.id); }}>
                        <div className={nginxStyle["icon-nginx-instance"]} />
                        Rebuild Nginx
                    </Button>
                </div>
            </div>
            <div id="resources" className={style["server-section"]}>
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
                    <Button className={style["server-section-button"]} secondary={nginxOpen} onClick={(e) => { processSwitch(e, "NGINX");  }}>
                        <div className={nginxStyle["icon-nginx-instance"]} style={nginxOpen ? { background: "var(--color-secondary-text)" } : {}} />
                        Nginx Instances
                    </Button>
                </div>
                <div className={style["server-section-items"]}>
                    {!networksOpen || props.network === null ? null : <Network item={props.network} actions={props.actions} />}
                    <div id="disks" className={style["server-section-items-grid"]}>
                        {!disksOpen || props.disks.length < 1 ? null : props.disks.map((e, i) => <Disk key={i} item={e} actions={props.actions} />)}
                        {!disksOpen || props.zfs.length < 1 ? null : props.zfs.map((e, i) => <ZFSPool key={i} item={e} actions={props.actions} />)}
                    </div>
                    {!containersOpen || containerProjects.length < 1 ? null : containerProjects.map((e, i) => <SmallContainerProject key={i} {...e} />)}
                    {!containersOpen || props.containers.length < 1 ? null : props.containers.filter(e => e.item.parent === null).map((e, i) => <SmallContainer key={i} {...e} />)}
                    {!databasesOpen || props.databases.length < 1 ? null : props.databases.map((e, i) => <Database key={i} item={e} actions={props.actions} />)}
                    {!smbOpen || props.smb.length < 1 ? null : props.smb.map((e, i) => <SMBInstance key={i} item={e} actions={props.actions} />)}
                    {!nginxOpen || props.nginx.length < 1 ? null : props.nginx.map((e, i) => <NginxInstance key={i} item={e} actions={props.actions} />)}
                </div>
            </div>
        </div>
    );
};

export default ServerSections;
