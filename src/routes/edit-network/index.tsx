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
import { ipv4Satisfies } from "../../scripts/util/satisfy";

const EditNetwork: FunctionalComponent<EditNetworkConnectedProps> = (props: EditNetworkConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllServersStructured();
        }
    }, [props.session]);
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const networks = Array.from(props.networks.values());
    const network = props.id !== undefined ? props.networks.get(props.id) : undefined;

    const [name, setName] = useState("");
    const [ipv4, setIPV4] = useState("");
    const nameSatisfies = () => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (networks.some(e => e.name !== network?.name && e.name === name) ? "(network with same name exists)" : "(satisfies)");
    }

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)" && ipv4Satisfies(ipv4) === "(satisfies)");
    }, [name, ipv4]);
    if(network === undefined) {
        return null;
    }
    if(!didSetDefaults) {
        setName(network.name);
        setIPV4(network.ipv4 ?? "");
        setDidSetDefaults(true);
    }

    return <div class={baseStyle.page}>
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-title-wrapper"]}>
                <div className={style["network-icon"]} />
                <div className={baseStyle["page-title"]}>Edit Network</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Network ID: </div>
                    <input className={formStyle["page-form-input"]} value={network.id} disabled />
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Network name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-network..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Network IPv4: </div>
                    <input className={formStyle["page-form-input"]} placeholder="1.1.1.1..." onInput={(e) => { setIPV4(e.currentTarget.value); }} value={ipv4} />
                    <div className={formStyle["page-form-error"]} data={ipv4Satisfies(ipv4) === "(satisfies)" ? "false" : "true"}>{ipv4Satisfies(ipv4)}</div>
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                        props.actions.editNetwork({
                            id: network.id,
                            name, ipv4
                        });
                        setTimeout(() => { location.href = "/"; }, 1000);
                    }}>
                    Edit!
                </Button>
            </div>
        </div>
    </div>;
};

export default connect(mapState, mapDispatch(actions))(EditNetwork);

