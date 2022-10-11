/* Base */
import { h, FunctionalComponent } from "preact";
import { useCallback, useEffect, useState } from "react";
import { Graph } from "@antv/g6";
import { getServerConnectedProps } from "../../scripts/util/server";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
import { createServerGraph } from "./models/server";
import { createGraph, GraphBetterData } from "./graph";
/* Components */

const ServerMapRoute: FunctionalComponent<ServerRouteConnectedProps> = (props: ServerRouteConnectedProps) => {
    let server: Server | undefined;
    if(props.id !== undefined) {
        server = props.servers.get(props.id);
    }
    const [graph, setGraph] = useState<Graph | null>(null);
    const onRefChange = useCallback((ref) => {
        if (ref === null) {
            return;
        }
        setGraph(createGraph(ref));
    }, []);
    useEffect(() => {
        if(server === undefined || graph === null) {
            return;
        }
        let data: GraphBetterData = { nodes: [], edges: [] };
        data = createServerGraph(data, getServerConnectedProps(server, props), Math.round(window.innerWidth / 2), Math.round(window.innerHeight / 2));
        data.edges = data.edges.map((edge, i) => {
            edge.id = `edge-${i}`;
            return { ...edge};
        });

        graph.data(data);
        graph.render();
    }, [props.id, props.servers, graph, server, props]);
    useEffect(() => {
        if(props.id === undefined) { return; }
        if(props.session !== null) {
            props.actions.fetchServerStructured(props.id);
            props.actions.connectWebsocket();
        }
    }, [props.actions, props.id, props.session]);
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
