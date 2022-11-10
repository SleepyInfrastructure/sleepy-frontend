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
import SmallPublicServer from "../../components/small-public-server";
import EmptyPanel from "../../components/empty-panel";

const PublicServers: FunctionalComponent<PublicServersConnectedProps> = (props: PublicServersConnectedProps) => {
    useEffect(() => {
        props.actions.fetchPublicServerListings();
    }, [props.actions]);
    useEffect(() => {
        console.log(props.publicServerListings);
        const listings = Array.from(props.publicServerListings.values());
        for(let i = 0; i < 5 && i < listings.length; i++) {
            props.actions.fetchPublicServer(listings[i].id);
        }
    }, [props.actions, props.publicServerListings]);
    const servers = Array.from(props.publicServers.values());
    const serverStatistics = Array.from(props.statistics.values());
    
    return (
        <div className={style["public-servers-content"]}>
            <div className={style["public-servers-section"]}>
                <div className={style["home-title"]}>
                    Public dashboards
                </div>
                <div className={style["public-servers-section-items"]}>
                    {servers.map((e, i) => {
                        const statistics = serverStatistics.filter(el => el.server === e.id);
                        return statistics.length === 0 ? null : <SmallPublicServer key={i} item={e} statistics={statistics} actions={props.actions} />;
                    })}
                    {servers.length > 0 ? null : <EmptyPanel />}
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(PublicServers);
