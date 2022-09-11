/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
import TokenServer from "../../components/token-server";

const InstallingDaemon: FunctionalComponent<InstallingDaemonConnectedProps> = (props: InstallingDaemonConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
        }
    }, [props.session]);
    if(props.id === undefined) {
        return null;
    }
    const server = props.servers.get(props.id);
    if(server === undefined) {
        return null;
    }
    const daemonTokens = Array.from(props.daemonTokens.values()).filter(e => e.server === server.id);

    return <div class={baseStyle.page}>
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["server-icon"]} />
                <div className={baseStyle["page-title"]}>Installing the daemon</div>
            </div>
            <div className={style["installing-daemon-instructions"]}>
                <div className={style["installing-daemon-instruction"]}>1) <span className={style["installing-daemon-instruction-highlight"]}>
                    Clone the <span className={style["installing-daemon-instruction-link"]} onClick={() => { window.open("https://github.com/SleepyInfrastructure/sleepy-daemon", "null"); }}>daemon repository</span> into <span className={style["installing-daemon-instruction-code"]}>/opt/sleepy-daemon</span> on your server.
                    </span>
                </div>
                <div className={style["installing-daemon-instruction"]}>2) <span className={style["installing-daemon-instruction-highlight"]}>
                    Run <span className={style["installing-daemon-instruction-code"]}>/app/build-xxx.sh</span> to build the daemon.
                    </span>
                </div>
                <div className={style["installing-daemon-instruction"]}>3) <span className={style["installing-daemon-instruction-highlight"]}>
                    Copy <span className={style["installing-daemon-instruction-code"]}>/misc/config-example.json</span> into <span className={style["installing-daemon-instruction-code"]}>/config/current.json</span>.
                    </span>
                </div>
                <div className={style["installing-daemon-instruction"]}>4) <span className={style["installing-daemon-instruction-highlight"]}>
                    Create or copy a token from the panel below.
                    </span>
                </div>
                <TokenServer item={server} daemonTokens={daemonTokens} actions={props.actions} />
                <div className={style["installing-daemon-instruction"]}>5) <span className={style["installing-daemon-instruction-highlight"]}>
                    Replace the token in your config with the one you copied.
                    </span>
                </div>
                <div className={style["installing-daemon-instruction"]}>6) <span className={style["installing-daemon-instruction-highlight"]}>
                    Replace the host with <span className={style["installing-daemon-instruction-code"]}>sleepy.lamkas.dev</span>.
                    </span>
                </div>
                <div className={style["installing-daemon-instruction"]}>7) <span className={style["installing-daemon-instruction-highlight"]}>
                    Run <span className={style["installing-daemon-instruction-code"]}>launch-xxx.sh</span> to run the daemon.
                    </span>
                </div>
            </div>
        </div>
    </div>;
};

export default connect(mapState, mapDispatch(actions))(InstallingDaemon);
