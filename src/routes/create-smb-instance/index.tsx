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
import FormRowSwitch from "../../components/ui/form-row-switch";

const CreateSMBInstance: FunctionalComponent<CreateSMBInstanceConnectedProps> = (props: CreateSMBInstanceConnectedProps) => {
    const [satisfies, setSatisfies] = useState(false);
    const smbInstances = Array.from(props.smbInstances.values());

    const [name, setName] = useState("");
    const [recycle, setRecycle] = useState(true);
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (smbInstances.some(e => e.name === name) ? "(instance with same name exists)" : "(satisfies)");
    }, [name, smbInstances]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)");
    }, [nameSatisfies]);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-smb"]} />
                <div className={baseStyle["page-title"]}>Create SMB Instance</div>
            </div>
            <div className={formStyle["page-form"]}>
                <FormRowInput name="Instance name" placeholder="my-smb-instance..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowSwitch name="Bin enabled" checked={recycle} onClick={setRecycle} />
                <FormRowButton name="Create!" satisfies={satisfies} onClick={() => {
                    props.actions.createSmbInstance({ server: props.id ?? "", name, recycle });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(CreateSMBInstance);
