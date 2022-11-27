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
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Endpoint name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-endpoint..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Endpoint host: </div>
                    <input className={formStyle["page-form-input"]} placeholder="xxx.com..." onInput={(e) => { setHost(e.currentTarget.value); }} value={host} />
                    <div className={formStyle["page-form-error"]} data={hostEndpointSatisfies(host, requestEndpoint) === "(satisfies)" ? "false" : "true"}>{hostEndpointSatisfies(host, requestEndpoint)}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Endpoint request url: </div>
                    <input className={formStyle["page-form-input"]} placeholder="https://..." onInput={(e) => { setRequestEndpoint(e.currentTarget.value); }} value={requestEndpoint} />
                    <div className={formStyle["page-form-error"]} data={endpointHostSatisfies(requestEndpoint, host) === "(satisfies)" ? "false" : "true"}>{endpointHostSatisfies(requestEndpoint, host)}</div>
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                        props.actions.createUptimeEndpoint({
                            name,
                            host: host === "" ? undefined : host,
                            requestEndpoint: requestEndpoint === "" ? undefined : requestEndpoint
                        });
                        setTimeout(() => { location.href = "/"; }, 1000);
                    }}>
                    Create!
                </Button>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(CreateUptimeEndpoint);
