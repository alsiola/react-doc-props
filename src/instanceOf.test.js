import { instanceOf } from './index';
import ReactPropTypes from 'prop-types';

class TestType { }

const dummyProps = {
	adate: new TestType(),
	anumber: 3
};

describe('instanceOf', () => {
	test('returns correct displayName when not supplied', () => {
		const { displayName } = instanceOf(TestType)();

		expect(displayName).toEqual(`Instance Of ${TestType.constructor.name}`);
	});

	test('returns correct displayName when supplied', () => {
		const { displayName } = instanceOf(TestType, 'TestType')();

		expect(displayName).toEqual(`Instance Of TestType`);
	})

	test('returns correct required value', () => {
		const isRequired = instanceOf.isRequired(TestType)().required;
		const notRequired = instanceOf(TestType)().required;

		expect(isRequired).toEqual(true);
		expect(notRequired).toEqual(false);
	})

	test('returns correct proptype when not required', () => {
		const { getReactPT } = instanceOf(TestType)();
		const reactPT = getReactPT();
		expect(reactPT(dummyProps, 'adate', 'dummy')).toEqual(ReactPropTypes.instanceOf(TestType)(dummyProps, 'adate', 'dummy'));
		expect(reactPT(dummyProps, 'undef', 'dummy')).toEqual(ReactPropTypes.instanceOf(TestType)(dummyProps, 'undef', 'dummy'));
		expect(reactPT(dummyProps, 'anumber', 'dummy')).toEqual(ReactPropTypes.instanceOf(TestType)(dummyProps, 'anumber', 'dummy'));
	});

	test('returns correct proptype when required', () => {
		const { getReactPT } = instanceOf.isRequired(TestType)();
		const reactPT = getReactPT();

		expect(reactPT(dummyProps, 'adate', 'dummy')).toEqual(ReactPropTypes.instanceOf(TestType).isRequired(dummyProps, 'adate', 'dummy'));
		expect(reactPT(dummyProps, 'undef', 'dummy')).toEqual(ReactPropTypes.instanceOf(TestType).isRequired(dummyProps, 'undef', 'dummy'));
		expect(reactPT(dummyProps, 'anumber', 'dummy')).toEqual(ReactPropTypes.instanceOf(TestType).isRequired(dummyProps, 'anumber', 'dummy'));
	});

	test('produces correct documentation object when not required', () => {
		const { getDocs } = instanceOf(Date)();

		const prop = {
			type: instanceOf(TestType),
			description: 'A date'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: `Instance Of ${TestType.constructor.name}`,
			required: false,
			description: 'A date'
		};

		expect(docs).toEqual(expectedDocs);
	});

	test('produces correct documentation object when required', () => {
		const { getDocs } = instanceOf.isRequired(TestType, 'TestType')();

		const prop = {
			type: instanceOf.isRequired(TestType, 'TestType'),
			description: 'A date'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: `Instance Of TestType`,
			required: true,
			description: 'A date'
		};

		expect(docs).toEqual(expectedDocs);
	});
});