/* Base */
import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router";
/* Styles */
import style from "./style.scss";

const Header: FunctionalComponent<HeaderConnectedProps> = (props: HeaderConnectedProps) => {
    return (
        <header class={style.header}>
            <img alt="logo" class={style["header-icon"]} src={"/assets/icons/icon-32x32.webp"} />
            <h1 class={style["header-title"]}>Sleepy</h1>
            {
                props.session !== null ?
                <nav class={style["header-nav"]}>
                    <Link class={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/">
                        Home
                    </Link>
                    <Link class={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/tasks">
                        Tasks
                    </Link>
                    <Link class={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/settings">
                        Settings
                    </Link>
                    <Link class={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/tokens">
                        Tokens
                    </Link>
                    <div class={style["header-nav-link"]} onClick={() => { props.actions.deleteSession(); }}>
                        Logout
                    </div>
                </nav>
                : 
                <nav class={style["header-nav"]}>
                    <Link class={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/login">
                        Login
                    </Link>
                    <Link class={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/register">
                        Register
                    </Link>
                </nav>
            }
        </header>
    );
};

export default Header;
