/* Base */
import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router";
/* Styles */
import style from "./style.scss";

const Header: FunctionalComponent<HeaderConnectedProps> = (props: HeaderConnectedProps) => {
    return (
        <header className={style.header}>
            <div className={style["header-start"]} onClick={() => { location.href = "/"; }}>
                <img alt="logo" className={style["header-icon"]} src="/assets/icons/icon-32x32.webp" />
                <h1 className={style["header-title"]}>Sleepy</h1>
            </div>
            {
                props.session !== null ?
                <nav className={style["header-nav"]}>
                    <Link className={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/overview">
                        Overview
                    </Link>
                    <Link className={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/tasks">
                        Tasks
                    </Link>
                    <Link className={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/settings">
                        Settings
                    </Link>
                    <Link className={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/tokens">
                        Tokens
                    </Link>
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
