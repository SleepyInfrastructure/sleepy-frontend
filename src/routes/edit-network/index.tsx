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
import { ipv4Satisfies } from "../../scripts/util/satisfy";
import FormRowButton from "../../components/ui/form-row-button";
import FormRowInput from "../../components/ui/form-row-input";

const EditNetwork: FunctionalComponent<EditNetworkConnectedProps> = (props: EditNetworkConnectedProps) => {
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const networks = Array.from(props.networks.values());
    const network = props.id !== undefined ? props.networks.get(props.id) : undefined;

    const [name, setName] = useState("");
    const [ipv4, setIPV4] = useState("");
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (networks.some(e => e.name !== network?.name && e.name === name) ? "(network with same name exists)" : "(satisfies)");
    }, [name, network?.name, networks]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)" && ipv4Satisfies(ipv4) === "(satisfies)");
    }, [ipv4, nameSatisfies]);
    if(network === undefined) {
        return null;
    }
    if(!didSetDefaults) {
        setName(network.name);
        setIPV4(network.ipv4 ?? "");
        setDidSetDefaults(true);
    }

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-network"]} />
                <div className={baseStyle["page-title"]}>Edit Network</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Network ID: </div>
                    <input className={formStyle["page-form-input"]} value={network.id} disabled />
                </div>
                <FormRowInput name="Network name" placeholder="my-network..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowInput name="Network IPv4" placeholder="1.1.1.1..." value={ipv4} satisfies={() => { return ipv4Satisfies(ipv4); }} set={setIPV4} />
                <FormRowButton name="Edit!" satisfies={satisfies} onClick={() => {
                    props.actions.editNetwork({
                        id: network.id,
                        name, ipv4
                    });
                    setTimeout(() => { location.href = "/overview"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(EditNetwork);

