/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../form/style.scss";
import style from "./style.scss";

type FormRowInputConnectedProps = {
    name: string;
    placeholder: string;
    value: string;
    set: (value: string) => void;
    satisfies?: () => "(satisfies)" | string;
};

const FormRowInput: FunctionalComponent<FormRowInputConnectedProps> = (props: FormRowInputConnectedProps) => {
    const satisfies = props.satisfies ? props.satisfies : () => "(satisfies)";
    return (
        <div className={baseStyle["page-form-row"]}>
            <div className={baseStyle["page-form-text"]}>{props.name}: </div>
            <input className={style["page-form-input"]} placeholder={props.placeholder} onInput={(e) => { props.set(e.currentTarget.value); }} value={props.value} />
            <div className={baseStyle["page-form-error"]} data={satisfies() === "(satisfies)" ? "false" : "true"}>{satisfies()}</div>
        </div>
    );
};

export default FormRowInput;
