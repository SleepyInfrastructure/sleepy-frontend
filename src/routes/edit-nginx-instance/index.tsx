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

const EditNginxInstance: FunctionalComponent<EditNginxInstanceConnectedProps> = (props: EditNginxInstanceConnectedProps) => {
    const [didSetDefaults, setDidSetDefaults] = useState(false);
    const [satisfies, setSatisfies] = useState(false);
    const nginxInstances = Array.from(props.nginxInstances.values());
    const instance = props.id !== undefined ? props.nginxInstances.get(props.id) : undefined;

    const [name, setName] = useState("");
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (nginxInstances.some(e => e.name === name) ? "(instance with same name exists)" : "(satisfies)");
    }, [name, nginxInstances]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)");
    }, [nameSatisfies]);
    if(instance === undefined) {
        return null;
    }
    if(!didSetDefaults) {
        setName(instance.name);
        setDidSetDefaults(true);
    }

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-nginx"]} />
                <div className={baseStyle["page-title"]}>Edit Nginx Instance</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Instance ID: </div>
                    <input className={formStyle["page-form-input"]} value={instance.id} disabled />
                </div>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Instance name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-nginx-instance..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                        props.actions.editNginxInstance({ id: instance.id, name });
                        setTimeout(() => { location.href = "/"; }, 1000);
                    }}>
                    Edit!
                </Button>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(EditNginxInstance);
