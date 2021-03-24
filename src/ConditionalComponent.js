export const ConditionalComponent = ({boolean, ...props}) => {
    const { children } = props;
    if (boolean)
        return (
            children.map(child => {
                return child;
            })
        );
    return null;
}