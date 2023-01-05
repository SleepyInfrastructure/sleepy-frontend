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
import FormRowButton from "../../components/ui/form-row-button";
import FormRowInput from "../../components/ui/form-row-input";

const EditNginxLocation: FunctionalComponent<EditNginxLocationConnectedProps> = (props: EditNginxLocationConnectedProps) => {
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const nginxLocations = Array.from(props.nginxLocations.values());
    const nlocation = props.id !== undefined ? props.nginxLocations.get(props.id) : undefined;

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
    if(nlocation === undefined) {
        return null;
    }
    if(!didSetDefaults) {
        setName(nlocation.name);
        setType(nlocation.type);
        setPath(nlocation.path);
        setEndpoint(nlocation.endpoint);
        setDidSetDefaults(true);
    }

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-nginx-location"]} />
                <div className={baseStyle["page-title"]}>Edit Nginx Location</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Location ID: </div>
                    <input className={formStyle["page-form-input"]} value={nlocation.id} disabled />
                </div>
                <FormRowInput name="Location name" placeholder="my-nginx-location..." value={name} satisfies={nameSatisfies} set={setName} />
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
                <FormRowInput name="Location path" placeholder="path or empty for root..." value={path} set={setPath} />
                <FormRowInput name="Location endpoint" placeholder="127.0.0.1:8080..." value={endpoint} satisfies={endpointSatisfies} set={setEndpoint} />
                <FormRowButton name="Edit!" satisfies={satisfies} onClick={() => {
                    props.actions.editNginxLocation({
                        id: nlocation.id, name, type, path, endpoint
                    });
                    setTimeout(() => { location.href = "/"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(EditNginxLocation);
