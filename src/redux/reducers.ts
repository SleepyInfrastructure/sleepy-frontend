/* Redux */
import { Dispatch } from "redux";
/* Redux */
import { createDatabaseSuccess, createNetworkSuccess, createServerDaemonTokenSuccess, createServerSuccess, createSessionSuccess, createUptimeEndpointSuccess, createUserSuccess, deleteDaemonTokenSuccess, editDatabaseSuccess, editNetworkSuccess, editServerSuccess, editUptimeEndpointSuccess, fetchAllServersStructuredSuccess, fetchAllUptimeEndpointsStructuredSuccess, fetchContainerProjectSuccess, fetchContainerSuccess, fetchDatabaseSuccess, fetchDiskSuccess, fetchNetworkSuccess, fetchPartitionSuccess, fetchServerDaemonTokensSuccess, fetchServerStructuredSuccess, fetchServerSuccess, fetchUptimeEndpointSuccess, fetchUserSuccess } from "./actions";
import { cacheResource, cacheResources, INITIAL, reducerFetch, reducerFetchMultiple, ResourceType } from "./util";
/* API */
import { createDatabase, createNetwork, createServer, createServerDaemonToken, createSession, createUptimeEndpoint, createUser, deleteDeamonToken, deleteSession, editDatabase, editNetwork, editServer, editUptimeEndpoint, fetchAllServersStructured, fetchAllUptimeEndpointsStructured, fetchContainer, fetchContainerProject, fetchDatabase, fetchDisk, fetchNetwork, fetchPartition, fetchServer, fetchServerDaemonTokens, fetchServerStructured, fetchUptimeEndpoint, fetchUser } from "../scripts/api/routes";
import { connectWebsocket, DaemonWebsocketMessageType, sendWebsocketMessage } from "../scripts/ws/ws";
import { AppPreferencesTheme } from "../ts/const";

