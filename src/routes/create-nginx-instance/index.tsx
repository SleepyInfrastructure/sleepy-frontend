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
import FormRowInput from "../../components/ui/form-row-input";
import FormRowButton from "../../components/ui/form-row-button";

const CreateNginxInstance: FunctionalComponent<CreateNginxInstanceConnectedProps> = (props: CreateNginxInstanceConnectedProps) => {
    const [satisfies, setSatisfies] = useState(false);
    const nginxInstances = Array.from(props.nginxInstances.values());

    const [name, setName] = useState("");
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (nginxInstances.some(e => e.name === name) ? "(instance with same name exists)" : "(satisfies)");
    }, [name, nginxInstances]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)");
    }, [nameSatisfies]);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-nginx-instance"]} />
                <div className={baseStyle["page-title"]}>Create Nginx Instance</div>
            </div>
            <div className={formStyle["page-form"]}>
                <FormRowInput name="Instance name" placeholder="my-nginx-instance..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowButton name="Create!" satisfies={satisfies} onClick={() => {
                        props.actions.createNginxInstance({ server: props.id ?? "", name, networks: [`${name}-network`] });
                        setTimeout(() => { location.href = "/"; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(CreateNginxInstance);
