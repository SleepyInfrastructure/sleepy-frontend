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
import Settings from "../routes/settings";
import { useEffect } from "react";
import Tokens from "../routes/tokens";
import Login from "../routes/login";
import Register from "../routes/register";
import CreateServer from "../routes/create-server";
import Server from "../routes/server";
import InstallingDaemon from "../routes/installing-daemon";
import EditServer from "../routes/edit-server";
import CreateUptimeEndpoint from "../routes/create-uptime-endpoint";
import EditUptimeEndpoint from "../routes/edit-uptime-endpoint";

const App: FunctionalComponent<any> = (props: AppConnectedProps) => {
    useEffect(() => {
        props.actions.createSession("token", undefined, undefined);
    }, [true]);

    if(typeof window === "undefined") { return <div />; }
    return (
        <div id="app">
            <Header session={props.session} actions={props.actions} />
            <Router>
                <Home path="/" {...props} />
                <Login path="/login" actions={props.actions} />
                <Register path="/register" actions={props.actions} />
                <Settings path="/settings" session={props.session} actions={props.actions} />
                <Tokens path="/tokens" session={props.session} servers={props.servers} daemonTokens={props.daemonTokens} actions={props.actions} />
                <CreateServer path="/create-server" session={props.session} servers={props.servers} actions={props.actions} />
                <EditServer path="/edit-server/:id" session={props.session} servers={props.servers} actions={props.actions} />
                <Server path="/server/:id" {...props} />
                <InstallingDaemon path="/installing-daemon/:id" session={props.session} servers={props.servers} daemonTokens={props.daemonTokens} actions={props.actions} />
                <CreateUptimeEndpoint path="/create-uptime-endpoint" session={props.session} uptimeEndpoints={props.uptimeEndpoints} actions={props.actions} />
                <EditUptimeEndpoint path="/edit-uptime-endpoint/:id" session={props.session} uptimeEndpoints={props.uptimeEndpoints} actions={props.actions} />
            </Router>
        </div>
    );
};
App.displayName = "App";

export default connect(mapState, mapDispatch(actions))(App);
