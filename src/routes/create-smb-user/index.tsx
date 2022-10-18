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
/* Components */
import Button from "../../components/ui/button";

const CreateSMBUser: FunctionalComponent<CreateSMBUserConnectedProps> = (props: CreateSMBUserConnectedProps) => {
    const [satisfies, setSatisfies] = useState(false);
    const smbUsers = Array.from(props.smbUsers.values());

    const [name, setName] = useState("");
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (smbUsers.some(e => e.parent === props.id && e.name === name) ? "(user with same name exists)" : "(satisfies)");
    }, [name, props.id, smbUsers]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)");
    }, [nameSatisfies]);

    return <div class={baseStyle.page}>
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-user"]} />
                <div className={baseStyle["page-title"]}>Create SMB User</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>User name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-smb-user..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                        props.actions.createSmbUser({ parent: props.id ?? "", name });
                        setTimeout(() => { location.href = `/smb-instance/${props.id}`; }, 1000);
                    }}>
                    Create!
                </Button>
            </div>
        </div>
    </div>;
};

export default connect(mapState, mapDispatch(actions))(CreateSMBUser);
