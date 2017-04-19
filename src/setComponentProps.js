import { docsToProps } from './docsToProps';
import { docsToDefaults } from './docsToDefaults';

export const setComponentProps = (documentation, component) => {
    component.propTypes = docsToProps(documentation);
    component.defaultProps = docsToDefaults(documentation);
}