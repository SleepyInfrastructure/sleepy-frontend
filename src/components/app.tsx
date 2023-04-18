/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useState } from "react";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../redux/util";
import * as actions from "../redux/actions";
/* Components */
import Header from "./header";
import Sidebar from "./sidebar";
import AppRouter from "./router";
/* Styles */
import pageStyle from "../routes/style.scss";
import * as dark from "../style/themes/dark";
import * as light from "../style/themes/light";

const App: FunctionalComponent<any> = (props: AppConnectedProps) => {
    const [ruleID, setRuleID] = useState(-1);

    // API calls
    useEffect(() => {
        props.actions.fetchPreferences();
        props.actions.createSession("token");
    }, [props.actions]);
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
            props.actions.fetchAllUptimeEndpointsStructured();
            props.actions.fetchAllAlerts();
            props.actions.fetchAllTasks();
            props.actions.connectWebsocket();
        }
    }, [props.actions, props.session]);

    // Preferences
    useEffect(() => {
        localStorage.setItem("theme", props.preferences.theme.toString());
    }, [props.preferences]);

    // Themes
    useEffect(() => {
        const item = document.styleSheets.item(0);
        if (item === null) {
            return;
        }
        if (ruleID !== -1) {
            item.deleteRule(ruleID);
        }

        switch (props.preferences.theme) {
            case "dark":
                setRuleID(item.insertRule(dark.default));
                break;

            case "light":
                setRuleID(item.insertRule(light.default));
                break;
        }
    }, [props.preferences.theme]);
    
    // Misc
    const user = props.session === null ? null : props.users.get(props.session.user) ?? null;
    const runTasks = Array.from(props.tasks.values()).filter(e => e.status === "RUNNING").length;

    return (
        <div id="app">
            <Header user={user} actions={props.actions} />
            <div class={pageStyle.page}>
                <Sidebar user={user} servers={props.servers} uptimeEndpoints={props.uptimeEndpoints} alerts={props.alerts.size} tasks={runTasks} actions={props.actions} />
                <AppRouter {...props} />
            </div>
        </div>
    );
};
App.displayName = "App";

export default connect(mapState, mapDispatch(actions))(App);
