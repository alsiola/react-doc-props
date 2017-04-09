import { string } from './index';
import ReactPropTypes from 'prop-types';

const dummyProps = {
	astring: 'hello',
	anumber: 3
}

describe('string', () => {
	test('returns correct displayName', () => {
		const { displayName } = string();

		expect(displayName).toEqual('String');
	});

	test('returns correct required value', () => {
		const isRequired = string.isRequired().required;
		const notRequired = string().required;

		expect(isRequired).toEqual(true);
		expect(notRequired).toEqual(false);
	})

	test('returns correct proptype when not required', () => {
		const { getReactPT } = string();
		const reactPT = getReactPT();
		expect(reactPT(dummyProps, 'astring', 'dummy')).toEqual(ReactPropTypes.string(dummyProps, 'astring', 'dummy'));
		expect(reactPT(dummyProps, 'undef', 'dummy')).toEqual(ReactPropTypes.string(dummyProps, 'undef', 'dummy'));
		expect(reactPT(dummyProps, 'anumber', 'dummy')).toEqual(ReactPropTypes.string(dummyProps, 'anumber', 'dummy'));
	});

	test('returns correct proptype when required', () => {
		const { getReactPT } = string.isRequired();
		const reactPT = getReactPT();

		expect(reactPT(dummyProps, 'astring', 'dummy')).toEqual(ReactPropTypes.string.isRequired(dummyProps, 'astring', 'dummy'));
		expect(reactPT(dummyProps, 'undef', 'dummy')).toEqual(ReactPropTypes.string.isRequired(dummyProps, 'undef', 'dummy'));
		expect(reactPT(dummyProps, 'anumber', 'dummy')).toEqual(ReactPropTypes.string.isRequired(dummyProps, 'anumber', 'dummy'));
	});

	test('produces correct documentation object when not required', () => {
		const { getDocs } = string();

		const prop = {
			type: string,
			description: 'A string'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'String',
			required: false,
			description: 'A string'
		};

		expect(docs).toEqual(expectedDocs);
	});

	test('produces correct documentation object when required', () => {
		const { getDocs } = string();

		const prop = {
			type: string.isRequired,
			description: 'A string'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'String',
			required: true,
			description: 'A string'
		};

		expect(docs).toEqual(expectedDocs);
	});
});