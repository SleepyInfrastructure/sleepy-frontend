import { EdgeConfig, NodeConfig, GraphOptions, Graph, IG6GraphEvent } from "@antv/g6";

export type GraphBetterData = {
    nodes: NodeConfig[],
    edges: EdgeConfig[]
};

export function createGraph(ref: HTMLElement): Graph {
    const graph = new Graph(getGraphOptions(ref));
    const refreshDragedNodePosition = (e: IG6GraphEvent) => {
        if(e.item === null) { return; }
        const model = e.item.get('model');
        model.fx = e.x;
        model.fy = e.y;
    }
    graph.on('node:dragstart', (e) => {
        graph.layout();
        refreshDragedNodePosition(e);
    });
    graph.on('node:drag', (e) => {
        const forceLayout = graph.get('layoutController').layoutMethods[0];
        forceLayout.execute();
        refreshDragedNodePosition(e);
    });
    graph.on('node:dragend', (e) => {
        if(e.item === null) { return; }
        e.item.get('model').fx = null;
        e.item.get('model').fy = null;
    });
    window.addEventListener("resize", () => {
        if(graph !== null) {
            graph.changeSize(window.innerWidth - 40, window.innerHeight - 96);
        }
    });
    graph.changeSize(window.innerWidth - 40, window.innerHeight - 96);

    return graph;
}

export function getGraphOptions(ref: HTMLElement): GraphOptions {
    return {
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
    }
}