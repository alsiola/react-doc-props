import { oneOf } from './index';
import ReactPropTypes from 'prop-types';
import { ReactPropTypesSecret } from './utils'
const dummyProps = {
	aoneof: 2,
	aoneother: 3,
	anotone: 4
};

describe('oneOf', () => {
	test('returns correct displayName when not supplied', () => {
		const { displayName } = oneOf([2, 3])();

		expect(displayName).toEqual(`One of [2, 3]`);
	});

	test('returns correct required value', () => {
		const isRequired = oneOf.isRequired([2, 3])().required;
		const notRequired = oneOf([2, 3])().required;

		expect(isRequired).toEqual(true);
		expect(notRequired).toEqual(false);
	})

	test('returns correct proptype when not required', () => {
		const { getReactPT } = oneOf([2, 3])();
		const reactPT = getReactPT();
		const realReactPT = ReactPropTypes.oneOf([2, 3]);

		expect(reactPT(dummyProps, 'aoneof', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'aoneof', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'ooneother', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'ooneother', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anotone', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'anotone', 'dummy', 'test', null, ReactPropTypesSecret));
	});

	test('returns correct proptype when required', () => {
		const { getReactPT } = oneOf.isRequired([2, 3])();
		const reactPT = getReactPT();
		const realReactPT = ReactPropTypes.oneOf([2, 3]).isRequired;

		expect(reactPT(dummyProps, 'aoneof', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'aoneof', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'ooneother', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'ooneother', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anotone', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'anotone', 'dummy', 'test', null, ReactPropTypesSecret));
	});

	test('produces correct documentation object when not required', () => {
		const { getDocs } = oneOf([2, 3])();

		const prop = {
			type: oneOf([2, 3]),
			description: 'An enum'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: `One of [2, 3]`,
			required: false,
			description: 'An enum'
		};

		expect(docs).toEqual(expectedDocs);
	});

	test('produces correct documentation object when required', () => {
		const { getDocs } = oneOf.isRequired([2, 3])();

		const prop = {
			type: oneOf.isRequired([2, 3]),
			description: 'An enum'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: `One of [2, 3]`,
			required: true,
			description: 'An enum'
		};

		expect(docs).toEqual(expectedDocs);
	});
});