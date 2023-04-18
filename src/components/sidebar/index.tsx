/* Base */
import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router/match";
/* Styles */
import style from "./style.scss";
import overviewStyle from "../../routes/overview/style.scss";
import alertStyle from "../alert/style.scss";
import taskStyle from "../task/style.scss";
import tokenStyle from "../token-server/style.scss";
import serverStyle from "../server/style.scss";
import endpointStyle from "../uptime-endpoint/style.scss";

const Sidebar: FunctionalComponent<SidebarConnectedProps> = (props: SidebarConnectedProps) => {
    const icon = <div className={style["sidebar-header"]} onClick={() => { location.href = "/"; }}>
        <img alt="logo" className={style["sidebar-icon"]} src="/assets/icons/icon-32x32.webp" />
        <h1 className={style["sidebar-title"]}>Sleepy</h1>
    </div>;

    return (
        props.user === null ?
        <div className={style.sidebar}>
            {icon}
            <Link className={style["sidebar-item"]} style={{ pointerEvents: "none" }}>
                <div className={tokenStyle["icon-token"]} style={{ transform: "scale(0.75)", marginRight: 5 }} />
                Login to access
            </Link>
        </div>
        : 
        <div className={style.sidebar}>
            {icon}
            <Link className={style["sidebar-item"]} activeClassName={style["sidebar-item-active"]} href="/overview">
                <div className={overviewStyle["icon-overview"]} style={{ transform: "scale(0.75)", marginRight: 5 }} />
                Overview
            </Link>
            <Link className={style["sidebar-item"]} activeClassName={style["sidebar-item-active"]} href="/alerts">
                <div className={alertStyle["icon-alert"]} style={{ transform: "scale(0.75)", marginRight: 5 }} />
                Alerts ({props.alerts})
            </Link>
            <Link className={style["sidebar-item"]} activeClassName={style["sidebar-item-active"]} href="/tasks">
                <div className={taskStyle["icon-task"]} style={{ transform: "scale(0.75)", marginRight: 5 }} />
                Tasks ({props.tasks})
            </Link>
            <Link className={style["sidebar-item"]} activeClassName={style["sidebar-item-active"]} href="/tokens">
                <div className={tokenStyle["icon-token"]} style={{ transform: "scale(0.75)", marginRight: 5 }} />
                Tokens
            </Link>
            <Link className={style["sidebar-item"]} activeClassName={style["sidebar-item-active"]} data="blue" href="/servers">
                <div className={serverStyle["icon-servers"]} style={{ transform: "scale(0.75)", marginRight: 5, background: "#66f" }} />
                Servers ({props.servers.size})
            </Link>
            {Array.from(props.servers.values()).map((e, i) => {
                return <div key={i}>
                    <Link className={style["sidebar-item"]} activeClassName={style["sidebar-item-active"]} href={`/server/${e.id}`}>
                        <div className={serverStyle["icon-server"]} style={{ transform: "scale(0.75)", marginRight: 5 }} />
                        {e.name}
                    </Link>
                </div>
            })}
            <Link className={style["sidebar-item"]} activeClassName={style["sidebar-item-active"]} data="blue" href="/uptime-endpoints">
                <div className={endpointStyle["icon-endpoint"]} style={{ transform: "scale(0.75)", marginRight: 5, background: "#66f" }} />
                Endpoints ({props.uptimeEndpoints.size})
            </Link>
            {Array.from(props.uptimeEndpoints.values()).map((e, i) => {
                return <div key={i}>
                    <Link className={style["sidebar-item"]} activeClassName={style["sidebar-item-active"]} href={`/uptime-endpoint/${e.id}`}>
                        <div className={endpointStyle["icon-endpoint"]} style={{ transform: "scale(0.75)", marginRight: 5 }} />
                        {e.name}
                    </Link>
                </div>
            })}
        </div>
    );
};

export default Sidebar;
