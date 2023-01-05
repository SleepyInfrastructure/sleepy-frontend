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
import FormRowButton from "../../components/ui/form-row-button";
/* Components */

const Register: FunctionalComponent<RegisterConnectedProps> = (props: RegisterConnectedProps) => {
    const [satisfies, setSatisfies] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const usernameSatisfies = useCallback(() => {
        return username.length < 3 ? "(is not atleast 3 characters)" : "(satisfies)";
    }, [username.length]);
    const passwordSatisfies = useCallback(() => {
        return password.length < 8 ? "(is not atleast 8 characters)" : "(satisfies)";
    }, [password.length]);
    const passwordAgainMatches = useCallback(() => {
        return passwordAgain !== password ? "(password doesn't match)" : "(matches)";
    }, [password, passwordAgain]);

    useEffect(() => {
        setSatisfies(usernameSatisfies() === "(satisfies)" && passwordSatisfies() === "(satisfies)" && passwordAgainMatches() === "(matches)");
    }, [usernameSatisfies, passwordSatisfies, passwordAgainMatches]);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-auth"]} />
                <div className={baseStyle["page-title"]}>Register</div>
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
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Password again: </div>
                    <input className={formStyle["page-form-input"]} type="password" placeholder="..." onInput={(e) => { setPasswordAgain(e.currentTarget.value); }} value={passwordAgain} />
                    <div className={formStyle["page-form-error"]} data={passwordAgainMatches() === "(matches)" ? "false" : "true"}>{passwordAgainMatches()}</div>
                </div>
                <FormRowButton name="Register!" satisfies={satisfies} onClick={() => {
                    props.actions.createUser({ username, password });
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Register);
