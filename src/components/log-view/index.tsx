/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "react";
import XTerm from "../../scripts/xterm/xterm";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const LogView: FunctionalComponent<LogViewConnectedProps> = (props: LogViewConnectedProps) => {
    const xtermRef = useRef<XTerm>(null);
    const [rows, setRows] = useState(30);
    const [lastLine, setLastLine] = useState(0);
    useEffect(() => {
        xtermRef.current?.terminal.resize(xtermRef.current.terminal.cols, rows);
    }, [xtermRef, rows]);
    useEffect(() => {
        for(let i = lastLine; i < props.logs.length; i++) {
            xtermRef.current?.terminal.writeln(props.logs[i]);
        }
        setLastLine(props.logs.length);
    }, [props.logs.length]);

    return (
        <div className={style["log-view"]}>
            <div className={baseStyle["panel-header"]}>
                <div className={baseStyle["panel-name"]}>Log</div>
                <a className={baseStyle["panel-link"]} data="red" onClick={() => { setRows(Math.max(5, rows - 5)); }}>(Smaller)</a>
                <a className={baseStyle["panel-link"]} data="green" onClick={() => { setRows(Math.min(50, rows + 5)); }}>(Bigger)</a>
            </div>
            <div className={baseStyle["panel-content"]}>
                <XTerm className={style["log-view-terminal"]} ref={xtermRef} />
            </div>
        </div>
    );
};

export default LogView;
