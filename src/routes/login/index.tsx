/* Base */
import { h, FunctionalComponent } from "preact";
import { useCallback, useEffect, useState } from "react";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import formStyle from "../form.scss";
import style from "./style.scss";
import Button from "../../components/ui/button";
/* Components */

const Login: FunctionalComponent<LoginConnectedProps> = (props: LoginConnectedProps) => {
    const [satisfies, setSatisfies] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const usernameSatisfies = useCallback(() => {
        return username.length < 3 ? "(is not atleast 3 characters)" : "(satisfies)";
    }, [username.length]);
    const passwordSatisfies = useCallback(() => {
        return password.length < 8 ? "(is not atleast 8 characters)" : "(satisfies)";
    }, [password.length]);

    useEffect(() => {
        setSatisfies(usernameSatisfies() === "(satisfies)" && passwordSatisfies() === "(satisfies)");
    }, [usernameSatisfies, passwordSatisfies]);

    return (
        <div className={baseStyle["auth-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-auth"]} />
                <div className={baseStyle["page-title"]}>Login</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Username: </div>
                    <input className={formStyle["page-form-input"]} placeholder="..." onInput={(e) => { setUsername(e.currentTarget.value); }} value={username} />
                    <div className={formStyle["page-form-error"]} data={usernameSatisfies() === "(satisfies)" ? "false" : "true"}>{usernameSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Password: </div>
                    <input className={formStyle["page-form-input"]} type="password" placeholder="..." onInput={(e) => { setPassword(e.currentTarget.value); }} value={password} />
                    <div className={formStyle["page-form-error"]} data={passwordSatisfies() === "(satisfies)" ? "false" : "true"}>{passwordSatisfies()}</div>
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => { props.actions.createSession("classic", username, password); }}>
                    Login!
                </Button>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Login);
