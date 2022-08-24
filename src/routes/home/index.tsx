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

const Home: FunctionalComponent<HomeConnectedProps> = (props: HomeConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
            props.actions.fetchAllDisksStructured();
            props.actions.connectWebsocket();
        }
    }, [props.session]);
    const servers = Array.from(props.servers.values());

    return (
        <div class={baseStyle.page}>
            <div className={baseStyle["page-content"]}>
                <div className={baseStyle["page-title-wrapper"]}>
                    <div className={style["server-icon"]} />
                    <div className={baseStyle["page-title"]}>Servers</div>
                </div>
                <div class={style["home-servers"]}>
                    {servers.map((e, i) => <SmallServer key={i} {...getServerConnectedProps(e, props)} />)}
                    <div className={style["home-servers-actions"]}>
                        <Button className={style["home-servers-actions-create"]} secondary onClick={() => { location.href = "/create-server"; }}>
                            Create server
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Home);
