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

const CreateSMBShare: FunctionalComponent<CreateSMBShareConnectedProps> = (props: CreateSMBShareConnectedProps) => {
    const [satisfies, setSatisfies] = useState(false);
    const smbShares = Array.from(props.smbShares.values());

    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [browsable, setBrowsable] = useState(true);
    const [readonly, setReadonly] = useState(false);
    const [guest, setGuest] = useState(false);
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (smbShares.some(e => e.parent === props.id && e.name === name) ? "(share with same name exists)" : "(satisfies)");
    }, [name, props.id, smbShares]);
    const pathSatisfies = useCallback(() => {
        return path.length < 3 ? "(is not atleast 3 characters)" : "(satisfies)";
    }, [path.length]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)" && pathSatisfies() === "(satisfies)");
    }, [nameSatisfies, pathSatisfies]);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-smb"]} />
                <div className={baseStyle["page-title"]}>Create SMB Share</div>
            </div>
            <div className={formStyle["page-form"]}>
                <FormRowInput name="Share name" placeholder="my-smb-share..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowInput name="Share path" placeholder="/mnt/my-disk..." value={path} satisfies={pathSatisfies} set={setPath} />
                <FormRowSwitch name="Browsable" checked={browsable} onClick={setBrowsable} />
                <FormRowSwitch name="Read-only" checked={readonly} onClick={setReadonly} />
                <FormRowSwitch name="Allow guests" checked={guest} onClick={setGuest} />
                <FormRowButton name="Create!" satisfies={satisfies} onClick={() => {
                    props.actions.createSmbShare({
                        parent: props.id ?? "", name, path,
                        browsable: browsable === true, readonly: readonly === true, guest: guest === true,
                        users: [], admins: []
                    });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(CreateSMBShare);
