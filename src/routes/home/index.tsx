/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { getServerConnectedProps } from "../../scripts/util/server";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import SmallServer from "../../components/small-server";
import Button from "../../components/ui/button";
import UptimeEndpoint from "../../components/uptime-endpoint";
import EmptyPanel from "../../components/empty-panel";

const Home: FunctionalComponent<HomeConnectedProps> = (props: HomeConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
            props.actions.fetchAllUptimeEndpointsStructured();
            props.actions.connectWebsocket();
        }
    }, [props.session]);
    const servers = Array.from(props.servers.values());
    const uptimeEndpoints = Array.from(props.uptimeEndpoints.values());
    const uptimeEndpointStatistics = Array.from(props.uptimeEndpointStatistics.values());

    return (
        <div class={baseStyle.page}>
            <div className={style["home-content"]}>
                <div className={style["home-section"]}>
                    <div className={baseStyle["page-header"]}>
                        <div className={style["server-icon"]} />
                        <div className={baseStyle["page-title"]}>Servers</div>
                    </div>
                    <div class={style["home-section-items"]}>
                        {servers.map((e, i) => <SmallServer key={i} {...getServerConnectedProps(e, props)} />)}
                        {servers.length > 0 ? null : <EmptyPanel />}
                        <div className={style["home-section-items-actions"]}>
                            <Button className={style["home-section-items-actions-create"]} secondary onClick={() => { location.href = "/create-server"; }}>
                                Create server
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={style["home-section"]}>
                    <div className={baseStyle["page-header"]}>
                        <div className={style["icon-endpoint"]} />
                        <div className={baseStyle["page-title"]}>Uptime Endpoints</div>
                    </div>
                    <div class={style["home-section-items"]}>
                        {uptimeEndpoints.length < 1 ? null : <div class={style["home-section-items-grid"]}>
                            {uptimeEndpoints.map((e, i) => {
                                const statistics = uptimeEndpointStatistics.filter(el => el.parent === e.id);
                                return <UptimeEndpoint key={i} item={{ ...e, statistics }} actions={props.actions} />;
                            })}
                        </div>}
                        {uptimeEndpoints.length > 0 ? null : <EmptyPanel />}
                        <div className={style["home-section-items-actions"]}>
                            <Button className={style["home-section-items-actions-create"]} secondary onClick={() => { location.href = "/create-uptime-endpoint"; }}>
                                Create uptime endpoint
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Home);
