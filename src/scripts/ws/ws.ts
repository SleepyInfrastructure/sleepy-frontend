import { Dispatch } from "redux";
import { fetchAllDaemonsSuccess, fetchServerStructured } from "../../redux/actions";

let socket: WebSocket | null;

export enum DaemonWebsocketMessageType {
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_FAILURE = "AUTH_FAILURE",
    DAEMONS = "DAEMONS",
    DAEMONS_REPLY = "DAEMONS_REPLY",
    
    DAEMON_CLIENT_REQUEST_REFRESH = "DAEMON_CLIENT_REQUEST_REFRESH",
    DAEMON_CLIENT_REQUEST_REFRESH_REPLY = "DAEMON_CLIENT_REQUEST_REFRESH_REPLY",

    DAEMON_CLIENT_REQUEST_DATABASE_BACKUP = "DAEMON_CLIENT_REQUEST_DATABASE_BACKUP",

    DAEMON_CLIENT_REQUEST_LIVE_STATS_REPLY = "DAEMON_CLIENT_REQUEST_LIVE_STATS_REPLY",
}

export function connectWebsocket(dispatch: Dispatch<ReduxAction>) {
    socket = new WebSocket("ws://localhost:23365/socket");
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

            case DaemonWebsocketMessageType.DAEMON_CLIENT_REQUEST_REFRESH_REPLY:
                dispatch(fetchServerStructured(message.id));
                break;
        }
    }
}

export function sendWebsocketMessage(message: any) {
    if(socket === null) { return; }
    socket.send(JSON.stringify(message));
}