/* Base */
import { h, FunctionalComponent } from "preact";
/* Components */
import SMBShare from "../smb-share";
import SMBUser from "../smb-user";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const SMBInstance: FunctionalComponent<SMBInstanceConnectedProps> = (props: SMBInstanceConnectedProps) => {
    return (
        <div id={`smb-instance-${props.item.id}`} className={baseStyle.panel}>
            <div className={baseStyle["panel-header"]}>
                <div className={style["icon-smb"]} />
                <div className={baseStyle["panel-name"]}>{props.item.name}</div>
                <a className={baseStyle["panel-link"]} data="green" onClick={() => { location.href = `/create-smb-share/${props.item.id}`; }}>(Add share)</a>
                <a className={baseStyle["panel-link"]} data="green" onClick={() => { location.href = `/create-smb-user/${props.item.id}`; }}>(Add user)</a>
                <a className={baseStyle["panel-link"]} onClick={() => { location.href = `/edit-smb-instance/${props.item.id}`; }}>(Edit)</a>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { props.actions.deleteSmbInstance(props.item.id); }}>(Delete)</a>
            </div>
            <div className={baseStyle["panel-content"]}>
                <div className={baseStyle["panel-content-row"]}>ID: <span className={baseStyle["panel-content-row-highlight"]}>{props.item.id}</span></div>
                <div className={style["smb-content-items"]}>
                    <div className={style["smb-content-shares"]}>
                        {props.item.shares.map((e, i) => {
                            const users = props.item.users.filter(el => e.users.includes(el.id));
                            return <SMBShare key={i} item={e} users={users} actions={props.actions} />;
                        })}
                    </div>
                    <div className={style["smb-content-users"]}>
                        {props.item.users.map((e, i) => <SMBUser key={i} item={e} actions={props.actions} /> )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SMBInstance;
