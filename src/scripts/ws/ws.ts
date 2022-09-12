import { Dispatch } from "redux";
import { addContainerLog, fetchAllDaemonsSuccess, fetchServerStructured, fetchTaskSuccess } from "../../redux/actions";

let socket: WebSocket | null = null;
function getWsEndpoint() {
    return location.host === "sleepy.lamkas.dev" ? "wss://api.sleepy.lamkas.dev" : "ws://localhost:9002";
}

export enum DaemonWebsocketMessageType {
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_FAILURE = "AUTH_FAILURE",
    DAEMONS = "DAEMONS",
    DAEMONS_REPLY = "DAEMONS_REPLY",
    
    DAEMON_CLIENT_REQUEST_RESOURCES = "DAEMON_CLIENT_REQUEST_RESOURCES",
    DAEMON_CLIENT_REQUEST_RESOURCES_REPLY = "DAEMON_CLIENT_REQUEST_RESOURCES_REPLY",

    DAEMON_CLIENT_REQUEST_DATABASE_BACKUP = "DAEMON_CLIENT_REQUEST_DATABASE_BACKUP",

    DAEMON_CLIENT_REQUEST_LIVE_STATS_REPLY = "DAEMON_CLIENT_REQUEST_LIVE_STATS_REPLY",

    DAEMON_CLIENT_TASK_REPLY = "DAEMON_CLIENT_TASK_REPLY",

    DAEMON_CLIENT_CONNECT_CONTAINER_LOG = "DAEMON_CLIENT_CONNECT_CONTAINER_LOG",
    DAEMON_CLIENT_CONTAINER_LOG_MESSAGE = "DAEMON_CLIENT_CONTAINER_LOG_MESSAGE",
}

export function connectWebsocket(dispatch: Dispatch<ReduxAction>) {
    if(isConnected()) {
        return;
    }

    socket = new WebSocket(`${getWsEndpoint()}/socket`);
    socket.onclose = () => {
        socket = null;
    };
    socket.onerror = () => {
        socket = null;
    };
    socket.onmessage = (event) => {
        if(socket === null) { return; }
        const message = JSON.parse(event.data);
        switch(message.type) {
            case DaemonWebsocketMessageType.AUTH_SUCCESS:
                console.log(`Logged in as ${message.username}! (id: ${message.id})`);
                socket.send(JSON.stringify({ type: DaemonWebsocketMessageType.DAEMONS }));
                break;

            case DaemonWebsocketMessageType.AUTH_FAILURE:
                console.log(`Failed to login! (reason: ${message.reason})`);
                break;

            case DaemonWebsocketMessageType.DAEMONS_REPLY:
                dispatch(fetchAllDaemonsSuccess(message.items));
                break;

            case DaemonWebsocketMessageType.DAEMON_CLIENT_REQUEST_RESOURCES_REPLY:
                dispatch(fetchServerStructured(message.id));
                break;

            case DaemonWebsocketMessageType.DAEMON_CLIENT_TASK_REPLY:
                dispatch(fetchTaskSuccess(message.task));
                break;

            case DaemonWebsocketMessageType.DAEMON_CLIENT_CONTAINER_LOG_MESSAGE:
                dispatch(addContainerLog(message.container, message.message));
                break;
        }
    }
}

export function isConnected() {
    return socket !== null;
}

export function sendWebsocketMessage(message: any) {
    if(socket === null) { return; }
    socket.send(JSON.stringify(message));
}