/* Base */
import { h, FunctionalComponent } from "preact";
import { useCallback, useEffect, useState } from "react";
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
import FormRowButton from "../../components/ui/form-row-button";
import FormRowInput from "../../components/ui/form-row-input";

const CreateServer: FunctionalComponent<CreateServerConnectedProps> = (props: CreateServerConnectedProps) => {
    const [satisfies, setSatisfies] = useState(false);
    const servers = Array.from(props.servers.values());

    const [name, setName] = useState("");
    const [color, setColor] = useState("#ff3645");
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (servers.some(e => e.name === name) ? "(server with same name exists)" : "(satisfies)");
    }, [name, servers]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)");
    }, [nameSatisfies]);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-server"]} />
                <div className={baseStyle["page-title"]}>Create Server</div>
            </div>
            <div className={formStyle["page-form"]}>
                <FormRowInput name="Server name" placeholder="my-server..." value={name} satisfies={nameSatisfies} set={setName} />
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Server color: </div>
                    <HexColorPicker className={formStyle["page-form-color-picker"]} color={color} onChange={setColor} />
                    <div className={formStyle["page-form-color-picker-stripe"]} style={{ backgroundColor: color }} />
                </div>
                <FormRowButton name="Create!" satisfies={satisfies} onClick={() => {
                    props.actions.createServer({ name, color: color.substring(1) });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(CreateServer);
