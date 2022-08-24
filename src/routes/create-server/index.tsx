/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useState } from "react";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import Button from "../../components/ui/button";

const CreateServer: FunctionalComponent<CreateServerConnectedProps> = (props: CreateServerConnectedProps) => {
    const [name, setName] = useState("");
    const [satisfies, setSatisfies] = useState(false);
    const [createdName, setCreatedName] = useState("");
    useEffect(() => {
        setSatisfies(name.length >= 3);
    }, [name]);
    if(createdName !== "") {
        const server = Array.from(props.servers.values()).find(e => e.name === createdName);
        if(server !== undefined) {
            location.href = `/server/${server.id}`;
        }
    }

    return <div class={baseStyle.page}>
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-title-wrapper"]}>
                <div className={style["server-icon"]} />
                <div className={baseStyle["page-title"]}>Create Server</div>
            </div>
            <div className={style["create-server-form"]}>
                <div className={style["create-server-form-row"]}>
                    <div className={style["create-server-form-text"]}>Server name: </div>
                    <input className={style["create-server-form-input"]} placeholder="my-server..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={style["create-server-form-error"]} data={name.length >= 3 ? "false" : "true"}>(is atleast 3 characters)</div>
                </div>
                <Button disabled={!satisfies} className={style["create-server-form-button"]} secondary onClick={() => { props.actions.createServer(name); setCreatedName(name); }}>
                    Create!
                </Button>
            </div>
        </div>
    </div>;
};

export default connect(mapState, mapDispatch(actions))(CreateServer);
