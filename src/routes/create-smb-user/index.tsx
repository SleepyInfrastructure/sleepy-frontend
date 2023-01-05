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

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-user"]} />
                <div className={baseStyle["page-title"]}>Create SMB User</div>
            </div>
            <div className={formStyle["page-form"]}>
                <FormRowInput name="User name" placeholder="my-smb-user..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowButton name="Create!" satisfies={satisfies} onClick={() => {
                    props.actions.createSmbUser({ parent: props.id ?? "", name });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(CreateSMBUser);
