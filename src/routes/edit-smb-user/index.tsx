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
import FormRowButton from "../../components/ui/form-row-button";
import FormRowInput from "../../components/ui/form-row-input";

const EditSmbUser: FunctionalComponent<EditSMBUserConnectedProps> = (props: EditSMBUserConnectedProps) => {
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const smbUsers = Array.from(props.smbUsers.values());
    const user = props.id !== undefined ? props.smbUsers.get(props.id) : undefined;

    const [name, setName] = useState("");
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (smbUsers.some(e => e.parent === user?.parent && e.name !== user?.name && e.name === name) ? "(user with same name exists)" : "(satisfies)");
    }, [name, smbUsers, user?.name, user?.parent]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)");
    }, [nameSatisfies]);
    if(user === undefined) {
        return null;
    }
    if(!didSetDefaults) {
        setName(user.name);
        setDidSetDefaults(true);
    }

    return (
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
                <FormRowInput name="User name" placeholder="my-smb-user..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowButton name="Edit!" satisfies={satisfies} onClick={() => {
                    props.actions.editSmbUser({ id: user.id, name });
                    setTimeout(() => { location.href = "/overview"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(EditSmbUser);
