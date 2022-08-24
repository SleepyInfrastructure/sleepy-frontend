/* Redux */
import { Dispatch } from "redux";
/* Redux */
import { createServerDaemonTokenSuccess, createServerSuccess, createSessionSuccess, deleteDaemonTokenSuccess, fetchAllDisksStructuredSuccess, fetchAllServersStructuredSuccess, fetchContainerSuccess, fetchDiskSuccess, fetchNetworkSuccess, fetchPartitionSuccess, fetchServerDaemonTokensSuccess, fetchServerStructuredSuccess, fetchServerSuccess, fetchUserSuccess } from "./actions";
import { cacheResource, cacheResources, ResourceType } from "./util";
/* API */
import { createServer, createServerDaemonToken, createSession, createUser, deleteDeamonToken, deleteSession, fetchAllDisksStructured, fetchAllServersStructured, fetchContainer, fetchDisk, fetchNetwork, fetchPartition, fetchServer, fetchServerDaemonTokens, fetchServerStructured, fetchUser } from "../scripts/api/routes";
import { connectWebsocket, DaemonWebsocketMessageType, sendWebsocketMessage } from "../scripts/ws/ws";

const REDUCERS: Record<string, (state: ReduxState, action: ReduxAction) => any> = {
    CREATE_USER_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.USER);
        return state;
    },

    FETCH_USER_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.USER);
        return state;
    },

    CREATE_SESSION_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, session: action.data };
    },

    DELETE_SESSION: (): any => {
        deleteSession();
    },

    CREATE_SERVER_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.SERVER_STRUCTURED);
        return state;
    },

    FETCH_SERVER_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.SERVER);
        return state;
    },

    FETCH_SERVER_STRUCTURED_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.SERVER_STRUCTURED);
        return state;
    },

    FETCH_ALL_SERVERS_STRUCTURED_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResources(state, action.data, ResourceType.SERVER_STRUCTURED);
        return state;
    },

    FETCH_NETWORK_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.NETWORK);
        return state;
    },

    FETCH_DISK_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.DISK);
        return state;
    },

    FETCH_ALL_DISKS_STRUCTURED_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResources(state, action.data, ResourceType.DISK_STRUCTURED);
        return state;
    },

    FETCH_PARTITION_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.PARTITION);
        return state;
    },

    FETCH_CONTAINER_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.CONTAINER);
        return state;
    },

    FETCH_ALL_DAEMONS_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResources(state, action.data, ResourceType.DAEMON);
        return state;
    },

    FETCH_SERVER_DAEMON_TOKENS_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResources(state, action.data, ResourceType.DAEMON_TOKEN);
        return state;
    },

    CREATE_SERVER_DAEMON_TOKEN_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.DAEMON_TOKEN);
        return state;
    },

    DELETE_DAEMON_TOKEN_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        const daemonTokens = new Map(state.daemonTokens);
        daemonTokens.delete(action.data);
        return { ...state, daemonTokens };
    },
};
const ASYNC_REDUCERS: Record<string, (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction) => Promise<void>> = {
    CREATE_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const user = await createUser(action.data.username, action.data.password);
        if (user === undefined) {
            return;
        }

        location.href = "/";
    },

    FETCH_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const user = await fetchUser(action.data);
        if (user === undefined) {
            return;
        }

        dispatch(fetchUserSuccess(user));
    },

    CREATE_SESSION: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const session = await createSession(action.data.type, action.data.username, action.data.password);
        if (session === undefined) {
            return;
        }
        const user = await fetchUser(session.user);
        if (user === undefined) {
            return;
        }

        dispatch(createSessionSuccess(action.data));
        dispatch(fetchUserSuccess(user));
    },

    CREATE_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const server = await createServer(action.data.name);
        if (server === undefined) {
            return;
        }

        dispatch(createServerSuccess(server));
    },

    FETCH_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const server = await fetchServer(action.data);
        if (server === undefined) {
            return;
        }

        dispatch(fetchServerSuccess(server));
    },

    FETCH_SERVER_STRUCTURED: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const server = await fetchServerStructured(action.data);
        if (server === undefined) {
            return;
        }

        dispatch(fetchServerStructuredSuccess(server));
    },

    FETCH_ALL_SERVERS_STRUCTURED: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const servers = await fetchAllServersStructured();
        dispatch(fetchAllServersStructuredSuccess(servers));
    },

    FETCH_NETWORK: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const network = await fetchNetwork(action.data);
        if (network === undefined) {
            return;
        }

        dispatch(fetchNetworkSuccess(network));
    },

    FETCH_DISK: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const disk = await fetchDisk(action.data);
        if (disk === undefined) {
            return;
        }

        dispatch(fetchDiskSuccess(disk));
    },

    FETCH_ALL_DISKS_STRUCTURED: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const disks = await fetchAllDisksStructured();
        dispatch(fetchAllDisksStructuredSuccess(disks));
    },

    FETCH_PARTITION: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const partition = await fetchPartition(action.data);
        if (partition === undefined) {
            return;
        }

        dispatch(fetchPartitionSuccess(partition));
    },

    FETCH_CONTAINER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const container = await fetchContainer(action.data);
        if (container === undefined) {
            return;
        }

        dispatch(fetchContainerSuccess(container));
    },

    CONNECT_WEBSOCKET: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await connectWebsocket(dispatch);
    },

    DAEMON_REQUEST_REFRESH: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await sendWebsocketMessage({ type: DaemonWebsocketMessageType.DAEMON_CLIENT_REQUEST_REFRESH, id: action.data });
    },

    DAEMON_REQUEST_DATABASE_BACKUP: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await sendWebsocketMessage({ type: DaemonWebsocketMessageType.DAEMON_CLIENT_REQUEST_DATABASE_BACKUP, ...action.data });
    },

    CREATE_SERVER_DAEMON_TOKEN: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const token = await createServerDaemonToken(action.data);
        if (token === undefined) {
            return;
        }

        dispatch(createServerDaemonTokenSuccess(token));
    },

    DELETE_DAEMON_TOKEN: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const success = await deleteDeamonToken(action.data);
        if (success) {
            dispatch(deleteDaemonTokenSuccess(action.data));
        }
    },

    FETCH_SERVER_DAEMON_TOKENS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const daemonTokens = await fetchServerDaemonTokens(action.data);
        dispatch(fetchServerDaemonTokensSuccess(daemonTokens));
    },
};

export { REDUCERS, ASYNC_REDUCERS };
