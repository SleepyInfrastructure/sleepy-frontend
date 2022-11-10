/* Base */
import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router/match";
/* Styles */
import style from "./style.scss";
import overviewStyle from "../../routes/overview/style.scss";
import serverStyle from "../server/style.scss";
import endpointStyle from "../uptime-endpoint/style.scss";

const Sidebar: FunctionalComponent<SidebarConnectedProps> = (props: SidebarConnectedProps) => {
    return (
        <div className={style.sidebar}>
            <Link className={style["sidebar-item"]} activeClassName={style["sidebar-item-active"]} href="/overview">
                <div className={overviewStyle["icon-overview"]} style={{ transform: "scale(0.75)", marginRight: 5 }} />
                Overview
            </Link>
            <Link className={style["sidebar-item"]} activeClassName={style["sidebar-item-active"]} href="/servers">
                <div className={serverStyle["icon-servers"]} style={{ transform: "scale(0.75)", marginRight: 5 }} />
                Servers
            </Link>
            <Link className={style["sidebar-item"]} activeClassName={style["sidebar-item-active"]} href="/uptime-endpoints">
                <div className={endpointStyle["icon-endpoint"]} style={{ transform: "scale(0.75)", marginRight: 5 }} />
                Endpoints
            </Link>
            {Array.from(props.servers.values()).map((e, i) => {
                return <Link key={i} className={style["sidebar-item"]} activeClassName={style["sidebar-item-active"]} href={`/server/${e.id}`}>
                    <div className={serverStyle["icon-server"]} style={{ transform: "scale(0.75)", marginRight: 5 }} />
                    {e.name}
                </Link>
            })}
        </div>
    );
};

export default Sidebar;
