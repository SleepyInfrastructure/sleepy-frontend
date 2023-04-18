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

const EditSmbInstance: FunctionalComponent<EditSMBInstanceConnectedProps> = (props: EditSMBInstanceConnectedProps) => {
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const smbInstances = Array.from(props.smbInstances.values());
    const instance = props.id !== undefined ? props.smbInstances.get(props.id) : undefined;

    const [name, setName] = useState("");
    const [recycle, setRecycle] = useState(true);
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (smbInstances.some(e => e.name !== instance?.name && e.name === name) ? "(instance with same name exists)" : "(satisfies)");
    }, [instance?.name, name, smbInstances]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)");
    }, [nameSatisfies]);
    if(instance === undefined) {
        return null;
    }
    if(!didSetDefaults) {
        setName(instance.name);
        setRecycle(instance.recycle);
        setDidSetDefaults(true);
    }

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-smb"]} />
                <div className={baseStyle["page-title"]}>Edit SMB Instance</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Instance ID: </div>
                    <input className={formStyle["page-form-input"]} value={instance.id} disabled />
                </div>
                <FormRowInput name="Instance name" placeholder="my-smb-instance..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowSwitch name="Bin enabled" checked={recycle} onClick={setRecycle} />
                <FormRowButton name="Edit!" satisfies={satisfies} onClick={() => {
                    props.actions.editSmbInstance({ id: instance.id, name, recycle });
                    setTimeout(() => { location.href = "/overview"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(EditSmbInstance);
