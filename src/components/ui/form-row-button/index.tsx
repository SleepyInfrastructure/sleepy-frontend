/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import baseStyle from "../form/style.scss";
import style from "./style.scss";
/* Components */
import Button from "../button";

type FormRowButtonConnectedProps = {
    name: string;
    satisfies: boolean;
    onClick: () => void;
};

const FormRowButton: FunctionalComponent<FormRowButtonConnectedProps> = (props: FormRowButtonConnectedProps) => {
    return (
        <Button disabled={!props.satisfies} className={style["page-form-button"]} secondary onClick={props.onClick}>
            {props.name}
        </Button>
    );
};

export default FormRowButton;
