/* Base */
import { h, FunctionalComponent } from "preact";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
import TokenServer from "../../components/token-server";

const InstallingDaemon: FunctionalComponent<InstallingDaemonConnectedProps> = (props: InstallingDaemonConnectedProps) => {
    if(props.id === undefined) {
        return null;
    }
    const server = props.servers.get(props.id);
    if(server === undefined) {
        return null;
    }
    const daemonTokens = Array.from(props.daemonTokens.values()).filter(e => e.server === server.id);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-server"]} />
                <div className={baseStyle["page-title"]}>Installing the daemon</div>
            </div>
            <div className={style["installing-daemon-instructions"]}>
                <div className={style["installing-daemon-instruction"]}>1) <span className={style["installing-daemon-instruction-highlight"]}>
                    Clone the <a href="https://github.com/SleepyInfrastructure/sleepy-daemon" className={style["installing-daemon-instruction-link"]}>daemon repository</a> into <span className={style["installing-daemon-instruction-code"]}>/opt/sleepy-daemon/dev</span> on your server.
                    </span>
                </div>
                <div className={style["installing-daemon-instruction"]}>2) <span className={style["installing-daemon-instruction-highlight"]}>
                    Run <span className={style["installing-daemon-instruction-code"]}>scripts/build-xxx.sh</span> to build the daemon.
                    </span>
                </div>
                <div className={style["installing-daemon-instruction"]}>3) <span className={style["installing-daemon-instruction-highlight"]}>
                    Copy <span className={style["installing-daemon-instruction-code"]}>misc/config-example.json</span> into <span className={style["installing-daemon-instruction-code"]}>/opt/sleepy-daemon/config/current.json</span>.
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
                    Make sure the hosts are setup correctly, leaving out only <span className={style["installing-daemon-instruction-code"]}>sleepy.lamkas.dev</span> ones.
                    </span>
                </div>
                <div className={style["installing-daemon-instruction"]}>7) <span className={style["installing-daemon-instruction-highlight"]}>
                    Copy <span className={style["installing-daemon-instruction-code"]}>misc/service-xxx.sh</span> into <span className={style["installing-daemon-instruction-code"]}>/opt/sleepy-daemon</span>.
                    </span>
                </div>
                <div className={style["installing-daemon-instruction"]}>8) <span className={style["installing-daemon-instruction-highlight"]}>
                    Run <span className={style["installing-daemon-instruction-code"]}>service-xxx.sh</span> to run the daemon.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(InstallingDaemon);
