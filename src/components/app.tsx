/* Base */
import { h, FunctionalComponent } from "preact";
import { Router } from "preact-router";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../redux/util";
import * as actions from "../redux/actions";
/* Components */
import Header from "./header";
import Home from "../routes/home";
import PublicServers from "../routes/public-servers";
import Overview from "../routes/overview";
import Alerts from "../routes/alerts";
import Tasks from "../routes/tasks";
import Settings from "../routes/settings";
import { useEffect, useState } from "react";
import Tokens from "../routes/tokens";
import Login from "../routes/login";
import Register from "../routes/register";
import Server from "../routes/server";
import Container from "../routes/container";
import ContainerProject from "../routes/container-project";
import InstallingDaemon from "../routes/installing-daemon";
import CreateServer from "../routes/create-server";
import EditServer from "../routes/edit-server";
import CreateDatabase from "../routes/create-database";
import CreateSmbInstance from "../routes/create-smb-instance";
import EditSmbInstance from "../routes/edit-smb-instance";
import CreateSmbShare from "../routes/create-smb-share";
import EditSmbShare from "../routes/edit-smb-share";
import CreateSmbUser from "../routes/create-smb-user";
import EditSmbUser from "../routes/edit-smb-user";
import CreateUptimeEndpoint from "../routes/create-uptime-endpoint";
import EditUptimeEndpoint from "../routes/edit-uptime-endpoint";
// Themes
import * as dark from "../style/themes/dark";
import * as light from "../style/themes/light";
import EditNetwork from "../routes/edit-network";
import ServerMap from "../routes/server-map";

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
    const runTasks = Array.from(props.tasks.values()).filter(e => e.status === "RUNNING").length;

    return (
        <div id="app">
            <Header session={props.session} alerts={props.alerts.size} tasks={runTasks} actions={props.actions} />
            <Router>
                <Home path="/" {...props} />
                <PublicServers path="/public-dashboards" session={props.session} publicServers={props.publicServers} publicServerListings={props.publicServerListings} statistics={props.statistics} actions={props.actions} />
                <Overview path="/overview" {...props} />
                <Login path="/login" session={props.session} actions={props.actions} />
                <Register path="/register" session={props.session} actions={props.actions} />
                <Alerts path="/alerts" {...props} />
                <Tasks path="/tasks" {...props} />
                <Settings path="/settings" session={props.session} actions={props.actions} />
                <Tokens path="/tokens" session={props.session} servers={props.servers} daemonTokens={props.daemonTokens} actions={props.actions} />
                <CreateServer path="/create-server" session={props.session} servers={props.servers} actions={props.actions} />
                <EditServer path="/edit-server/:id" session={props.session} servers={props.servers} actions={props.actions} />
                <Server path="/server/:id" {...props} />
                <ServerMap path="/server/:id/map" {...props} />
                <Container path="/container/:id" {...props} />
                <ContainerProject path="/container-project/:id" {...props} />
                <InstallingDaemon path="/installing-daemon/:id" session={props.session} servers={props.servers} daemonTokens={props.daemonTokens} actions={props.actions} />
                <CreateUptimeEndpoint path="/create-uptime-endpoint" session={props.session} uptimeEndpoints={props.uptimeEndpoints} actions={props.actions} />
                <EditUptimeEndpoint path="/edit-uptime-endpoint/:id" session={props.session} uptimeEndpoints={props.uptimeEndpoints} actions={props.actions} />
                <EditNetwork path="/edit-network/:id" session={props.session} networks={props.networks} actions={props.actions} />
                <CreateDatabase path="/create-database/:id" session={props.session} databases={props.databases} actions={props.actions} />
                <CreateSmbInstance path="/create-smb-instance/:id" session={props.session} smbInstances={props.smbInstances} actions={props.actions} />
                <EditSmbInstance path="/edit-smb-instance/:id" session={props.session} smbInstances={props.smbInstances} actions={props.actions} />
                <CreateSmbShare path="/create-smb-share/:id" session={props.session} smbShares={props.smbShares} smbUsers={props.smbUsers} actions={props.actions} />
                <EditSmbShare path="/edit-smb-share/:id" session={props.session} smbShares={props.smbShares} smbUsers={props.smbUsers} actions={props.actions} />
                <CreateSmbUser path="/create-smb-user/:id" session={props.session} smbUsers={props.smbUsers} actions={props.actions} />
                <EditSmbUser path="/edit-smb-user/:id" session={props.session} smbUsers={props.smbUsers} actions={props.actions} />
            </Router>
        </div>
    );
};
App.displayName = "App";

export default connect(mapState, mapDispatch(actions))(App);
