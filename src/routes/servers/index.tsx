/* Base */
import { h, FunctionalComponent } from "preact";
import { getServerConnectedProps } from "../../scripts/util/server";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "../overview/style.scss";
import baseStyle from "../style.scss";
/* Components */
import SmallServer from "../../components/small-server";
import Button from "../../components/ui/button";
import EmptyPanel from "../../components/empty-panel";

const Servers: FunctionalComponent<OverviewConnectedProps> = (props: OverviewConnectedProps) => {
    const servers = Array.from(props.servers.values());

    return (
        <div className={baseStyle["page-content"]}>
            {servers.map((e, i) => <SmallServer key={i} {...getServerConnectedProps(e, props)} />)}
            {servers.length > 0 ? null : <EmptyPanel />}
            <div className={style["overview-section-items-actions"]}>
                <Button className={style["overview-section-items-actions-create"]} secondary onClick={() => { location.href = "/create-server"; }}>
                    Create server
                </Button>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Servers);
