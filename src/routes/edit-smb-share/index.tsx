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

const EditSmbShare: FunctionalComponent<EditSMBShareConnectedProps> = (props: EditSMBShareConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
        }
    }, [props.session]);
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const smbShares = Array.from(props.smbShares.values());
    const share = props.id !== undefined ? props.smbShares.get(props.id) : undefined;

    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [users, setUsers] = useState<string[]>([]);
    const [admins, setAdmins] = useState<string[]>([]);
    const nameSatisfies = () => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (smbShares.some(e => e.parent === share?.parent && e.name !== share?.name && e.name === name) ? "(share with same name exists)" : "(satisfies)");
    }
    const pathSatisfies = () => {
        return path.length < 3 ? "(is not atleast 3 characters)" : "(satisfies)";
    }

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)" && pathSatisfies() === "(satisfies)");
    }, [name, path]);
    if(share === undefined) {
        return null;
    }
    const smbAllUsers = Array.from(props.smbUsers.values()).filter(e => e.parent === share.parent);
    const smbCurrentUsers = smbAllUsers.filter(e => users.includes(e.id));
    const smbCurrentAdmins = smbAllUsers.filter(e => admins.includes(e.id));
    if(!didSetDefaults) {
        setName(share.name);
        setPath(share.path);
        setUsers(share.users);
        setAdmins(share.admins);
        setDidSetDefaults(true);
    }
    
    return <div class={baseStyle.page}>
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
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Share name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-smb-instance..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Share path: </div>
                    <input className={formStyle["page-form-input"]} placeholder="/mnt/my-disk..." onInput={(e) => { setPath(e.currentTarget.value); }} value={path} />
                    <div className={formStyle["page-form-error"]} data={pathSatisfies() === "(satisfies)" ? "false" : "true"}>{pathSatisfies()}</div>
                </div>
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
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                    props.actions.editSmbShare({ id: share.id, name, path, users, admins });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }}>
                    Edit!
                </Button>
            </div>
        </div>
    </div>;
};

export default connect(mapState, mapDispatch(actions))(EditSmbShare);
