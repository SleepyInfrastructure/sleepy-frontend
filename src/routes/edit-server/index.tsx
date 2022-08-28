/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useState } from "react";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import formStyle from "../create-server/style.scss";
import style from "./style.scss";
/* Components */
import Button from "../../components/ui/button";

const EditServer: FunctionalComponent<EditServerConnectedProps> = (props: EditServerConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
        }
    }, [props.session]);
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const servers = Array.from(props.servers.values());

    const [name, setName] = useState("");
    const nameSatisfies = () => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (servers.some(e => e.name === name) ? "(server with same name exists)" : "(satisfies)");
    }

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)");
    }, [name]);
    if(props.id === undefined) {
        return null;
    }
    const server = props.servers.get(props.id);
    if(server === undefined) {
        return null;
    }
    if(!didSetDefaults) {
        setName(server.name);
        setDidSetDefaults(true);
    }

    return <div class={baseStyle.page}>
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-title-wrapper"]}>
                <div className={formStyle["server-icon"]} />
                <div className={baseStyle["page-title"]}>Edit Server</div>
            </div>
            <div className={formStyle["create-server-form"]}>
                <div className={formStyle["create-server-form-row"]}>
                    <div className={formStyle["create-server-form-text"]}>Server ID: </div>
                    <input className={formStyle["create-server-form-input"]} value={server.id} disabled />
                </div>
                <div className={formStyle["create-server-form-row"]}>
                    <div className={formStyle["create-server-form-text"]}>Server name: </div>
                    <input className={formStyle["create-server-form-input"]} placeholder="my-server..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["create-server-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <Button disabled={!satisfies} className={formStyle["create-server-form-button"]} secondary onClick={() => {
                    props.actions.editServer({
                        id: server.id,
                        name
                    });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }}>
                    Edit!
                </Button>
            </div>
        </div>
    </div>;
};

export default connect(mapState, mapDispatch(actions))(EditServer);
