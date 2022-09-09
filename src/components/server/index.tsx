/* Base */
import { h, FunctionalComponent } from "preact";
import { useState } from "react";
/* Styles */
import style from "./style.scss";
/* Components */
import Disk from "../disk";
import ZFSPool from "../zfs-pool";
import Container from "../container";
import Database from "../database";
import DiskChart from "../charts/disk";
import CPUChart from "../charts/cpu";
import NetworkChart from "../charts/network";
import MemoryChart from "../charts/memory";
import ContainerProject from "../container-project";
import ServerContent from "../server-content";

const Server: FunctionalComponent<ServerConnectedProps> = (props: ServerConnectedProps) => {
    const [disksOpen, setDisksOpen] = useState(true);
    const [containersOpen, setContainersOpen] = useState(true);
    const [databasesOpen, setDatabasesOpen] = useState(false);
    const statistics = props.statistics.sort((a, b) => a.timestamp - b.timestamp);
    const containerProjects = props.containerProjects.map((e) => {
        const containers = props.containers.filter(el => el.parent === e.id);
        return { ...e, containers };
    });
    console.log(props.network);

    return (
        <div className={style.server}>
            <div className={style["server-header"]}>
                <div className={style["server-icon"]} style={{ background: `#${props.item.color}` }} />
                <a href={`/server/${props.item.id}`} className={style["server-name"]} style={{ color: `#${props.item.color}` }}>{props.item.name}</a>
                <a href={`/edit-server/${props.item.id}`} className={style["server-link"]}>(Edit)</a>
            </div>
            {statistics.length === 0 ? null :
            <div className={style["server-charts"]}>
                <CPUChart statistics={statistics} />
                <MemoryChart item={props.item} statistics={statistics} />
                <NetworkChart statistics={statistics} />
            </div>}
            <div className={style["server-charts"]}>
                {props.disks.map((e, i) => e.statistics.length === 0 ? null : <DiskChart key={i} item={e} />)}
            </div>
            <ServerContent {...props} />
            <div className={style["server-sections"]}>
                <div className={style["server-section-wrapper"]}>
                    <div className={style["server-section-title-wrapper"]} onClick={() => { setDisksOpen(!disksOpen); }}>
                        <a className={style["server-section-title"]} data={disksOpen ? "true" : "false"}>Disks</a>
                        <div className={style["server-section-arrow"]} data={disksOpen ? "true" : "false"} />
                    </div>
                    {!disksOpen || (props.disks.length + props.zfsPools.length < 1) ? null : <div className={style["server-section"]}>
                        {props.disks.map((e, i) => <Disk key={i} item={e} actions={props.actions} />)}
                        {props.zfsPools.map((e, i) => <ZFSPool key={i} item={e} actions={props.actions} />)}
                    </div>}
                </div>
                <div className={style["server-section-wrapper"]}>
                    <div className={style["server-section-title-wrapper"]} onClick={() => { setContainersOpen(!containersOpen); }}>
                        <a className={style["server-section-title"]} data={containersOpen ? "true" : "false"}>Containers</a>
                        <div className={style["server-section-arrow"]} data={containersOpen ? "true" : "false"} />
                    </div>
                    {!containersOpen || (containerProjects.length + props.containers.length < 1) ? null : <div className={style["server-section"]}>
                        {containerProjects.map((e, i) => <ContainerProject key={i} item={e} actions={props.actions} />)}
                        {props.containers.filter(e => e.parent === null).map((e, i) => <Container key={i} item={e} actions={props.actions} />)}
                    </div>}
                </div>
                <div className={style["server-section-wrapper"]}>
                    <div className={style["server-section-title-wrapper"]} onClick={() => { setDatabasesOpen(!databasesOpen); }}>
                        <a className={style["server-section-title"]} data={databasesOpen ? "true" : "false"}>Databases</a>
                        <div className={style["server-section-arrow"]}  data={databasesOpen ? "true" : "false"} />
                    </div>
                    {!databasesOpen || (props.databases.length < 1) ? null : <div className={style["server-section"]}>
                        {props.databases.map((e, i) => <Database key={i} item={e} actions={props.actions} />)}
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Server;
