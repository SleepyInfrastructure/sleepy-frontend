/* Base */
import { h, FunctionalComponent } from "preact";
import { useState } from "react";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";
import baseStyle from "../style.scss";
/* Components */

const Register: FunctionalComponent<RegisterConnectedProps> = (props: RegisterConnectedProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div class={baseStyle.page}>
            <input className={style["auth-input"]} placeholder="Username..." onInput={(e) => { setUsername(e.currentTarget.value); }} value={username} />
            <input className={style["auth-input"]} type="password" placeholder="Password..." onInput={(e) => { setPassword(e.currentTarget.value); }} value={password} />
            <button onClick={() => { props.actions.createUser(username, password); }}>Register</button>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Register);
