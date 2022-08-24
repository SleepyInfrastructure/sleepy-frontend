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

const App: FunctionalComponent<any> = (props: AppConnectedProps) => {
    useEffect(() => {
        props.actions.createSession("token", undefined, undefined);
    }, [true]);

    if(typeof window === "undefined") { return <div />; }
    return (
        <div id="app">
            <Header session={props.session} actions={props.actions} />
            <Router>
                <Home path="/" session={props.session} servers={props.servers} serverConfigs={props.serverConfigs} networks={props.networks} disks={props.disks} partitions={props.partitions} containers={props.containers} databases={props.databases} daemons={props.daemons} statistics={props.statistics} diskStatistics={props.diskStatistics} actions={props.actions} />
                <Login path="/login" actions={props.actions} />
                <Register path="/register" actions={props.actions} />
                <Settings path="/settings" session={props.session} users={props.users} servers={props.servers} networks={props.networks} actions={props.actions} />
                <Tokens path="/tokens" session={props.session} servers={props.servers} daemonTokens={props.daemonTokens} actions={props.actions} />
                <CreateServer path="/create-server" servers={props.servers} actions={props.actions} />
                <Server path="/server/:id" session={props.session} servers={props.servers} serverConfigs={props.serverConfigs} networks={props.networks} disks={props.disks} partitions={props.partitions} containers={props.containers} databases={props.databases} daemons={props.daemons} statistics={props.statistics} diskStatistics={props.diskStatistics} actions={props.actions} />
                <InstallingDaemon path="/installing-daemon/:id" session={props.session} servers={props.servers} daemonTokens={props.daemonTokens} actions={props.actions} />
            </Router>
        </div>
    );
};
App.displayName = "App";

export default connect(mapState, mapDispatch(actions))(App);
