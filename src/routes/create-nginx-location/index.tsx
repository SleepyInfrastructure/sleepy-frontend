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
import { hostSatisfies } from "../../scripts/util/satisfy";

const CreateNginxLocation: FunctionalComponent<CreateNginxLocationConnectedProps> = (props: CreateNginxLocationConnectedProps) => {
    const [satisfies, setSatisfies] = useState(false);
    const nginxLocations = Array.from(props.nginxLocations.values());

    const [name, setName] = useState("");
    const types: NginxLocationType[] = ["STATIC", "API", "WS"];
    const [type, setType] = useState<NginxLocationType>("STATIC");
    const [path, setPath] = useState("");
    const [endpoint, setEndpoint] = useState("");
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (nginxLocations.some(e => e.parent === props.id && e.name === name) ? "(location with same name exists)" : "(satisfies)");
    }, [name, props.id, nginxLocations]);
    const endpointSatisfies = useCallback(() => {
        return endpoint.length < 3 ? "(is not atleast 3 characters)" : hostSatisfies(endpoint);
    }, [endpoint]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)" && endpointSatisfies() === "(satisfies)");
    }, [nameSatisfies, endpointSatisfies]);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-nginx"]} />
                <div className={baseStyle["page-title"]}>Create Nginx Location</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Location name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-nginx-location..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Location type: </div>
                    <div className={formStyle["page-form-dropdown"]}>
                        <div className={formStyle["page-form-dropdown-button"]}>{type}</div>
                        <div className={formStyle["page-form-dropdown-content"]}>
                            {types.map((e, i) => {
                                return <div key={i} className={formStyle["page-form-dropdown-content-item"]} onClick={() => {
                                        setType(e);
                                    }} data={type !== e ? "gray" : undefined}>
                                    <div className={style["icon-type"]} />
                                    {e}
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Location path: </div>
                    <input className={formStyle["page-form-input"]} placeholder="path or empty for root..." onInput={(e) => { setPath(e.currentTarget.value); }} value={path} />
                    <div className={formStyle["page-form-error"]} data="false">(satisfies)</div>
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Location endpoint: </div>
                    <input className={formStyle["page-form-input"]} placeholder="127.0.0.1:8080..." onInput={(e) => { setEndpoint(e.currentTarget.value); }} value={endpoint} />
                    <div className={formStyle["page-form-error"]} data={endpointSatisfies() === "(satisfies)" ? "false" : "true"}>{endpointSatisfies()}</div>
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                        props.actions.createNginxLocation({
                            parent: props.id ?? "", name, type, path, endpoint
                        });
                        setTimeout(() => { location.href = "/"; }, 1000);
                    }}>
                    Create!
                </Button>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(CreateNginxLocation);
