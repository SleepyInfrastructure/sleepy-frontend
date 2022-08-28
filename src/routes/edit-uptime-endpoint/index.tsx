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

const EditUptimeEndpoint: FunctionalComponent<EditUptimeEndpointConnectedProps> = (props: EditUptimeEndpointConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllUptimeEndpointsStructured();
        }
    }, [props.session]);
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const uptimeEndpoints = Array.from(props.uptimeEndpoints.values());

    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [requestEndpoint, setRequestEndpoint] = useState("");
    const nameSatisfies = () => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (uptimeEndpoints.some(e => e.name === name) ? "(endpoint with same name exists)" : "(satisfies)");
    }
    const hostSatisfies = () => {
        if(host === "") { return requestEndpoint === "" ? "(host or request endpoint has to be specified)" : "(satisfies)"; }
        const ValidIpAddressRegex = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";
        const ValidHostnameRegex = "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$";
        return host.match(ValidIpAddressRegex) !== null || host.match(ValidHostnameRegex) !== null ? "(satisfies)" : "(is not a valid ip address or hostname)";
    }
    const requestEndpointSatisfies = () => {
        if(requestEndpoint === "") { return host === "" ? "(host or request endpoint has to be specified)" : "(satisfies)"; }
        try {
            const testUrl = new URL(requestEndpoint);
            return testUrl.protocol === "http:" || testUrl.protocol === "https:" ? "(satisfies)" : "(is not http or https)";
        } catch(e) {
            return "(is not http or https)";
        }
    }

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)" && hostSatisfies() === "(satisfies)" && requestEndpointSatisfies() === "(satisfies)");
    }, [name, host, requestEndpoint]);
    if(props.id === undefined) {
        return null;
    }
    const uptimeEndpoint = props.uptimeEndpoints.get(props.id);
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
            <div className={baseStyle["page-title-wrapper"]}>
                <div className={formStyle["server-icon"]} />
                <div className={baseStyle["page-title"]}>Edit Uptime Endpoint</div>
            </div>
            <div className={formStyle["create-server-form"]}>
                <div className={formStyle["create-server-form-row"]}>
                    <div className={formStyle["create-server-form-text"]}>Endpoint ID: </div>
                    <input className={formStyle["create-server-form-input"]} value={uptimeEndpoint.id} disabled />
                </div>
                <div className={formStyle["create-server-form-row"]}>
                    <div className={formStyle["create-server-form-text"]}>Endpoint name: </div>
                    <input className={formStyle["create-server-form-input"]} placeholder="my-endpoint..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["create-server-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <div className={formStyle["create-server-form-row"]}>
                    <div className={formStyle["create-server-form-text"]}>Endpoint host: </div>
                    <input className={formStyle["create-server-form-input"]} placeholder="https://..." onInput={(e) => { setHost(e.currentTarget.value); }} value={host} />
                    <div className={formStyle["create-server-form-error"]} data={hostSatisfies() === "(satisfies)" ? "false" : "true"}>{hostSatisfies()}</div>
                </div>
                <div className={formStyle["create-server-form-row"]}>
                    <div className={formStyle["create-server-form-text"]}>Endpoint request url: </div>
                    <input className={formStyle["create-server-form-input"]} placeholder="xxx.com..." onInput={(e) => { setRequestEndpoint(e.currentTarget.value); }} value={requestEndpoint} />
                    <div className={formStyle["create-server-form-error"]} data={requestEndpointSatisfies() === "(satisfies)" ? "false" : "true"}>{requestEndpointSatisfies()}</div>
                </div>
                <Button disabled={!satisfies} className={formStyle["create-server-form-button"]} secondary onClick={() => {
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
