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
                <div className={style["icon-nginx"]} />
                <div className={baseStyle["page-title"]}>Create Nginx Instance</div>
            </div>
            <div className={formStyle["page-form"]}>
                <div className={formStyle["page-form-row"]}>
                    <div className={formStyle["page-form-text"]}>Instance name: </div>
                    <input className={formStyle["page-form-input"]} placeholder="my-nginx-instance..." onInput={(e) => { setName(e.currentTarget.value); }} value={name} />
                    <div className={formStyle["page-form-error"]} data={nameSatisfies() === "(satisfies)" ? "false" : "true"}>{nameSatisfies()}</div>
                </div>
                <Button disabled={!satisfies} className={formStyle["page-form-button"]} secondary onClick={() => {
                        props.actions.createNginxInstance({ server: props.id ?? "", name, networks: [`${name}-network`] });
                        setTimeout(() => { location.href = "/"; }, 1000);
                    }}>
                    Create!
                </Button>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(CreateNginxInstance);
