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

const CreateSMBInstance: FunctionalComponent<CreateSMBInstanceConnectedProps> = (props: CreateSMBInstanceConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
        }
    }, [props.session]);
    const [satisfies, setSatisfies] = useState(false);
    const smbInstances = Array.from(props.smbInstances.values());

    const [name, setName] = useState("");
    const [recycle, setRecycle] = useState(true);
    const nameSatisfies = () => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (smbInstances.some(e => e.name === name) ? "(instance with same name exists)" : "(satisfies)");
    }

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)");
    }, [name]);

    return <div class={baseStyle.page}>
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-smb"]} />
                <div className={baseStyle["page-title"]}>Create SMB Instance</div>
            </div>
            <div className={formStyle["page-form"]}>
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
                        props.actions.createSmbInstance({ server: props.id ?? "", name });
                        setTimeout(() => { location.href = `/smb-instance/${props.id}`; }, 1000);
                    }}>
                    Create!
                </Button>
            </div>
        </div>
    </div>;
};

export default connect(mapState, mapDispatch(actions))(CreateSMBInstance);
