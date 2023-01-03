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
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Share name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-smb-share..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Share path: </div>
                    <input className={formStyle["page-form-input"]} placeholder="/mnt/my-disk..." onInput={(e) => { setPath(e.currentTarget.value); }} value={path} />
                    <div className={formStyle["page-form-error"]} data={pathSatisfies() === "(satisfies)" ? "false" : "true"}>{pathSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Browsable: </div>
                    <div className={formStyle["page-form-switch"]} onClick={() => { setBrowsable(!browsable); }}>
                        <input type="checkbox" checked={browsable} />
                        <div className={formStyle["page-form-switch-slider"]} />
                    </div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Read-only: </div>
                    <div className={formStyle["page-form-switch"]} onClick={() => { setReadonly(!readonly); }}>
                        <input type="checkbox" checked={readonly} />
                        <div className={formStyle["page-form-switch-slider"]} />
                    </div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Allow guests: </div>
                    <div className={formStyle["page-form-switch"]} onClick={() => { setGuest(!guest); }}>
                        <input type="checkbox" checked={guest} />
                        <div className={formStyle["page-form-switch-slider"]} />
                    </div>
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                        props.actions.createSmbShare({
                            parent: props.id ?? "", name, path,
                            browsable: browsable === true, readonly: readonly === true, guest: guest === true,
                            users: [], admins: []
                        });
                        setTimeout(() => { location.href = "/"; }, 1000);
                    }}>
                    Create!
                </Button>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(CreateSMBShare);
