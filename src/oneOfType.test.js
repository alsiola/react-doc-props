import { oneOfType, string, number, shape } from './index';
import ReactPropTypes from 'prop-types';

const dummyProps = {
	astring: 'hello',
	anumber: 3,
	aboolean: true
};

describe('oneOfType', () => {
	test('returns correct displayName', () => {
		const { displayName } = oneOfType([ string, number ])();

		expect(displayName).toEqual('One of type [String, Number]');
	});

	test('returns correct required value', () => {
		const isRequired = oneOfType.isRequired([ string, number ])().required;
		const notRequired = oneOfType([string, number])().required;

		expect(isRequired).toEqual(true);
		expect(notRequired).toEqual(false);
	})

	test('returns correct proptype when not required', () => {
		const { getReactPT } = oneOfType([string, number])();
		const reactPT = getReactPT();
		const realReactPT = ReactPropTypes.oneOfType([
			ReactPropTypes.string,
			ReactPropTypes.number
		]);
		expect(reactPT(dummyProps, 'astring', 'dummy')).toEqual(realReactPT(dummyProps, 'astring', 'dummy'));
		expect(reactPT(dummyProps, 'aboolean', 'dummy')).toEqual(realReactPT(dummyProps, 'aboolean', 'dummy'));
		expect(reactPT(dummyProps, 'anumber', 'dummy')).toEqual(realReactPT(dummyProps, 'anumber', 'dummy'));
	});

	test('returns correct proptype when required', () => {
		const { getReactPT } = oneOfType.isRequired([string, number])();
		const reactPT = getReactPT();
		const realReactPT = ReactPropTypes.oneOfType([
			ReactPropTypes.string,
			ReactPropTypes.number
		]).isRequired;
		expect(reactPT(dummyProps, 'astring', 'dummy')).toEqual(realReactPT(dummyProps, 'astring', 'dummy'));
		expect(reactPT(dummyProps, 'aboolean', 'dummy')).toEqual(realReactPT(dummyProps, 'aboolean', 'dummy'));
		expect(reactPT(dummyProps, 'anumber', 'dummy')).toEqual(realReactPT(dummyProps, 'anumber', 'dummy'));
		expect(reactPT(dummyProps, 'undef', 'dummy')).toEqual(realReactPT(dummyProps, 'undef', 'dummy'));
	});

	test('produces correct documentation object when not required', () => {
		const { getDocs } = oneOfType([string, number])();

		const prop = {
			type: oneOfType([string, number]),
			description: 'A type list'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'One of type [String, Number]',
			required: false,
			description: 'A type list',
			types: [
				{
					type: 'String'
				},
				{
					type: 'Number'
				}
			]
		};

		expect(docs).toEqual(expectedDocs);
	});

	test('produces correct documentation object when required', () => {
		const { getDocs } = oneOfType.isRequired([string, number])();

		const prop = {
			type: oneOfType.isRequired([string, number]),
			description: 'A type list'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'One of type [String, Number]',
			required: true,
			description: 'A type list',
			types: [
				{
					type: 'String'
				},
				{
					type: 'Number'
				}
			]
		};

		expect(docs).toEqual(expectedDocs);
	});

	test('produces correct documentation object with deep shape', () => {
		const deepShape = {
			astring: {
				type: string,
				description: 'A string'
			}
		};

		const { getDocs } = oneOfType([string, shape(deepShape)])();

		const prop = {
			type: oneOfType([string, shape(deepShape)]),
			description: 'A one of type with shape'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'One of type [String, Shape]',
			required: false,
			description: 'A one of type with shape',
			types: [
				{
					type: 'String'
				},
				{
					type: 'Shape',
					shape: {
						astring: {
							type: 'String',
							description: 'A string'
						}
					}
				}
			]
		};

		expect(docs).toEqual(expectedDocs);
	});
});