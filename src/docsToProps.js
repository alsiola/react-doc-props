import { mapToReactPT } from './utils';

export const docsToProps = (docs) => {
	return mapToReactPT(docs.props);
};