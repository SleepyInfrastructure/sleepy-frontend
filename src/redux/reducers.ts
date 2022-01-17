/* Redux */
import { Dispatch } from "redux";
/* Types */
import { AuthResult, PreferencesTheme } from "../ts/base";
import { ReduxAction, ReduxState } from "../ts/redux";
/* Redux */
import { cacheResource, ResourceType } from "./util";
import { fetchAllAnimesSuccess, fetchAllEpisodesSuccess, fetchAllGroupsSuccess, fetchAllSegmentsSuccess, fetchAnimeEpisodesSuccess, fetchAnimeSuccess, fetchEpisodeSegmentsSuccess, fetchEpisodeSuccess, fetchGroupSuccess, fetchSegmentSuccess, fetchStatsSuccess, fetchUserSuccess, loginSuccess, registerSuccess, setAuthResult } from "./actions";
// eslint-disable-next-line no-duplicate-imports
import { fetchUser as fetchUserAction, login as loginAction } from "./actions";
/* API */
import { fetchAllAnimes, fetchAllEpisodes, fetchAllGroups, fetchAllSegments, fetchAnime, fetchAnimeEpisodes, fetchEpisode, fetchEpisodeSegments, fetchGroup, fetchSegment, fetchStats, fetchUser, login, loginToken, register } from "../scripts/api/routes";

