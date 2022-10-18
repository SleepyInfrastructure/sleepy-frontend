/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useRef, useState } from "react";
import XTerm from "../../scripts/xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { WebLinksAddon } from "xterm-addon-web-links";
import { CanvasAddon } from "xterm-addon-canvas";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const LogView: FunctionalComponent<LogViewConnectedProps> = (props: LogViewConnectedProps) => {
    /* Resize hooks */
    const [resizeID, setResizeID] = useState(setTimeout(() => { /* */ }, 0));
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
    useEffect(() => {
        window.addEventListener("resize", () => {
            clearTimeout(resizeID);
            setResizeID(
                setTimeout(() => {
                    setDimensions({ w: window.innerWidth, h: window.innerHeight });
                }, 500)
            );
        });
    }, []);

    /* XTerm hooks */
    const xtermRef = useRef<XTerm>(null);
    const [addons, setAddons] = useState([new FitAddon(), new SearchAddon(), new WebLinksAddon()]);
    const [rows, setRows] = useState(40);
    const [lastLine, setLastLine] = useState(0);

    useEffect(() => {
        if(addons.length <= 3) {
            setAddons([...addons, new CanvasAddon()]);
        }
        (addons[0] as FitAddon).fit();
        xtermRef.current?.terminal.resize(xtermRef.current.terminal.cols, rows);
    }, [xtermRef, rows, dimensions]);
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
                {props.requestFile === undefined ? null :<a className={baseStyle["panel-link"]} data="blue" onClick={props.requestFile}>(Request Log)</a>}
            </div>
            <div className={baseStyle["panel-content"]}>
                <XTerm className={style["log-view-terminal"]} addons={addons} ref={xtermRef} options={{ allowProposedApi: true }} />
            </div>
        </div>
    );
};

export default LogView;
