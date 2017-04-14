import { string, number, array, bool } from './index';
import ReactPropTypes from 'prop-types';
import { ReactPropTypesSecret } from './utils';

const dummyProps = {
	astring: 'hello',
	anumber: 3,
	anarray: [],
	aboolean: true
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
	});

	test('returns correct proptype when not required', () => {
		const { getReactPT } = string();
		const reactPT = getReactPT();
		expect(reactPT(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.string(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.string(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anumber', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.string(dummyProps, 'anumber', 'dummy', 'test', null, ReactPropTypesSecret));
	});

	test('returns correct proptype when required', () => {
		const { getReactPT } = string.isRequired();
		const reactPT = getReactPT();

		expect(reactPT(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.string.isRequired(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.string.isRequired(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anumber', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.string.isRequired(dummyProps, 'anumber', 'dummy', 'test', null, ReactPropTypesSecret));
	});

	test('returns correct proptype for number', () => {
		const { getReactPT } = number.isRequired();
		const reactPT = getReactPT();

		expect(reactPT(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.number.isRequired(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.number.isRequired(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anumber', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.number.isRequired(dummyProps, 'anumber', 'dummy', 'test', null, ReactPropTypesSecret));
	});

	test('returns correct proptype for array', () => {
		const { getReactPT } = array.isRequired();
		const reactPT = getReactPT();

		expect(reactPT(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.array.isRequired(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.array.isRequired(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anarray', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.array.isRequired(dummyProps, 'anarray', 'dummy', 'test', null, ReactPropTypesSecret));
	});

	test('returns correct proptype for a boolean', () => {
		const { getReactPT } = bool.isRequired();
		const reactPT = getReactPT();

		expect(reactPT(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.bool.isRequired(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.bool.isRequired(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'aboolean', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.bool.isRequired(dummyProps, 'aboolean', 'dummy', 'test', null, ReactPropTypesSecret));
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