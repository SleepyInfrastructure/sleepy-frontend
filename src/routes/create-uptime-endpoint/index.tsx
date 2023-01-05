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
import { endpointHostSatisfies, hostEndpointSatisfies, hostSatisfies } from "../../scripts/util/satisfy";
import FormRowButton from "../../components/ui/form-row-button";
import FormRowInput from "../../components/ui/form-row-input";

const CreateUptimeEndpoint: FunctionalComponent<CreateUptimeEndpointConnectedProps> = (props: CreateUptimeEndpointConnectedProps) => {
    const [satisfies, setSatisfies] = useState(false);
    const uptimeEndpoints = Array.from(props.uptimeEndpoints.values());

    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [requestEndpoint, setRequestEndpoint] = useState("");
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (uptimeEndpoints.some(e => e.name === name) ? "(endpoint with same name exists)" : "(satisfies)");
    }, [name, uptimeEndpoints]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)" && hostEndpointSatisfies(host, requestEndpoint) === "(satisfies)" && endpointHostSatisfies(requestEndpoint, host) === "(satisfies)");
    }, [host, nameSatisfies, requestEndpoint]);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-endpoint"]} />
                <div className={baseStyle["page-title"]}>Create Uptime Endpoint</div>
            </div>
            <div className={formStyle["page-form"]}>
                <FormRowInput name="Endpoint name" placeholder="my-endpoint..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowInput name="Endpoint host" placeholder="xxx.com..." value={host} satisfies={() => { return hostEndpointSatisfies(host, requestEndpoint); }} set={setHost} />
                <FormRowInput name="Endpoint request url" placeholder="https://..." value={requestEndpoint} satisfies={() => { return endpointHostSatisfies(host, requestEndpoint); }} set={setRequestEndpoint} />
                <FormRowButton name="Create!" satisfies={satisfies} onClick={() => {
                    props.actions.createUptimeEndpoint({
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

export default connect(mapState, mapDispatch(actions))(CreateUptimeEndpoint);
