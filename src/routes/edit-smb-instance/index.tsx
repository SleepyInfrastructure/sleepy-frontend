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

    return <div class={baseStyle.page}>
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
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Instance name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-smb-instance..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Bin enabled: </div>
                    <div className={formStyle["page-form-switch"]} onClick={() => { setRecycle(!recycle); }}>
                        <input type="checkbox" checked={recycle} />
                        <div className={formStyle["page-form-switch-slider"]} />
                    </div>
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                    props.actions.editSmbInstance({ id: instance.id, name, recycle });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }}>
                    Edit!
                </Button>
            </div>
        </div>
    </div>;
};

export default connect(mapState, mapDispatch(actions))(EditSmbInstance);
