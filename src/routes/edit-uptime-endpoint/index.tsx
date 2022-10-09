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
/* Components */
import Button from "../../components/ui/button";
import { endpointSatisfies, hostSatisfies } from "../../scripts/util/satisfy";

const EditUptimeEndpoint: FunctionalComponent<EditUptimeEndpointConnectedProps> = (props: EditUptimeEndpointConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllUptimeEndpointsStructured();
        }
    }, [props.actions, props.session]);
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
        setSatisfies(nameSatisfies() === "(satisfies)" && hostSatisfies(host, requestEndpoint) === "(satisfies)" && endpointSatisfies(host, requestEndpoint) === "(satisfies)");
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

    return <div class={baseStyle.page}>
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={formStyle["icon-server"]} />
                <div className={baseStyle["page-title"]}>Edit Uptime Endpoint</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Endpoint ID: </div>
                    <input className={formStyle["page-form-input"]} value={uptimeEndpoint.id} disabled />
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Endpoint name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-endpoint..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Endpoint host: </div>
                    <input className={formStyle["page-form-input"]} placeholder="https://..." onInput={(e) => { setHost(e.currentTarget.value); }} value={host} />
                    <div className={formStyle["page-form-error"]} data={hostSatisfies(host, requestEndpoint) === "(satisfies)" ? "false" : "true"}>{hostSatisfies(host, requestEndpoint)}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Endpoint request url: </div>
                    <input className={formStyle["page-form-input"]} placeholder="xxx.com..." onInput={(e) => { setRequestEndpoint(e.currentTarget.value); }} value={requestEndpoint} />
                    <div className={formStyle["page-form-error"]} data={endpointSatisfies(host, requestEndpoint) === "(satisfies)" ? "false" : "true"}>{endpointSatisfies(host, requestEndpoint)}</div>
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                    props.actions.editUptimeEndpoint({
                        id: uptimeEndpoint.id,
                        name,
                        host: host === "" ? undefined : host,
                        requestEndpoint: requestEndpoint === "" ? undefined : requestEndpoint
                    });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }}>
                    Edit!
                </Button>
            </div>
        </div>
    </div>;
};

export default connect(mapState, mapDispatch(actions))(EditUptimeEndpoint);