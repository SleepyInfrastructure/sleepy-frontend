/* Base */
import { h, FunctionalComponent } from "preact";
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, Legend, YAxis, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { formatTimestamp, humanFileSize } from "../../scripts/util/util";
/* Styles */
import style from "./style.scss";
/* Components */
import Disk from "../disk";
import Container from "../container";
import Database from "../database";
import DiskChart from "../charts/disk";
import CPUChart from "../charts/cpu";
import NetworkChart from "../charts/network";
import MemoryChart from "../charts/memory";

const Server: FunctionalComponent<ServerConnectedProps> = (props: ServerConnectedProps) => {
    const [disksOpen, setDisksOpen] = useState(false);
    const [containersOpen, setContainersOpen] = useState(false);
    const [databasesOpen, setDatabasesOpen] = useState(false);
    const statistics = props.statistics.sort((a, b) => a.timestamp - b.timestamp);

    return (
        <div className={style.server}>
            <div className={style["server-header"]}>
                <div className={style["server-icon"]} style={{ background: `#${props.item.color}` }} />
                <a href={`/server/${props.item.id}`} className={style["server-name"]}>{props.item.name}</a>
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
            <div className={style["server-content"]}>
                <div className={style["server-content-header"]}>
                    {props.daemon === null ?
                    <div className={style["server-daemon"]}>Daemon: <span className={style["server-daemon-highlight-red"]}>Not Connected</span>
                        <a className={style["server-daemon-highlight-link"]} onClick={() => {
                            location.href = `/installing-daemon/${props.item.id}`;
                        }}>(Install)</a>
                    </div> :
                    <div className={style["server-daemon"]}>Daemon: <span className={style["server-daemon-highlight-green"]}>Connected</span>
                        <a className={style["server-daemon-highlight-link"]} onClick={() => {
                            if(props.daemon === null) { return; }
                            props.actions.daemonRequestRefresh(props.daemon?.server);
                        }}>(Request Refresh)</a>
                    </div>}
                    {props.network === null ? null :
                    <div className={style["server-network"]}>
                        <div className={style["server-network-title"]}>Network: <span className={style["server-network-title-highlight"]}>{props.network.ipv4}</span></div>
                        <div className={style["server-network-ssh"]}>SSH: {<a className={style["server-network-ssh-highlight"]} href={`http://localhost:8888/?hostname=${props.network.ipv4}&username=${props.item.name}`} target="_blank" rel="noreferrer">Connect</a>}</div>
                    </div>}
                </div>
                <div className={style["server-sections"]}>
                    <div className={style["server-section-wrapper"]}>
                        <div className={style["server-section-title-wrapper"]}>
                            <a className={style["server-section-title"]}>Disks</a>
                            <div className={style["server-section-arrow"]} data={disksOpen ? "true" : "false"} onClick={() => { setDisksOpen(!disksOpen); }} />
                        </div>
                        {!disksOpen ? null : <div className={style["server-section"]}>
                            {props.disks.map((e, i) => <Disk key={i} item={e} actions={props.actions} />)}
                        </div>}
                    </div>
                    <div className={style["server-section-wrapper"]}>
                        <div className={style["server-section-title-wrapper"]}>
                            <a className={style["server-section-title"]}>Containers</a>
                            <div className={style["server-section-arrow"]}  data={containersOpen ? "true" : "false"} onClick={() => { setContainersOpen(!containersOpen); }} />
                        </div>
                        {!containersOpen ? null : <div className={style["server-section"]}>
                            {props.containers.map((e, i) => <Container key={i} item={e} actions={props.actions} />)}
                        </div>}
                    </div>
                    <div className={style["server-section-wrapper"]}>
                        <div className={style["server-section-title-wrapper"]}>
                            <a className={style["server-section-title"]}>Databases</a>
                            <div className={style["server-section-arrow"]}  data={databasesOpen ? "true" : "false"} onClick={() => { setDatabasesOpen(!databasesOpen); }} />
                        </div>
                        {!databasesOpen ? null : <div className={style["server-section"]}>
                            {props.databases.map((e, i) => <Database key={i} item={e} actions={props.actions} />)}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Server;
