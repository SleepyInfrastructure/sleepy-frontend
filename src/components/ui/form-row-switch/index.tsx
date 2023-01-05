/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../form/style.scss";
import style from "./style.scss";

type FormRowSwitchConnectedProps = {
    name: string;
    checked: boolean;
    onClick: (value: boolean) => void;
};

const FormRowSwitch: FunctionalComponent<FormRowSwitchConnectedProps> = (props: FormRowSwitchConnectedProps) => {
    return (
        <div className={baseStyle["page-form-row"]}>
            <div className={baseStyle["page-form-text"]}>{props.name}: </div>
            <div className={style["page-form-switch"]} onClick={() => { props.onClick(!props.checked); }}>
                <input type="checkbox" checked={props.checked} />
                <div className={style["page-form-switch-slider"]} />
            </div>
        </div>
    );
};

export default FormRowSwitch;
