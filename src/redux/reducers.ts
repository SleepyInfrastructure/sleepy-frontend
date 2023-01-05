/* Redux */
import { Dispatch } from "redux";
/* Redux */
import * as actions from "./actions";
import { cacheResource, cacheResources, INITIAL, reducerDelete, reducerFetch, reducerFetchMultiple, ResourceType } from "./util";
/* API */
import * as routes from "../scripts/api/routes";
import { connectWebsocket, DaemonWebsocketMessageType, sendWebsocketMessage } from "../scripts/ws/ws";

const REDUCERS: Record<string, (state: ReduxState, action: ReduxAction) => any> = {
    FETCH_PREFERENCES: (state: ReduxState): ReduxState => {
        const preferences = INITIAL.preferences;

        const theme = localStorage.getItem("theme");
        if (theme !== null) {
            preferences.theme = theme as "dark" | "light";
        }

        return { ...state, preferences };
    },

    CREATE_USER_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        location.href = "/overview";
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

    FETCH_SERVER_STATISTICS_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResources(state, action.data, ResourceType.STATISTIC);
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

    CREATE_SMB_INSTANCE_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.SMB_INSTANCE);
    },

    FETCH_SMB_INSTANCE_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.SMB_INSTANCE_STRUCTURED);
    },

    CREATE_NGINX_INSTANCE_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.NGINX_INSTANCE);
    },

    FETCH_NGINX_INSTANCE_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.NGINX_INSTANCE_STRUCTURED);
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

    FETCH_ALL_ALERTS_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResources(state, action.data, ResourceType.ALERT);
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

    FETCH_PUBLIC_SERVER_LISTINGS_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResources(state, action.data, ResourceType.PUBLIC_SERVER_LISTING);
    },

    FETCH_PUBLIC_SERVER_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        return cacheResource(state, action.data, ResourceType.PUBLIC_SERVER_STRUCTURED);
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

        dispatch(actions.createSessionSuccess(session));
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

    FETCH_SERVER_STATISTICS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchServerStatistics, actions.fetchServerStatisticsSuccess);
    },

    FETCH_SERVER_STRUCTURED: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchServerStructured, actions.fetchServerStructuredSuccess);
    },

    FETCH_ALL_SERVERS_STRUCTURED: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        await reducerFetchMultiple(dispatch, {}, routes.fetchAllServersStructured, (servers) => {
            for(const server of servers) {
                dispatch(actions.fetchServerStatistics({ id: server.id, type: "hour" }))
                for(const disk of server.disks) {
                    dispatch(actions.fetchDiskStatistics({ id: disk.id, type: "hour" }))
                }
            }

            return actions.fetchAllServersStructuredSuccess(servers);
        });
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

    FETCH_DISK_STATISTICS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchDiskStatistics, actions.fetchDiskStatisticsSuccess);
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

    FETCH_SMB_INSTANCE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchSmbInstance, actions.fetchSmbInstanceSuccess);
    },

    EDIT_SMB_INSTANCE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.editSmbInstance, actions.editSmbInstanceSuccess);
    },

    DELETE_SMB_INSTANCE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerDelete(dispatch, action.data, routes.deleteSmbInstance, actions.deleteSmbInstanceSuccess);
    },

    CREATE_SMB_INSTANCE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createSmbInstance, actions.createSmbInstanceSuccess);
    },

    FETCH_SMB_SHARE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchSmbShare, actions.fetchSmbShareSuccess);
    },

    EDIT_SMB_SHARE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.editSmbShare, actions.editSmbShareSuccess);
    },

    DELETE_SMB_SHARE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerDelete(dispatch, action.data, routes.deleteSmbShare, actions.deleteSmbShareSuccess);
    },

    CREATE_SMB_SHARE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createSmbShare, actions.createSmbShareSuccess);
    },

    FETCH_SMB_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchSmbUser, actions.fetchSmbUserSuccess);
    },

    EDIT_SMB_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.editSmbUser, actions.editSmbUserSuccess);
    },

    DELETE_SMB_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerDelete(dispatch, action.data, routes.deleteSmbUser, actions.deleteSmbUserSuccess);
    },

    CREATE_SMB_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createSmbUser, actions.createSmbUserSuccess);
    },

    FETCH_NGINX_INSTANCE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchNginxInstance, actions.fetchNginxInstanceSuccess);
    },

    EDIT_NGINX_INSTANCE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.editNginxInstance, actions.editNginxInstanceSuccess);
    },

    DELETE_NGINX_INSTANCE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerDelete(dispatch, action.data, routes.deleteNginxInstance, actions.deleteNginxInstanceSuccess);
    },

    CREATE_NGINX_INSTANCE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createNginxInstance, actions.createNginxInstanceSuccess);
    },

    FETCH_NGINX_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchNginxServer, actions.fetchNginxServerSuccess);
    },

    EDIT_NGINX_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.editNginxServer, actions.editNginxServerSuccess);
    },

    DELETE_NGINX_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerDelete(dispatch, action.data, routes.deleteNginxServer, actions.deleteNginxServerSuccess);
    },

    CREATE_NGINX_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createNginxServer, actions.createNginxServerSuccess);
    },

    FETCH_NGINX_LOCATION: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchNginxLocation, actions.fetchNginxLocationSuccess);
    },

    EDIT_NGINX_LOCATION: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.editNginxLocation, actions.editNginxLocationSuccess);
    },

    DELETE_NGINX_LOCATION: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerDelete(dispatch, action.data, routes.deleteNginxLocation, actions.deleteNginxLocationSuccess);
    },

    CREATE_NGINX_LOCATION: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createNginxLocation, actions.createNginxLocationSuccess);
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

    FETCH_ALL_ALERTS: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        await reducerFetchMultiple(dispatch, {}, routes.fetchAllAlerts, actions.fetchAllAlertsSuccess);
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

    DAEMON_REQUEST_CONTAINER_ACTION: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await sendWebsocketMessage({ type: DaemonWebsocketMessageType.DAEMON_CLIENT_REQUEST_CONTAINER_ACTION, ...action.data });
    },

    DAEMON_BUILD_SMB_CONFIG: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await sendWebsocketMessage({ type: DaemonWebsocketMessageType.DAEMON_CLIENT_BUILD_SMB_CONFIG, ...action.data });
    },

    DAEMON_BUILD_NGINX_CONFIG: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await sendWebsocketMessage({ type: DaemonWebsocketMessageType.DAEMON_CLIENT_BUILD_NGINX_CONFIG, ...action.data });
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

    FETCH_PUBLIC_SERVER_LISTINGS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchPublicServerListings, actions.fetchPublicServerListingsSuccess);
    },

    FETCH_PUBLIC_SERVER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchPublicServer, actions.fetchPublicServerSuccess);
    },
};

export { REDUCERS, ASYNC_REDUCERS };
