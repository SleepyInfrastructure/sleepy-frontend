/* Base */
import { h } from "preact";
import { Provider } from "react-redux";
/* Redux */
import store from "./redux/store";
/* Styles */
import "./style/default.scss";
import "./style/variables.scss";
import "./style/g6.scss";
/* Components */
import App from "./components/app";

const AppContainer = (): JSX.Element => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default AppContainer;
