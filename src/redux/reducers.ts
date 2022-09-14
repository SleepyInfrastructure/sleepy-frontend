/* Redux */
import { Dispatch } from "redux";
/* Redux */
import * as actions from "./actions";
import { cacheResource, cacheResources, INITIAL, reducerDelete, reducerFetch, reducerFetchMultiple, ResourceType } from "./util";
/* API */
import * as routes from "../scripts/api/routes";
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
        routes.deleteSession();
        return state;
    },

    CREATE_SERVER_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.SERVER);
    },

    EDIT_SERVER_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.SERVER);
    },

    DELETE_SERVER_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        const resources = new Map(state.servers);
        resources.delete(action.data);
        return { ...state, servers: resources };
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

    DELETE_DATABASE_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        const resources = new Map(state.databases);
        resources.delete(action.data);
        return { ...state, databases: resources };
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

    DELETE_UPTIME_ENDPOINT_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        const resources = new Map(state.uptimeEndpoints);
        resources.delete(action.data);
        return { ...state, uptimeEndpoints: resources };
    },

    FETCH_UPTIME_ENDPOINT_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.UPTIME_ENDPOINT);
    },

    FETCH_ALL_UPTIME_ENDPOINTS_STRUCTURED_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResources(state, action.data, ResourceType.UPTIME_ENDPOINT_STRUCTURED);
    },

    DELETE_TASK_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        const resources = new Map(state.tasks);
        resources.delete(action.data);
        return { ...state, tasks: resources };
    },

    FETCH_TASK_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.TASK);
    },

    FETCH_ALL_TASKS_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResources(state, action.data, ResourceType.TASK);
    },

    FETCH_USER_FILE_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.USER_FILE);
    },

    FETCH_ALL_DAEMONS_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        state.daemons = new Map();
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

    ADD_CONTAINER_LOG: (state: ReduxState, action: ReduxAction): ReduxState => {
        const containerLogs = new Map(state.containerLogs);
        if(!containerLogs.has(action.data.id)) {
            containerLogs.set(action.data.id, []);
        }
        containerLogs.get(action.data.id)?.push(action.data.message);
        return { ...state, containerLogs };
    },
};
const ASYNC_REDUCERS: Record<string, (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction) => Promise<void>> = {
    CREATE_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createUser, actions.createUserSuccess);
    },

    FETCH_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchUser, actions.fetchUserSuccess);
    },

    CREATE_SESSION: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const session = await routes.createSession(action.data.type, action.data.username, action.data.password);
        if (session === undefined) {
            return;
        }
        const user = await routes.fetchUser(session.user);
        if (user === undefined) {
            return;
        }

        dispatch(actions.createSessionSuccess(action.data));
        dispatch(actions.fetchUserSuccess(user));
    },

    CREATE_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createServer, actions.createServerSuccess);
    },

    EDIT_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.editServer, actions.editServerSuccess);
    },

    DELETE_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerDelete(dispatch, action.data, routes.deleteServer, actions.deleteServerSuccess);
    },

    FETCH_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchServer, actions.fetchServerSuccess);
    },

    FETCH_SERVER_STRUCTURED: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchServerStructured, actions.fetchServerStructuredSuccess);
    },

    FETCH_ALL_SERVERS_STRUCTURED: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        await reducerFetchMultiple(dispatch, {}, routes.fetchAllServersStructured, actions.fetchAllServersStructuredSuccess);
    },

    CREATE_NETWORK: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createNetwork, actions.createNetworkSuccess);
    },

    EDIT_NETWORK: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.editNetwork, actions.editNetworkSuccess);
    },

    FETCH_NETWORK: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchNetwork, actions.fetchNetworkSuccess);
    },

    FETCH_DISK: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchDisk, actions.fetchDiskSuccess);
    },

    FETCH_PARTITION: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchPartition, actions.fetchPartitionSuccess);
    },

    FETCH_CONTAINER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchContainer, actions.fetchContainerSuccess);
    },

    FETCH_CONTAINER_PROJECT: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchContainerProject, actions.fetchContainerProjectSuccess);
    },

    FETCH_DATABASE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchDatabase, actions.fetchDatabaseSuccess);
    },

    EDIT_DATABASE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.editDatabase, actions.editDatabaseSuccess);
    },

    DELETE_DATABASE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerDelete(dispatch, action.data, routes.deleteDatabase, actions.deleteDatabaseSuccess);
    },

    CREATE_DATABASE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createDatabase, actions.createDatabaseSuccess);
    },

    CREATE_UPTIME_ENDPOINT: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createUptimeEndpoint, actions.createUptimeEndpointSuccess);
    },

    EDIT_UPTIME_ENDPOINT: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.editUptimeEndpoint, actions.editUptimeEndpointSuccess);
    },

    DELETE_UPTIME_ENDPOINT: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerDelete(dispatch, action.data, routes.deleteUptimeEndpoint, actions.deleteUptimeEndpointSuccess);
    },

    FETCH_UPTIME_ENDPOINT: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchUptimeEndpoint, actions.fetchUptimeEndpointSuccess);
    },

    FETCH_ALL_UPTIME_ENDPOINTS_STRUCTURED: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        await reducerFetchMultiple(dispatch, {}, routes.fetchAllUptimeEndpointsStructured, actions.fetchAllUptimeEndpointsStructuredSuccess);
    },

    DELETE_TASK: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerDelete(dispatch, action.data, routes.deleteTask, actions.deleteTaskSuccess);
    },

    FETCH_TASK: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchTask, actions.fetchTaskSuccess);
    },

    FETCH_ALL_TASKS: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        await reducerFetchMultiple(dispatch, {}, routes.fetchAllTasks, actions.fetchAllTasksSuccess);
    },

    FETCH_USER_FILE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchUserFile, actions.fetchUserFileSuccess);
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

    DAEMON_REQUEST_CONTAINER_LOG: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await sendWebsocketMessage({ type: DaemonWebsocketMessageType.DAEMON_CLIENT_REQUEST_CONTAINER_LOG, ...action.data });
    },

    DAEMON_CONNECT_CONTAINER_LOG: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await sendWebsocketMessage({ type: DaemonWebsocketMessageType.DAEMON_CLIENT_CONNECT_CONTAINER_LOG, ...action.data });
    },

    CREATE_SERVER_DAEMON_TOKEN: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createServerDaemonToken, actions.createServerDaemonTokenSuccess);
    },

    DELETE_DAEMON_TOKEN: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const success = await routes.deleteDeamonToken(action.data);
        if (success) {
            dispatch(actions.deleteDaemonTokenSuccess(action.data));
        }
    },

    FETCH_SERVER_DAEMON_TOKENS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchServerDaemonTokens, actions.fetchServerDaemonTokensSuccess);
    },
};

export { REDUCERS, ASYNC_REDUCERS };
