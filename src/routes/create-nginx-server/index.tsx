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

const CreateNginxServer: FunctionalComponent<CreateNginxServerConnectedProps> = (props: CreateNginxServerConnectedProps) => {
    const [satisfies, setSatisfies] = useState(false);
    const nginxServers = Array.from(props.nginxServers.values());

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

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-nginx"]} />
                <div className={baseStyle["page-title"]}>Create Nginx Server</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Server name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-nginx-server..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Server domain: </div>
                    <input className={formStyle["page-form-input"]} placeholder="google.com..." onInput={(e) => { setDomain(e.currentTarget.value); }} value={domain} />
                    <div className={formStyle["page-form-error"]} data={domainSatisfies() === "(satisfies)" ? "false" : "true"}>{domainSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Server SSL: </div>
                    <input className={formStyle["page-form-input"]} placeholder="google.com..." onInput={(e) => { setSsl(e.currentTarget.value); }} value={ssl} />
                    <div className={formStyle["page-form-error"]} data={sslSatisfies() === "(satisfies)" ? "false" : "true"}>{sslSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Redirects HTTP: </div>
                    <div className={formStyle["page-form-switch"]} onClick={() => { setHttpRedirect(!httpRedirect); }}>
                        <input type="checkbox" checked={httpRedirect} />
                        <div className={formStyle["page-form-switch-slider"]} />
                    </div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>HTTP2 enabled: </div>
                    <div className={formStyle["page-form-switch"]} onClick={() => { setHttp2(!http2); }}>
                        <input type="checkbox" checked={http2} />
                        <div className={formStyle["page-form-switch-slider"]} />
                    </div>
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                        props.actions.createNginxServer({
                            parent: props.id ?? "", name, domain,
                            expires: "7d", origins: [domain], ssl,
                            httpRedirect: httpRedirect === true, http2: http2 === true
                        });
                        setTimeout(() => { location.href = "/"; }, 1000);
                    }}>
                    Create!
                </Button>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(CreateNginxServer);
