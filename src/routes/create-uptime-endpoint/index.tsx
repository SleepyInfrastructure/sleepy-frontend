/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useState } from "react";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import createStyle from "../create-server/style.scss";
import style from "./style.scss";
/* Components */
import Button from "../../components/ui/button";

const CreateUptimeEndpoint: FunctionalComponent<CreateUptimeEndpointConnectedProps> = (props: CreateUptimeEndpointConnectedProps) => {
    useEffect(() => {
        if(props.session !== null) {
            props.actions.fetchAllUptimeEndpointsStructured();
        }
    }, [props.session]);
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

    return <div class={baseStyle.page}>
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-title-wrapper"]}>
                <div className={style["endpoint-icon"]} />
                <div className={baseStyle["page-title"]}>Create Uptime Endpoint</div>
            </div>
            <div className={createStyle["create-server-form"]}>
                <div className={createStyle["create-server-form-row"]}>
                    <div className={createStyle["create-server-form-text"]}>Endpoint name: </div>
                    <input className={createStyle["create-server-form-input"]} placeholder="my-endpoint..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={createStyle["create-server-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <div className={createStyle["create-server-form-row"]}>
                    <div className={createStyle["create-server-form-text"]}>Endpoint host: </div>
                    <input className={createStyle["create-server-form-input"]} placeholder="xxx.com..." onInput={(e) => { setHost(e.currentTarget.value); }} value={host} />
                    <div className={createStyle["create-server-form-error"]} data={hostSatisfies() === "(satisfies)" ? "false" : "true"}>{hostSatisfies()}</div>
                </div>
                <div className={createStyle["create-server-form-row"]}>
                    <div className={createStyle["create-server-form-text"]}>Endpoint request url: </div>
                    <input className={createStyle["create-server-form-input"]} placeholder="https://..." onInput={(e) => { setRequestEndpoint(e.currentTarget.value); }} value={requestEndpoint} />
                    <div className={createStyle["create-server-form-error"]} data={requestEndpointSatisfies() === "(satisfies)" ? "false" : "true"}>{requestEndpointSatisfies()}</div>
                </div>
                <Button disabled={!satisfies} className={createStyle["create-server-form-button"]} secondary onClick={() => { props.actions.createUptimeEndpoint(name, host === "" ? undefined : host, requestEndpoint === "" ? undefined : requestEndpoint); setTimeout(() => { location.href = "/"; }, 1000); }}>
                    Create!
                </Button>
            </div>
        </div>
    </div>;
};

export default connect(mapState, mapDispatch(actions))(CreateUptimeEndpoint);
