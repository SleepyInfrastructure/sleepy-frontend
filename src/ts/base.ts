type AppConnectedProps = ReduxState & {
    actions: ConnectedActions;
};
type AppPreferences = {
    theme: "dark" | "light";
};