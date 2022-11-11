/* Base */
import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router/match";
/* Styles */
import style from "./style.scss";
import userStyle from "../smb-user/style.scss";

const Header: FunctionalComponent<HeaderConnectedProps> = (props: HeaderConnectedProps) => {
    return (
        <header className={style.header}>
            {
                props.user !== null ?
                <nav className={style["header-nav"]}>
                    <div className={style["header-nav-profile"]}>
                        <div className={userStyle["icon-user"]} />
                        {props.user.username}
                    </div>
                    <div className={style["header-nav-link"]} onClick={() => { props.actions.deleteSession(); }}>
                        Logout
                    </div>
                </nav>
                : 
                <nav className={style["header-nav"]}>
                    <Link className={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/login">
                        Login
                    </Link>
                    <Link className={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/register">
                        Register
                    </Link>
                    <Link className={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/public-dashboards">
                        Public Dashboards
                    </Link>
                </nav>
            }
        </header>
    );
};

export default Header;
