/* Base */
import { h, FunctionalComponent } from "preact";
import { useState } from "react";
import { formatTimestampLong } from "../../scripts/util/util";
/* Styles */
import baseStyle from "../style.scss";
import serverStyle from "../server/style.scss";
import style from "./style.scss";

const TokenServer: FunctionalComponent<TokenServerConnectedProps> = (props: TokenServerConnectedProps) => {
    const [fetchedTokens, setFetchedTokens] = useState(false);

    return (
        <div className={baseStyle.panel} data="big">
            <div className={baseStyle["panel-header"]}>
                <div className={serverStyle["server-icon"]} style={{ background: `#${props.item.color}` }} />
                <div className={baseStyle["panel-name"]} style={{ color: `#${props.item.color}` }}>{props.item.name}</div>
            </div>
            <div className={style["token-server-content"]}>
                <div className={style["token-server-links"]}>
                    <a className={style["token-server-fetch"]} onClick={() => { props.actions.fetchServerDaemonTokens(props.item.id); setFetchedTokens(true); }}>Get tokens</a>
                    <a className={style["token-server-create"]} onClick={() => { props.actions.createServerDaemonToken(props.item.id); }}>Create token</a>
                </div>
                <div className={style["token-server-tokens"]}>
                    {props.daemonTokens.map((e, i) => {
                        return <div key={i} className={style["token-server-token"]}>
                            <div className={style["token-server-token-header"]}>
                                <div className={style["token-server-token-token"]}>{e.id}</div>
                                <a className={style["token-server-delete"]} onClick={() => { props.actions.deleteDaemonToken(e.id); }}>(Delete)</a>
                            </div>
                            <div className={style["token-server-token-timestamps"]}>
                                <div className={style["token-server-token-timestamp"]}>Created - <span className={style["token-server-token-timestamp-highlight"]}>{formatTimestampLong(e.timestamp)}</span></div>
                                <div className={style["token-server-token-timestamp"]}>Last used - <span className={style["token-server-token-timestamp-highlight"]}>{formatTimestampLong(e.used * 1000)}</span></div>
                            </div>
                        </div>;
                    })}
                    {fetchedTokens ? (props.daemonTokens.length > 0 ? null : <div className={style["token-server-no-fetch"]}>No tokens...</div>) :
                    <div className={style["token-server-no-fetch"]}>Tokens aren't showing up by default, make sure to click above to get them.</div>}
                </div>
            </div>
        </div>
    );
};

export default TokenServer;
