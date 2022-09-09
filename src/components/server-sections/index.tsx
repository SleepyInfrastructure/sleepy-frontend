/* Base */
import { h, FunctionalComponent } from "preact";
import { useState } from "react";
/* Styles */
import baseStyle from "../server/style.scss";
import style from "./style.scss";
/* Components */
import Disk from "../disk";
import ZFSPool from "../zfs-pool";
import Container from "../container";
import Database from "../database";
import ContainerProject from "../container-project";

const ServerSections: FunctionalComponent<ServerSectionsConnectedProps> = (props: ServerSectionsConnectedProps) => {
    const [disksOpen, setDisksOpen] = useState(true);
    const [containersOpen, setContainersOpen] = useState(true);
    const [databasesOpen, setDatabasesOpen] = useState(true);
    const containerProjects = props.containerProjects.map((e) => {
        const containers = props.containers.filter(el => el.parent === e.id);
        return { ...e, containers };
    });

    return (
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
                    <a href={`/create-database/${props.item.id}`} className={baseStyle["server-link"]}>(Add)</a>
                </div>
                {!databasesOpen || (props.databases.length < 1) ? null : <div className={style["server-section"]}>
                    {props.databases.map((e, i) => <Database key={i} item={e} actions={props.actions} />)}
                </div>}
            </div>
        </div>
    );
};

export default ServerSections;
