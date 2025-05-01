const Loading = ({ loading, error, children }) => {
    const elementType = children.type?.render?.displayName;

    const renderLoading = () => {
        if (elementType === "Button") {
            const cloneButton = React.cloneElement(children, { disabled: true }, "Loading...");
            return (
                <> {loading ? cloneButton : error ? <> {children} <p>{error}</p></> : children} </>
            );
        }
        return (
            <> {loading ? <p>Loading please wait...</p> : error ? <p>{error}</p> : children} </>
        );
    }

    return renderLoading();
}

export default Loading
