/* Base */
import { h, FunctionalComponent } from "preact";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
import { useState } from "react";

const splashTexts: string[] = [
    "What the fuck is a variable? 🍦",
    "Sailing around the seas. 🌊",
    "Works on my machine. ⭐",
    "Powered by determination. ✨",
    "0.2 + 0.1 = 0.30000000000000004. ✔️",
    "Wen day is dark alway rember happy day. ❤️",
    "> moo at a cow > cow moos back. 🐄"
];

const Home: FunctionalComponent<HomeConnectedProps> = (props: HomeConnectedProps) => {
    const [text] = useState(splashTexts[Math.floor(Math.random() * splashTexts.length)]);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={style["home-main-content"]}>
                <img src="/assets/icons/icon-512x512.webp" className={style["home-icon"]} />
                <div className={style["home-title"]}>
                    Management of server infrastructure, made easy
                </div>
                <div className={style["home-subtitle"]} data="alt">
                    {text}
                </div>
                <div className={style["home-subtitle"]} data="small">
                    Work in progress, make an account if you want to though!
                    <a href="https://github.com/orgs/SleepyInfrastructure/repositories" className={style["home-link"]}>(Github)</a>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Home);
