/* Base */
import { h, FunctionalComponent } from "preact";
import { useCallback, useEffect, useRef, useState } from "react";
import G6, { EdgeConfig, Graph, IG6GraphEvent, NodeConfig } from "@antv/g6";
import { getServerConnectedProps } from "../../scripts/util/server";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
import { humanFileSize, pickHex } from "../../scripts/util/util";
import { cleanDockerPort, showDockerPort } from "../../scripts/util/container";
/* Components */

const ServerMapRoute: FunctionalComponent<ServerRouteConnectedProps> = (props: ServerRouteConnectedProps) => {
    const [graph, setGraph] = useState<Graph | null>(null);
    const onRefChange = useCallback((ref) => {
        if (ref === null) {
            return;
        }
        const newGraph = new G6.Graph({
            container: ref,
            layout: {
                type: "force",
                preventOverlap: true,
                linkDistance: (e: EdgeConfig) => {
                    switch(e.edgeType) {
                        case "far":
                            return 350;

                        case "short":
                            return 180;

                        case "close":
                            return 0;

                        default:
                            return 50;
                    }
                },
                nodeSpacing: (e: NodeConfig) => {
                    switch(e.nodeType) {
                        case "far":
                            return 100;

                        case "middle":
                            return 30;

                        case "close":
                            return 0;

                        default:
                            return 5;
                    }
                }
            },
            modes: {
              default: ["drag-canvas", "zoom-canvas"]
            },
            defaultNode: {
                type: "node",
                labelCfg: {
                    style: {
                        fill: "#ffffff",
                        fontSize: 10
                    }
                },
                style: {
                    stroke: "#72CC4A",
                    width: 150
                }
            },
            defaultEdge: {
                labelCfg: {
                    style: {
                        fill: "#ffffff"
                    }
                },
                size: 2
            }
        });
        const refreshDragedNodePosition = (e: IG6GraphEvent) => {
            if(e.item === null) { return; }
            const model = e.item.get('model');
            model.fx = e.x;
            model.fy = e.y;
        }
        newGraph.on('node:dragstart', (e) => {
            newGraph.layout();
            refreshDragedNodePosition(e);
        });
        newGraph.on('node:drag', (e) => {
            const forceLayout = newGraph.get('layoutController').layoutMethods[0];
            forceLayout.execute();
            refreshDragedNodePosition(e);
        });
        newGraph.on('node:dragend', (e) => {
            if(e.item === null) { return; }
            e.item.get('model').fx = null;
            e.item.get('model').fy = null;
        });
        window.addEventListener("resize", () => {
            if(newGraph !== null) {
                newGraph.changeSize(window.innerWidth - 40, window.innerHeight - 96);
            }
        });
        newGraph.changeSize(window.innerWidth - 40, window.innerHeight - 96);
        setGraph(newGraph);
    }, []);
    useEffect(() => {
        const netHighLoad = 1048576;
        if (props.id === undefined || graph === null) {
            return;
        }
        const server = props.servers.get(props.id);
        if(server === undefined) {
            return;
        }
        const serverProps = getServerConnectedProps(server, props);
        const data: { nodes: NodeConfig[], edges: EdgeConfig[] } = {
            nodes: [],
            edges: []
        };
        const middleX = Math.round(window.innerWidth / 2);
        const middleY = Math.round(window.innerHeight / 2);
        data.nodes.push({ id: server.id, x: 0, y: middleY, label: server.name, labelCfg: { style: { fontSize: 20 }}, size: 220, style: { fill: "#ff3645", stroke: "#de1221" }, nodeType: "far" });
        
        data.nodes.push({ id: `${server.id}-docker`, x: middleX, y: middleY, label: "Docker", labelCfg: { style: { fontSize: 20 }}, size: 220, style: { fill: "#ef42ff", stroke: "#880494" }, nodeType: "far" });
        data.edges.push({ source: server.id, target: `${server.id}-docker`, edgeType: "far" });
        const processContainer = (source: string, portsSource: string, e: ContainerStructured) => {
            let size = 50;
            let fontSize = 10;
            let color = "#ffffff";
            let edgeSize = 2;
            if(e.statistics.length > 0) {
                size = Math.max(50, 360 * (e.statistics[0].memory / server.memory));
                fontSize = Math.max(10, 55 * (e.statistics[0].memory / server.memory));
                const netLoad = (e.statistics[0].rx + e.statistics[0].tx) / netHighLoad;
                color = pickHex([255,0,0], [0,255,0], Math.min(1, netLoad));
                edgeSize = Math.max(edgeSize, Math.round(5 * netLoad));
            }
            data.nodes.push({ id: e.id, label: e.names, labelCfg: { style: { fontSize } }, style: { fill: "#739dff", stroke: "#4e79de", color: "white" }, size, isLeaf: true, nodeType: "close" });
            data.edges.push({ source, target: e.id, color, size: edgeSize, edgeType: "close" });
            if(e.ports.length !== 0) {
                const ports = e.ports.split(",").map(e => e.trim()).filter(e => showDockerPort(e)).map(e => cleanDockerPort(e));
                for(const port of ports) {
                    data.nodes.push({ id: `${e.id}-${port}`, label: port, labelCfg: { style: { fontSize: 10 }}, style: { fill: "#ff5cbb", stroke: "#ff2ba7" }, size: 50, isLeaf: true, nodeType: "close" });
                    data.edges.push({ source: portsSource, target: `${e.id}-${port}`, edgeType: "close" });
                }
            }
        };
        for(const containerProject of serverProps.containerProjects) {
            const size = Math.max(75, 480 * (containerProject.statistics.memory / server.memory));
            const fontSize = Math.max(15, 75 * (containerProject.statistics.memory / server.memory));
            data.nodes.push({ id: containerProject.item.id, label: containerProject.item.name, labelCfg: { style: { fontSize }}, style: { fill: "#4a80ff", stroke: "#1749bf" }, size, isLeaf: true, nodeType: "middle" });
            data.edges.push({ source: `${server.id}-docker`, target: containerProject.item.id });
            for(const container of containerProject.item.containers) {
                processContainer(containerProject.item.id, containerProject.item.id, container);
            }
        }
        for(const container of serverProps.containers.filter(e => e.item.parent === null)) {
            processContainer(`${server.id}-docker`, container.item.id, container.item);
        }

        data.nodes.push({ id: `${server.id}-disks`, x: -middleX, y: middleY, label: "Disks", labelCfg: { style: { fontSize: 20 }}, size: 220, style: { fill: "#ef42ff", stroke: "#880494" } });
        data.edges.push({ source: server.id, target: `${server.id}-disks`, edgeType: "far" });
        for(const disk of serverProps.disks) {
            const size = Math.max(75, 30 * (disk.size / 536870912000));
            const fontSize = Math.max(15, 4 * (disk.size / 536870912000));
            data.nodes.push({ id: disk.id, label: `${disk.model?.trim() ?? disk.name}\n(${humanFileSize(disk.size)})`, labelCfg: { style: { fontSize }}, style: { fill: "#f78e4d", stroke: "#d45a0f" }, size, isLeaf: true });
            data.edges.push({ source: `${server.id}-disks`, target: disk.id, edgeType: "close" });
        }

        data.edges = data.edges.map((edge, i) => {
            edge.id = `edge-${i}`;
            return { ...edge};
        });

        graph.data(data);
        graph.render();
    }, [props.id, props.servers, graph]);

    useEffect(() => {
        if(props.id === undefined) { return; }
        if(props.session !== null) {
            props.actions.fetchServerStructured(props.id);
            props.actions.connectWebsocket();
        }
    }, [props.session]);
    if(props.id === undefined) {
        return null;
    }
    const server = props.servers.get(props.id);
    if(server === undefined) {
        return null;
    }

    return (
        <div class={baseStyle.page}>
            <div className={style["page-network"]} ref={onRefChange} />
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(ServerMapRoute);
