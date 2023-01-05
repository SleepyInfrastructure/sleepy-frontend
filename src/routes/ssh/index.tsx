/* Base */
import { h, FunctionalComponent } from "preact";
import { useCallback, useEffect, useRef, useState } from "react";
import { hostSatisfies } from "../../scripts/util/satisfy";
/* X-Term */
import XTerm from "../../scripts/xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { WebLinksAddon } from "xterm-addon-web-links";
import { CanvasAddon } from "xterm-addon-canvas";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import formStyle from "../form.scss";
import style from "./style.scss";
import Button from "../../components/ui/button";
import FormRowButton from "../../components/ui/form-row-button";
/* Components */

const SSH: FunctionalComponent<SSHConnectedProps> = (props: SSHConnectedProps) => {
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);

    const [host, setHost] = useState("localhost");
    const [port, setPort] = useState(22);
    const [username, setUsername] = useState("root");
    const [password, setPassword] = useState("root");
    const portSatisfies = useCallback(() => {
        return port >= 1 && port <= 65535 ? "(satisfies)" : "(not in range)";
    }, [port]);
    const usernameSatisfies = useCallback(() => {
        return username.length < 1 ? "(is empty)" : "(satisfies)";
    }, [username.length]);

    useEffect(() => {
        setSatisfies(hostSatisfies(host) === "(satisfies)" && portSatisfies() === "(satisfies)" && usernameSatisfies() === "(satisfies)");
    }, [hostSatisfies, portSatisfies, usernameSatisfies]);
    if(!didSetDefaults) {
        setHost(props.host);
        setUsername(props.username);
        setDidSetDefaults(true);
    }

    /* XTerm hooks */
    const xtermRef = useRef<XTerm>(null);
    const [addons, setAddons] = useState([new FitAddon(), new SearchAddon(), new WebLinksAddon()]);
    useEffect(() => {
        if(addons.length <= 3) {
            setAddons([...addons, new CanvasAddon()]);
        }
    }, [xtermRef]);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-auth"]} />
                <div className={baseStyle["page-title"]}>SSH</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Host: </div>
                    <input className={formStyle["page-form-input"]} placeholder="localhost..." onInput={(e) => { setHost(e.currentTarget.value); }} value={host} />
                    <div className={formStyle["page-form-error"]} data={hostSatisfies(host) === "(satisfies)" ? "false" : "true"}>{hostSatisfies(host)}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Port: </div>
                    <input className={formStyle["page-form-input"]} placeholder="22..." onInput={(e) => { setPort(parseInt(e.currentTarget.value, 10)); }} value={port} type="number" />
                    <div className={formStyle["page-form-error"]} data={portSatisfies() === "(satisfies)" ? "false" : "true"}>{portSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Username: </div>
                    <input className={formStyle["page-form-input"]} placeholder="..." onInput={(e) => { setUsername(e.currentTarget.value); }} value={username} />
                    <div className={formStyle["page-form-error"]} data={usernameSatisfies() === "(satisfies)" ? "false" : "true"}>{usernameSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Password: </div>
                    <input className={formStyle["page-form-input"]} placeholder="..." onInput={(e) => { setPassword(e.currentTarget.value); }} value={password} type="password" />
                    <div className={formStyle["page-form-error"]} data={"false"}>(satisfies)</div>
                </div>
                <FormRowButton name="Connect!" satisfies={satisfies} onClick={() => {
                    //
                }} />
            </div>
            <XTerm className={style["log-view-terminal"]} addons={addons} ref={xtermRef} options={{ cursorBlink: true, allowProposedApi: true }} />
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(SSH);
