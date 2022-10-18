/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";
import baseStyle from "../style.scss";
/* Components */
import TokenServer from "../../components/token-server";

const Tokens: FunctionalComponent<TokensConnectedProps> = (props: TokensConnectedProps) => {
    const servers = Array.from(props.servers.values());
    const daemonTokens = Array.from(props.daemonTokens.values());

    return (
        <div class={baseStyle.page}>
            <div className={baseStyle["page-content"]}>
                <div className={baseStyle["page-header"]}>
                    <div className={style["icon-token"]} />
                    <div className={baseStyle["page-title"]}>Tokens</div>
                </div>
                <div class={style["tokens-content"]}>
                    {servers.map((e, i) => {
                        const serverDaemonTokens = daemonTokens.filter(el => el.server === e.id);
                        return <TokenServer key={i} item={e} daemonTokens={serverDaemonTokens} actions={props.actions} />
                    })}
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Tokens);
