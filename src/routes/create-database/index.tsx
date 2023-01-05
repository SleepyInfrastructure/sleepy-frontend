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

const CreateDatabase: FunctionalComponent<CreateDatabaseConnectedProps> = (props: CreateDatabaseConnectedProps) => {
    const [satisfies, setSatisfies] = useState(false);
    const databases = Array.from(props.databases.values());

    const [name, setName] = useState("");
    const nameSatisfies = useCallback(() => {
        return name.length < 3 ? "(is not atleast 3 characters)" : (databases.some(e => e.name === name) ? "(database with same name exists)" : "(satisfies)");
    }, [databases, name]);

    useEffect(() => {
        setSatisfies(nameSatisfies() === "(satisfies)");
    }, [nameSatisfies]);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={baseStyle["page-header"]}>
                <div className={style["icon-database"]} />
                <div className={baseStyle["page-title"]}>Create Database</div>
            </div>
            <div className={formStyle["page-form"]}>
                <FormRowInput name="Database name" placeholder="my-database..." value={name} satisfies={nameSatisfies} set={setName} />
                <FormRowButton name="Create!" satisfies={satisfies} onClick={() => {
                    props.actions.createDatabase({ server: props.id ?? "", name });
                    setTimeout(() => { location.href = `/server/${props.id}`; }, 1000);
                }} />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(CreateDatabase);
