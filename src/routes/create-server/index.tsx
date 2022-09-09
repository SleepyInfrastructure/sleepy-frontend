/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
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

const CreateServer: FunctionalComponent<CreateServerConnectedProps> = (props: CreateServerConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
        }
    }, [props.session]);
    const [satisfies, setSatisfies] = useState(false);
    const servers = Array.from(props.servers.values());

    const [name, setName] = useState("");
    const [color, setColor] = useState("#ff3645");
    const nameSatisfies = () => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (servers.some(e => e.name === name) ? "(server with same name exists)" : "(satisfies)");
    }

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)");
    }, [name]);

    return <div class={baseStyle.page}>
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-title-wrapper"]}>
                <div className={style["server-icon"]} />
                <div className={baseStyle["page-title"]}>Create Server</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Server name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-server..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Server color: </div>
                    <HexColorPicker className={formStyle["page-form-color-picker"]} color={color} onChange={setColor} />
                    <div className={formStyle["page-form-color-picker-stripe"]} style={{ backgroundColor: color }} />
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                        props.actions.createServer({ name, color });
                        setTimeout(() => { location.href = "/"; }, 1000);
                    }}>
                    Create!
                </Button>
            </div>
        </div>
    </div>;
};

export default connect(mapState, mapDispatch(actions))(CreateServer);