const REDUCERS: Record<string, (state: ReduxState, action: ReduxAction) => any> = {
    FETCH_PREFERENCES: (state: ReduxState): ReduxState => {
        const preferences = INITIAL.preferences;

        const theme = localStorage.getItem("theme");
        if (theme !== null) {
            preferences.theme = theme as AppPreferencesTheme;
        }

        return { ...state, preferences };
    },

    CREATE_USER_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        location.href = "/";
        return cacheResource(state, action.data, ResourceType.USER);
    },

    FETCH_USER_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.USER);
    },

    CREATE_SESSION_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return { ...state, session: action.data };
    },

    DELETE_SESSION: (state: ReduxState): ReduxState => {
        deleteSession();
        return state;
    },

    CREATE_SERVER_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.SERVER);
    },

    EDIT_SERVER_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.SERVER);
    },

    FETCH_SERVER_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.SERVER);
    },

    FETCH_SERVER_STRUCTURED_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.SERVER_STRUCTURED);
    },

    FETCH_ALL_SERVERS_STRUCTURED_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResources(state, action.data, ResourceType.SERVER_STRUCTURED);
    },

    CREATE_NETWORK_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.NETWORK);
    },

    EDIT_NETWORK_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.NETWORK);
    },

    FETCH_NETWORK_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.NETWORK);
    },

    FETCH_DISK_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.DISK);
    },

    FETCH_ALL_DISKS_STRUCTURED_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResources(state, action.data, ResourceType.DISK_STRUCTURED);
    },

    FETCH_PARTITION_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.PARTITION);
    },

    FETCH_CONTAINER_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.CONTAINER);
    },

    FETCH_ALL_CONTAINERS_STRUCTURED_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResources(state, action.data, ResourceType.CONTAINER_STRUCTURED);
    },

    FETCH_CONTAINER_PROJECT_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.CONTAINER_PROJECT);
    },

    CREATE_DATABASE_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.DATABASE);
    },

    FETCH_DATABASE_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.DATABASE);
    },

    CREATE_UPTIME_ENDPOINT_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.UPTIME_ENDPOINT);
    },

    EDIT_UPTIME_ENDPOINT_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.UPTIME_ENDPOINT);
    },

    FETCH_UPTIME_ENDPOINT_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.UPTIME_ENDPOINT);
    },

    FETCH_ALL_UPTIME_ENDPOINTS_STRUCTURED_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResources(state, action.data, ResourceType.UPTIME_ENDPOINT_STRUCTURED);
    },

    FETCH_ALL_DAEMONS_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResources(state, action.data, ResourceType.DAEMON);
    },

    FETCH_SERVER_DAEMON_TOKENS_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResources(state, action.data, ResourceType.DAEMON_TOKEN);
    },

    CREATE_SERVER_DAEMON_TOKEN_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.DAEMON_TOKEN);
    },

    DELETE_DAEMON_TOKEN_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        const daemonTokens = new Map(state.daemonTokens);
        daemonTokens.delete(action.data);
        return { ...state, daemonTokens };
    },
};
const ASYNC_REDUCERS: Record<string, (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction) => Promise<void>> = {
    CREATE_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, createUser, createUserSuccess);
    },

    FETCH_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, fetchUser, fetchUserSuccess);
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
        await reducerFetch(dispatch, action.data, createServer, createServerSuccess);
    },

    EDIT_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, editServer, editServerSuccess);
    },

    FETCH_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, fetchServer, fetchServerSuccess);
    },

    FETCH_SERVER_STRUCTURED: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, fetchServerStructured, fetchServerStructuredSuccess);
    },

    FETCH_ALL_SERVERS_STRUCTURED: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        await reducerFetchMultiple(dispatch, {}, fetchAllServersStructured, fetchAllServersStructuredSuccess);
    },

    CREATE_NETWORK: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, createNetwork, createNetworkSuccess);
    },

    EDIT_NETWORK: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, editNetwork, editNetworkSuccess);
    },

    FETCH_NETWORK: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, fetchNetwork, fetchNetworkSuccess);
    },

    FETCH_DISK: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, fetchDisk, fetchDiskSuccess);
    },

    FETCH_PARTITION: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, fetchPartition, fetchPartitionSuccess);
    },

    FETCH_CONTAINER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, fetchContainer, fetchContainerSuccess);
    },

    FETCH_CONTAINER_PROJECT: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, fetchContainerProject, fetchContainerProjectSuccess);
    },

    FETCH_DATABASE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, fetchDatabase, fetchDatabaseSuccess);
    },

    EDIT_DATABASE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, editDatabase, editDatabaseSuccess);
    },

    CREATE_DATABASE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, createDatabase, createDatabaseSuccess);
    },

    CREATE_UPTIME_ENDPOINT: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, createUptimeEndpoint, createUptimeEndpointSuccess);
    },

    EDIT_UPTIME_ENDPOINT: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, editUptimeEndpoint, editUptimeEndpointSuccess);
    },

    FETCH_UPTIME_ENDPOINT: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, fetchUptimeEndpoint, fetchUptimeEndpointSuccess);
    },

    FETCH_ALL_UPTIME_ENDPOINTS_STRUCTURED: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        await reducerFetchMultiple(dispatch, {}, fetchAllUptimeEndpointsStructured, fetchAllUptimeEndpointsStructuredSuccess);
    },

    CONNECT_WEBSOCKET: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        await connectWebsocket(dispatch);
    },

    DAEMON_REQUEST_RESOURCES: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await sendWebsocketMessage({ type: DaemonWebsocketMessageType.DAEMON_CLIENT_REQUEST_RESOURCES, ...action.data });
    },

    DAEMON_REQUEST_DATABASE_BACKUP: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await sendWebsocketMessage({ type: DaemonWebsocketMessageType.DAEMON_CLIENT_REQUEST_DATABASE_BACKUP, ...action.data });
    },

    CREATE_SERVER_DAEMON_TOKEN: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, createServerDaemonToken, createServerDaemonTokenSuccess);
    },

    DELETE_DAEMON_TOKEN: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const success = await deleteDeamonToken(action.data);
        if (success) {
            dispatch(deleteDaemonTokenSuccess(action.data));
        }
    },

    FETCH_SERVER_DAEMON_TOKENS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, fetchServerDaemonTokens, fetchServerDaemonTokensSuccess);
    },
};

export { REDUCERS, ASYNC_REDUCERS };
