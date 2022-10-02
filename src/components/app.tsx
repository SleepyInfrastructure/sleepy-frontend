/* Base */
import { h, FunctionalComponent } from "preact";
import { Router } from "preact-router";
import { AppPreferencesTheme } from "../ts/const";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../redux/util";
import * as actions from "../redux/actions";
/* Components */
import Header from "./header";
import Home from "../routes/home";
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

const App: FunctionalComponent<any> = (props: AppConnectedProps) => {
    const [ruleID, setRuleID] = useState(-1);

    // API calls
    useEffect(() => {
        props.actions.fetchPreferences();
        props.actions.createSession("token", undefined, undefined);
    }, [true]);

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
            case AppPreferencesTheme.DARK:
                setRuleID(item.insertRule(dark.default));
                break;

            case AppPreferencesTheme.LIGHT:
                setRuleID(item.insertRule(light.default));
                break;
        }
    }, [props.preferences.theme]);

    return (
        <div id="app">
            <Header session={props.session} actions={props.actions} />
            <Router>
                <Home path="/" {...props} />
                <Login path="/login" session={props.session} actions={props.actions} />
                <Register path="/register" session={props.session} actions={props.actions} />
                <Tasks path="/tasks" {...props} />
                <Settings path="/settings" session={props.session} actions={props.actions} />
                <Tokens path="/tokens" session={props.session} servers={props.servers} daemonTokens={props.daemonTokens} actions={props.actions} />
                <CreateServer path="/create-server" session={props.session} servers={props.servers} actions={props.actions} />
                <EditServer path="/edit-server/:id" session={props.session} servers={props.servers} actions={props.actions} />
                <Server path="/server/:id" {...props} />
                <Container path="/container/:id" {...props} />
                <ContainerProject path="/container-project/:id" {...props} />
                <InstallingDaemon path="/installing-daemon/:id" session={props.session} servers={props.servers} daemonTokens={props.daemonTokens} actions={props.actions} />
                <CreateUptimeEndpoint path="/create-uptime-endpoint" session={props.session} uptimeEndpoints={props.uptimeEndpoints} actions={props.actions} />
                <EditUptimeEndpoint path="/edit-uptime-endpoint/:id" session={props.session} uptimeEndpoints={props.uptimeEndpoints} actions={props.actions} />
                <EditNetwork path="/edit-network/:id" session={props.session} networks={props.networks} actions={props.actions} />
                <CreateDatabase path="/create-database/:id" session={props.session} databases={props.databases} actions={props.actions} />
                <CreateSmbInstance path="/create-smb-instance/:id" session={props.session} smbInstances={props.smbInstances} actions={props.actions} />
                <EditSmbInstance path="/edit-smb-instance/:id" session={props.session} smbInstances={props.smbInstances} actions={props.actions} />
                <CreateSmbShare path="/create-smb-share/:id" session={props.session} smbShares={props.smbShares} actions={props.actions} />
                <EditSmbShare path="/edit-smb-share/:id" session={props.session} smbShares={props.smbShares} actions={props.actions} />
                <CreateSmbUser path="/create-smb-user/:id" session={props.session} smbUsers={props.smbUsers} actions={props.actions} />
                <EditSmbUser path="/edit-smb-user/:id" session={props.session} smbUsers={props.smbUsers} actions={props.actions} />
            </Router>
        </div>
    );
};
App.displayName = "App";

export default connect(mapState, mapDispatch(actions))(App);
