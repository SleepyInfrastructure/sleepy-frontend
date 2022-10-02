/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useState } from "react";
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

const EditSmbUser: FunctionalComponent<EditSMBUserConnectedProps> = (props: EditSMBUserConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
        }
    }, [props.session]);
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const smbUsers = Array.from(props.smbUsers.values());
    const user = props.id !== undefined ? props.smbUsers.get(props.id) : undefined;

    const [name, setName] = useState("");
    const nameSatisfies = () => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (smbUsers.some(e => e.parent === user?.parent && e.name !== user?.name && e.name === name) ? "(user with same name exists)" : "(satisfies)");
    }

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)");
    }, [name]);
    if(user === undefined) {
        return null;
    }
    if(!didSetDefaults) {
        setName(user.name);
        setDidSetDefaults(true);
    }

    return <div class={baseStyle.page}>
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-user"]} />
                <div className={baseStyle["page-title"]}>Edit SMB User</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>User ID: </div>
                    <input className={formStyle["page-form-input"]} value={user.id} disabled />
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-smb-user..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                    props.actions.editSmbUser({ id: user.id, name });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }}>
                    Edit!
                </Button>
            </div>
        </div>
    </div>;
};

export default connect(mapState, mapDispatch(actions))(EditSmbUser);
