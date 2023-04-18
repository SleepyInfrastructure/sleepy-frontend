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
                <div className={style["icon-nginx-server"]} />
                <div className={baseStyle["page-title"]}>Create Nginx Server</div>
            </div>
            <div className={formStyle["page-form"]}>
                <FormRowInput name="Server name" placeholder="my-nginx-server..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowInput name="Server domain" placeholder="google.com..." value={domain} satisfies={domainSatisfies} set={setDomain} />
                <FormRowInput name="Server SSL" placeholder="google.com..." value={ssl} satisfies={sslSatisfies} set={setSsl} />
                <FormRowSwitch name="Redirects HTTP" checked={httpRedirect} onClick={setHttpRedirect} />
                <FormRowSwitch name="HTTP2 enabled" checked={http2} onClick={setHttp2} />
                <FormRowButton name="Create!" satisfies={satisfies} onClick={() => {
                    props.actions.createNginxServer({
                        parent: props.id ?? "", name, domain,
                        expires: "7d", origins: [domain], ssl,
                        httpRedirect: httpRedirect === true, http2: http2 === true
                    });
                    setTimeout(() => { location.href = "/overview"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(CreateNginxServer);
