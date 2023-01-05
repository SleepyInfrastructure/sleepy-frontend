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
import endpointStyle from "../../components/uptime-endpoint/style.scss";
/* Components */
import Button from "../../components/ui/button";
import { endpointHostSatisfies, hostEndpointSatisfies } from "../../scripts/util/satisfy";
import FormRowButton from "../../components/ui/form-row-button";
import FormRowInput from "../../components/ui/form-row-input";

const EditUptimeEndpoint: FunctionalComponent<EditUptimeEndpointConnectedProps> = (props: EditUptimeEndpointConnectedProps) => {
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const uptimeEndpoints = Array.from(props.uptimeEndpoints.values());
    const uptimeEndpoint = props.id !== undefined ? props.uptimeEndpoints.get(props.id) : undefined;

    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [requestEndpoint, setRequestEndpoint] = useState("");
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (uptimeEndpoints.some(e => e.name !== uptimeEndpoint?.name && e.name === name) ? "(endpoint with same name exists)" : "(satisfies)");
    }, [name, uptimeEndpoint?.name, uptimeEndpoints]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)" && hostEndpointSatisfies(host, requestEndpoint) === "(satisfies)" && endpointHostSatisfies(host, requestEndpoint) === "(satisfies)");
    }, [host, requestEndpoint, nameSatisfies]);
    if(uptimeEndpoint === undefined) {
        return null;
    }
    if(!didSetDefaults) {
        setName(uptimeEndpoint.name);
        setHost(uptimeEndpoint.host ?? "");
        setRequestEndpoint(uptimeEndpoint.requestEndpoint ?? "");
        setDidSetDefaults(true);
    }

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={endpointStyle["icon-endpoint"]} />
                <div className={baseStyle["page-title"]}>Edit Uptime Endpoint</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Endpoint ID: </div>
                    <input className={formStyle["page-form-input"]} value={uptimeEndpoint.id} disabled />
                </div>
                <FormRowInput name="Endpoint name" placeholder="my-endpoint..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowInput name="Endpoint host" placeholder="xxx.com..." value={host} satisfies={() => { return hostEndpointSatisfies(host, requestEndpoint); }} set={setHost} />
                <FormRowInput name="Endpoint request url" placeholder="https://..." value={requestEndpoint} satisfies={() => { return endpointHostSatisfies(host, requestEndpoint); }} set={setRequestEndpoint} />
                <FormRowButton name="Edit!" satisfies={satisfies} onClick={() => {
                    props.actions.editUptimeEndpoint({
                        id: uptimeEndpoint.id,
                        name,
                        host: host === "" ? undefined : host,
                        requestEndpoint: requestEndpoint === "" ? undefined : requestEndpoint
                    });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(EditUptimeEndpoint);