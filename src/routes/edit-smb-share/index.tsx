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

const EditSmbShare: FunctionalComponent<EditSMBShareConnectedProps> = (props: EditSMBShareConnectedProps) => {
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const smbShares = Array.from(props.smbShares.values());
    const share = props.id !== undefined ? props.smbShares.get(props.id) : undefined;

    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [browsable, setBrowsable] = useState(true);
    const [readonly, setReadonly] = useState(false);
    const [guest, setGuest] = useState(false);
    const [users, setUsers] = useState<string[]>([]);
    const [admins, setAdmins] = useState<string[]>([]);
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (smbShares.some(e => e.parent === share?.parent && e.name !== share?.name && e.name === name) ? "(share with same name exists)" : "(satisfies)");
    }, [name, share?.name, share?.parent, smbShares]);
    const pathSatisfies = useCallback(() => {
        return path.length < 3 ? "(is not atleast 3 characters)" : "(satisfies)";
    }, [path]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)" && pathSatisfies() === "(satisfies)");
    }, [nameSatisfies, pathSatisfies]);
    if(share === undefined) {
        return null;
    }
    const smbAllUsers = Array.from(props.smbUsers.values()).filter(e => e.parent === share.parent);
    const smbCurrentUsers = smbAllUsers.filter(e => users.includes(e.id));
    const smbCurrentAdmins = smbAllUsers.filter(e => admins.includes(e.id));
    if(!didSetDefaults) {
        setName(share.name);
        setPath(share.path);
        setBrowsable(share.browsable);
        setReadonly(share.readonly);
        setGuest(share.guest);
        setUsers(share.users);
        setAdmins(share.admins);
        setDidSetDefaults(true);
    }
    
    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-share"]} />
                <div className={baseStyle["page-title"]}>Edit SMB Share</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Share ID: </div>
                    <input className={formStyle["page-form-input"]} value={share.id} disabled />
                </div>
                <FormRowInput name="Share name" placeholder="my-smb-share..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowInput name="Share path" placeholder="/mnt/my-disk..." value={path} satisfies={pathSatisfies} set={setPath} />
                <FormRowSwitch name="Browsable" checked={browsable} onClick={setBrowsable} />
                <FormRowSwitch name="Read-only" checked={readonly} onClick={setReadonly} />
                <FormRowSwitch name="Allow guests" checked={guest} onClick={setGuest} />
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Share users: </div>
                    <div className={formStyle["page-form-dropdown"]}>
                        <div className={formStyle["page-form-dropdown-button"]} data={smbAllUsers.length < 1 ? "empty" : undefined}>{users.length < 1 ? "None" : smbCurrentUsers.map(e => e.name).join(", ")}</div>
                        <div className={formStyle["page-form-dropdown-content"]}>
                            {smbAllUsers.map((e, i) => {
                                return <div key={i} className={formStyle["page-form-dropdown-content-item"]} onClick={() => {
                                        if(users.includes(e.id)) {
                                            users.splice(users.indexOf(e.id), 1);
                                            setUsers([ ...users ]);
                                            if(admins.includes(e.id)) {
                                                admins.splice(admins.indexOf(e.id), 1);
                                                setAdmins([ ...admins ]);
                                            }
                                        } else {
                                            users.push(e.id);
                                            setUsers([ ...users ]);
                                        }
                                    }} data={!users.includes(e.id) ? "gray" : undefined}>
                                    <div className={style["icon-user"]} />
                                    {e.name}
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Share admins: </div>
                    <div className={formStyle["page-form-dropdown"]}>
                        <div className={formStyle["page-form-dropdown-button"]} data={smbCurrentUsers.length < 1 ? "empty" : undefined}>{admins.length < 1 ? "None" : smbCurrentAdmins.map(e => e.name).join(", ")}</div>
                        <div className={formStyle["page-form-dropdown-content"]}>
                            {smbCurrentUsers.map((e, i) => {
                                return <div key={i} className={formStyle["page-form-dropdown-content-item"]} onClick={() => {
                                        if(admins.includes(e.id)) {
                                            admins.splice(admins.indexOf(e.id), 1);
                                            setAdmins([ ...admins ]);
                                        } else {
                                            admins.push(e.id);
                                            setAdmins([ ...admins ]);
                                        }
                                    }} data={!admins.includes(e.id) ? "gray" : undefined}>
                                    <div className={style["icon-user"]} />
                                    {e.name}
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <FormRowButton name="Edit!" satisfies={satisfies} onClick={() => {
                    props.actions.editSmbShare({
                        id: share.id, name, path,
                        browsable: browsable === true, readonly: readonly === true, guest: guest === true,
                        users, admins
                    });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(EditSmbShare);
