/* Base */
import { h, FunctionalComponent } from "preact";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "../overview/style.scss";
import baseStyle from "../style.scss";
/* Components */
import Button from "../../components/ui/button";
import UptimeEndpoint from "../../components/uptime-endpoint";
import EmptyPanel from "../../components/empty-panel";

const UptimeEndpoints: FunctionalComponent<OverviewConnectedProps> = (props: OverviewConnectedProps) => {
    const uptimeEndpoints = Array.from(props.uptimeEndpoints.values());
    const uptimeEndpointStatistics = Array.from(props.uptimeEndpointStatistics.values());

    return (
        <div className={baseStyle["page-content"]}>
            {uptimeEndpoints.length < 1 ? null : <div class={style["overview-section-items-grid"]}>
                {uptimeEndpoints.map((e, i) => {
                    const statistics = uptimeEndpointStatistics.filter(el => el.parent === e.id);
                    return <UptimeEndpoint key={i} item={{ ...e, statistics }} actions={props.actions} />;
                })}
            </div>}
            {uptimeEndpoints.length > 0 ? null : <EmptyPanel />}
            <div className={style["overview-section-items-actions"]}>
                <Button className={style["overview-section-items-actions-create"]} secondary onClick={() => { location.href = "/create-uptime-endpoint"; }}>
                    Create uptime endpoint
                </Button>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(UptimeEndpoints);
