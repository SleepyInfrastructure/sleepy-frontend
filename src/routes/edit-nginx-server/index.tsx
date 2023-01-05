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
import { hostnameSatisfies } from "../../scripts/util/satisfy";
import FormRowButton from "../../components/ui/form-row-button";
import FormRowInput from "../../components/ui/form-row-input";
import FormRowSwitch from "../../components/ui/form-row-switch";

const EditNginxServer: FunctionalComponent<EditNginxServerConnectedProps> = (props: EditNginxServerConnectedProps) => {
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const nginxServers = Array.from(props.nginxServers.values());
    const server = props.id !== undefined ? props.nginxServers.get(props.id) : undefined;

    const [name, setName] = useState("");
    const [domain, setDomain] = useState("");
    const [ssl, setSsl] = useState("");
    const [httpRedirect, setHttpRedirect] = useState(true);
    const [http2, setHttp2] = useState(true);
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (nginxServers.some(e => e.parent === props.id && e.name === name) ? "(server with same name exists)" : "(satisfies)");
    }, [name, props.id, nginxServers]);
    const domainSatisfies = useCallback(() => {
        return domain.length < 3 ? "(is not atleast 3 characters)" : hostnameSatisfies(domain);
    }, [domain]);
    const sslSatisfies = useCallback(() => {
        return ssl.length < 3 ? "(is not atleast 3 characters)" : hostnameSatisfies(ssl);
    }, [ssl]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)" && domainSatisfies() === "(satisfies)" && sslSatisfies() === "(satisfies)");
    }, [nameSatisfies, domainSatisfies, sslSatisfies]);
    if(server === undefined) {
        return null;
    }
    if(!didSetDefaults) {
        setName(server.name);
        setDomain(server.domain);
        setSsl(server.ssl);
        setHttpRedirect(server.httpRedirect);
        setHttp2(server.http2);
        setDidSetDefaults(true);
    }

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-nginx-server"]} />
                <div className={baseStyle["page-title"]}>Edit Nginx Server</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Server ID: </div>
                    <input className={formStyle["page-form-input"]} value={server.id} disabled />
                </div>
                <FormRowInput name="Server name" placeholder="my-nginx-server..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowInput name="Server domain" placeholder="google.com..." value={domain} satisfies={domainSatisfies} set={setDomain} />
                <FormRowInput name="Server SSL" placeholder="google.com..." value={ssl} satisfies={sslSatisfies} set={setSsl} />
                <FormRowSwitch name="Redirects HTTP" checked={httpRedirect} onClick={setHttpRedirect} />
                <FormRowSwitch name="HTTP2 enabled" checked={http2} onClick={setHttp2} />
                <FormRowButton name="Edit!" satisfies={satisfies} onClick={() => {
                    props.actions.editNginxServer({
                        id: server.id, name, domain,
                        httpRedirect: httpRedirect === true, http2: http2 === true
                    });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(EditNginxServer);