const REDUCERS: Record<string, (state: ReduxState, action: ReduxAction) => any> = {
    SET_DIMENSIONS: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, dimensions: action.data };
    },

    FETCH_PREFERENCES: (state: ReduxState, action: ReduxAction): any => {
        const preferences = {
            theme: PreferencesTheme.DARK,
            developer: false
        };

        const theme = localStorage.getItem("theme");
        if(theme !== null) {
            preferences.theme = parseInt(theme, 10);
        }

        const developer = localStorage.getItem("developer");
        if(developer !== null) {
            preferences.developer = developer === "true";
        }

        return { ...state, preferences };
    },

    LOGIN_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, session: action.data };
    },

    REGISTER_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.USER);
        return state;
    },

    FETCH_USER_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.USER);
        return state;
    },

    FETCH_ANIME_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.ANIME);
        return state;
    },

    FETCH_ALL_ANIMES_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        for (let i = 0; i < action.data.length; i++) {
            state = cacheResource(state, action.data[i], ResourceType.ANIME);
        }
        return state;
    },

    FETCH_ANIME_EPISODES_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        for (let i = 0; i < action.data.length; i++) {
            state = cacheResource(state, action.data[i], ResourceType.EPISODE);
        }
        return state;
    },

    FETCH_GROUP_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.GROUP);
        return state;
    },

    FETCH_ALL_GROUPS_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        for (let i = 0; i < action.data.length; i++) {
            state = cacheResource(state, action.data[i], ResourceType.GROUP);
        }
        return state;
    },

    FETCH_EPISODE_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.EPISODE);
        return state;
    },

    FETCH_ALL_EPISODES_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        for (let i = 0; i < action.data.length; i++) {
            state = cacheResource(state, action.data[i], ResourceType.EPISODE);
        }
        return state;
    },

    FETCH_EPISODE_SEGMENTS_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        for (let i = 0; i < action.data.length; i++) {
            state = cacheResource(state, action.data[i], ResourceType.SEGMENT);
        }
        return state;
    },

    FETCH_SEGMENT_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.SEGMENT);
        return state;
    },

    FETCH_ALL_SEGMENTS_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        for (let i = 0; i < action.data.length; i++) {
            state = cacheResource(state, action.data[i], ResourceType.SEGMENT);
        }
        return state;
    },

    FETCH_STATS_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, stats: action.data };
    },

    SET_PREFERENCES_THEME: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, preferences: { ...state.preferences, theme: action.data } };
    },

    SET_FILTER_SEARCH_TERM: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, filterData: { ...state.filterData, searchTerm: action.data } };
    },

    SET_FILTER_GENRES: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, filterData: { ...state.filterData, genres: action.data } };
    },

    SET_FILTER_YEAR: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, filterData: { ...state.filterData, year: action.data } };
    },

    SET_FILTER_TYPE: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, filterData: { ...state.filterData, type: action.data } };
    },

    SET_FILTER_STATUS: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, filterData: { ...state.filterData, status: action.data } };
    },

    SET_FILTER_SORT: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, filterData: { ...state.filterData, sort: action.data } };
    },

    SET_FILTER_TAGS: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, filterData: { ...state.filterData, tags: action.data } };
    },

    SET_FILTER_ITEMS: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, filterData: { ...state.filterData, items: action.data } };
    },

    SET_FILTER_GROUP: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, filterData: { ...state.filterData, group: action.data } };
    },

    SET_PLAYER_THEATER: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, playerData: { ...state.playerData, theater: action.data } };
    },

    SET_PLAYER_SUBS: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, playerData: { ...state.playerData, subs: action.data } };
    },

    SET_PLAYER_PRESET: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, playerData: { ...state.playerData, preset: action.data } };
    },

    SET_PLAYER_OP_NOTIFICATION: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, playerData: { ...state.playerData, opNotification: action.data } };
    },

    SET_PLAYER_ED_NOTIFICATION: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, playerData: { ...state.playerData, edNotification: action.data } };
    },

    SET_AUTH_USERNAME: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, authData: { ...state.authData, username: action.data } };
    },

    SET_AUTH_PASSWORD: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, authData: { ...state.authData, password: action.data } };
    },

    SET_AUTH_PASSWORD_2: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, authData: { ...state.authData, password2: action.data } };
    },

    SET_AUTH_RESULT: (state: ReduxState, action: ReduxAction): any => {
        return { ...state, authData: { ...state.authData, result: action.data } };
    },
};
const ASYNC_REDUCERS: Record<string, (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction) => Promise<void>> = {
    LOGIN: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const session = await login(action.data.username, action.data.password);
        if (session === undefined) {
            dispatch(setAuthResult(AuthResult.FAILED_LOGIN));
            return;
        }

        dispatch(loginSuccess(session));
    },

    LOGIN_TOKEN: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const session = await loginToken();
        if (session === undefined) {
            return;
        }

        dispatch(fetchUserAction(session.user));
        dispatch(loginSuccess(session));
    },

    REGISTER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const user = await register(action.data.username, action.data.password);
        if (user === undefined) {
            dispatch(setAuthResult(AuthResult.FAILED_REGISTER));
            return;
        }

        dispatch(loginAction(action.data.username, action.data.password));
        dispatch(registerSuccess(user));
    },
    
    FETCH_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const user = await fetchUser(action.data);
        if (user === undefined) {
            return;
        }

        dispatch(fetchUserSuccess(user));
    },

    FETCH_ANIME: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const anime = await fetchAnime(action.data);
        if (anime === undefined) {
            return;
        }

        dispatch(fetchAnimeSuccess(anime));
    },

    FETCH_ALL_ANIMES: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const animes = await fetchAllAnimes();
        dispatch(fetchAllAnimesSuccess(animes));
    },

    FETCH_ANIME_EPISODES: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const episodes = await fetchAnimeEpisodes(action.data);
        dispatch(fetchAnimeEpisodesSuccess(episodes));
    },

    FETCH_GROUP: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const group = await fetchGroup(action.data);
        if (group === undefined) {
            return;
        }

        dispatch(fetchGroupSuccess(group));
    },

    FETCH_ALL_GROUPS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const groups = await fetchAllGroups();
        dispatch(fetchAllGroupsSuccess(groups));
    },

    FETCH_EPISODE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const episode = await fetchEpisode(action.data);
        if (episode === undefined) {
            return;
        }

        dispatch(fetchEpisodeSuccess(episode));
    },

    FETCH_ALL_EPISODES: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const episodes = await fetchAllEpisodes();
        dispatch(fetchAllEpisodesSuccess(episodes));
    },

    FETCH_SEGMENT: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const segment = await fetchSegment(action.data);
        if (segment === undefined) {
            return;
        }

        dispatch(fetchSegmentSuccess(segment));
    },

    FETCH_ALL_SEGMENTS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const segments = await fetchAllSegments();
        dispatch(fetchAllSegmentsSuccess(segments));
    },

    FETCH_EPISODE_SEGMENTS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const segments = await fetchEpisodeSegments(action.data);
        dispatch(fetchEpisodeSegmentsSuccess(segments));
    },

    FETCH_STATS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const stats = await fetchStats();
        if (stats === undefined) {
            return;
        }

        dispatch(fetchStatsSuccess(stats));
    },
};

export { REDUCERS, ASYNC_REDUCERS };
