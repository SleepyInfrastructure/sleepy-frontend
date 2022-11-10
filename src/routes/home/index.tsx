/* Base */
import { h, FunctionalComponent } from "preact";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const Home: FunctionalComponent<HomeConnectedProps> = (props: HomeConnectedProps) => {
    return (
        <div className={baseStyle["page-content"]}>
            <div className={style["home-main-content"]}>
                <img src="/assets/icons/icon-512x512.webp" className={style["home-icon"]} />
                <div className={style["home-title"]}>
                    Management of server infrastructure, made easy
                </div>
                <div className={style["home-subtitle"]}>
                    You totally need this, only for the price of 0$/mon.
                    <a href="https://github.com/orgs/SleepyInfrastructure/repositories" className={style["home-link"]}>(Github)</a>
                </div>
                <div className={style["home-subtitle"]}>Work in progress, make an account if you want to though!</div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Home);
