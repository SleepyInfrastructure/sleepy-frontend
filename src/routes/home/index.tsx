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
/* Components */
import SmallServer from "../../components/small-server";
import Button from "../../components/ui/button";
import { getServerConnectedProps } from "../../scripts/util/util";
import UptimeEndpoint from "../../components/uptime-endpoint";

const Home: FunctionalComponent<HomeConnectedProps> = (props: HomeConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
            props.actions.fetchAllDisksStructured();
            props.actions.fetchAllContainersStructured();
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
                    <div className={baseStyle["page-title-wrapper"]}>
                        <div className={style["server-icon"]} />
                        <div className={baseStyle["page-title"]}>Servers</div>
                    </div>
                    <div class={style["home-section-items"]}>
                        {servers.map((e, i) => <SmallServer key={i} {...getServerConnectedProps(e, props)} />)}
                        <div className={style["home-section-items-actions"]}>
                            <Button className={style["home-section-items-actions-create"]} secondary onClick={() => { location.href = "/create-server"; }}>
                                Create server
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={style["home-section"]}>
                    <div className={baseStyle["page-title-wrapper"]}>
                        <div className={style["endpoint-icon"]} />
                        <div className={baseStyle["page-title"]}>Uptime Endpoints</div>
                    </div>
                    <div class={style["home-section-items"]}>
                        <div class={style["home-section-items-grid"]}>
                            {uptimeEndpoints.map((e, i) => {
                                const statistics = uptimeEndpointStatistics.filter(el => el.parent === e.id);
                                return <UptimeEndpoint key={i} item={{ ...e, statistics }} actions={props.actions} />;
                            })}
                        </div>
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
