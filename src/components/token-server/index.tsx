/* Base */
import { h, FunctionalComponent } from "preact";
import { useState } from "react";
import { formatTimestampLong } from "../../scripts/util/util";
/* Styles */
import serverStyle from "../server/style.scss";
import style from "./style.scss";

const TokenServer: FunctionalComponent<TokenServerConnectedProps> = (props: TokenServerConnectedProps) => {
    const [fetchedTokens, setFetchedTokens] = useState(false);

    return (
        <div className={serverStyle.server}>
            <div className={serverStyle["server-header"]}>
                <div className={serverStyle["server-icon"]} style={{ background: `#${props.item.color}` }} />
                <div className={serverStyle["server-name"]} style={{ color: `#${props.item.color}` }}>{props.item.name}</div>
            </div>
            <div className={serverStyle["server-content"]}>
                <div className={style["server-content-token-links"]}>
                    <a className={style["server-content-tokens-fetch"]} onClick={() => { props.actions.fetchServerDaemonTokens(props.item.id); setFetchedTokens(true); }}>Get tokens</a>
                    <a className={style["server-content-tokens-create"]} onClick={() => { props.actions.createServerDaemonToken(props.item.id); }}>Create token</a>
                </div>
                <div className={serverStyle["server-tokens"]}>
                    {props.daemonTokens.map((e, i) => {
                        return <div key={i} className={style["server-token"]}>
                            <div className={style["server-token-header"]}>
                                <div className={style["server-token"]}>{e.id}</div>
                                <a className={style["server-content-tokens-delete"]} onClick={() => { props.actions.deleteDaemonToken(e.id); }}>(Delete)</a>
                            </div>
                            <div className={style["server-token-timestamps"]}>
                                <div className={style["server-token-timestamp"]}>Created - <span className={style["server-token-timestamp-highlight"]}>{formatTimestampLong(e.timestamp)}</span></div>
                                <div className={style["server-token-timestamp"]}>Last used - <span className={style["server-token-timestamp-highlight"]}>{formatTimestampLong(e.used * 1000)}</span></div>
                            </div>
                        </div>;
                    })}
                    {fetchedTokens ? (props.daemonTokens.length > 0 ? null : <div className={style["server-tokens-no-fetch"]}>No tokens...</div>) :
                    <div className={style["server-tokens-no-fetch"]}>Tokens aren't showing up by default, make sure to get them.</div>}
                </div>
            </div>
        </div>
    );
};

export default TokenServer;
