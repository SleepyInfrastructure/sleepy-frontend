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
import FormRowButton from "../../components/ui/form-row-button";
import FormRowInput from "../../components/ui/form-row-input";

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
                <div className={style["icon-nginx-instance"]} />
                <div className={baseStyle["page-title"]}>Edit Nginx Instance</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Instance ID: </div>
                    <input className={formStyle["page-form-input"]} value={instance.id} disabled />
                </div>
                <FormRowInput name="Instance name" placeholder="my-nginx-instance..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowButton name="Edit!" satisfies={satisfies} onClick={() => {
                    props.actions.editNginxInstance({ id: instance.id, name });
                    setTimeout(() => { location.href = "/overview"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(EditNginxInstance);
