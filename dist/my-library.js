(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prop-types')) :
	typeof define === 'function' && define.amd ? define(['exports', 'prop-types'], factory) :
	(factory((global['my-library'] = global['my-library'] || {}),global.PropTypes));
}(this, (function (exports,PropTypes) { 'use strict';

PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;

// takes a docs-prop object and returns a documentation object
var getDocs = function getDocs(prop) {
	var _prop$type = prop.type(),
	    displayName = _prop$type.displayName,
	    required = _prop$type.required;

	return {
		type: displayName,
		required: required,
		description: prop.description
	};
};

// makes a simple docs-prop type
var makeSimplePropType = function makeSimplePropType(displayName, reactPT) {
	var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	return {
		displayName: displayName,
		required: required,
		getReactPT: function getReactPT() {
			return reactPT;
		},
		getDocs: getDocs,
		getOneOfTypeDescription: function getOneOfTypeDescription() {
			return {
				type: displayName
			};
		}
	};
};

var mapObject = function mapObject(mapper) {
	return function (object) {
		return Object.keys(object).reduce(function (output, key) {
			output[key] = mapper(object[key]);
			return output;
		}, {});
	};
};

var mapToReactPT = mapObject(function (prop) {
	return prop.type().getReactPT();
});
var mapToDocs = mapObject(function (prop) {
	return prop.type().getDocs(prop);
});

var mapToOneOfTypeDescription = mapObject(function (prop) {
	var _prop$type$getDocs = prop.type(prop).getDocs(prop),
	    type = _prop$type$getDocs.type,
	    description = _prop$type$getDocs.description;

	return {
		type: type,
		description: description
	};
});

// takes a shape docs-prop and converts it to a documentation object
var getDocs$1 = function getDocs(prop) {
	var _prop$type = prop.type(),
	    displayName = _prop$type.displayName,
	    required = _prop$type.required,
	    shape = _prop$type.shape;

	return {
		type: displayName,
		required: required,
		description: prop.description,
		shape: mapToDocs(shape)
	};
};

// takes a doc-props shape object and returns the react proptype for that shape
var makeGetReactPT = function makeGetReactPT(required) {
	return function (theShape) {
		var reactPT = PropTypes.shape(mapToReactPT(theShape));

		return function () {
			if (required) return reactPT.isRequired;
			return reactPT;
		};
	};
};

// makes a doc-props shape proptype
var makeShapeProptype = function makeShapeProptype(required, theShape) {
	return function () {
		return {
			displayName: 'Shape',
			getReactPT: makeGetReactPT(required)(theShape),
			required: required,
			getDocs: getDocs$1,
			shape: theShape,
			getOneOfTypeDescription: function getOneOfTypeDescription() {
				return {
					type: 'Shape',
					shape: mapToOneOfTypeDescription(theShape)
				};
			}
		};
	};
};

// takes a shape docs-prop and converts it to a documentation object
var getDocs$2 = function getDocs(prop) {
	var _prop$type = prop.type(),
	    displayName = _prop$type.displayName,
	    required = _prop$type.required,
	    shape = _prop$type.shape;

	return {
		type: displayName,
		required: required,
		description: prop.description
	};
};

// takes a doc-props shape object and returns the react proptype for that shape
var makeGetReactPT$1 = function makeGetReactPT(required) {
	return function (theType) {
		var reactPT = PropTypes.instanceOf(theType);

		return function () {
			if (required) return reactPT.isRequired;
			return reactPT;
		};
	};
};

var getTypeName = function getTypeName(theType) {
	var funcNameRegex = /function (.{1,})\(/;
	var results = funcNameRegex.exec(theType.constructor.toString());
	return results && results.length > 1 ? results[1] : "Unknown type";
};

// makes a doc-props shape proptype
var makeInstanceOfProptype = function makeInstanceOfProptype(required, theType, typeName) {
	return function () {
		return {
			displayName: 'Instance Of ' + (typeName || getTypeName(theType)),
			getReactPT: makeGetReactPT$1(required)(theType),
			required: required,
			getDocs: getDocs$2
		};
	};
};

// takes a shape docs-prop and converts it to a documentation object
var getDocs$3 = function getDocs(prop) {
	var _prop$type = prop.type(),
	    displayName = _prop$type.displayName,
	    required = _prop$type.required;

	return {
		type: displayName,
		required: required,
		description: prop.description
	};
};

// takes a doc-props shape object and returns the react proptype for that shape
var makeGetReactPT$2 = function makeGetReactPT(required) {
	return function (theEnum) {
		var reactPT = PropTypes.oneOf(theEnum);

		return function () {
			if (required) return reactPT.isRequired;
			return reactPT;
		};
	};
};

var enumToName = function enumToName(theEnum) {
	return theEnum.map(function (item) {
		return ' ' + item;
	}).join().trim();
};

// makes a doc-props shape proptype
var makeOneOfProptype = function makeOneOfProptype(required, theEnum) {
	return function () {
		return {
			displayName: 'One of [' + enumToName(theEnum) + ']',
			getReactPT: makeGetReactPT$2(required)(theEnum),
			required: required,
			getDocs: getDocs$3
		};
	};
};

// takes a shape docs-prop and converts it to a documentation object
var getDocs$4 = function getDocs(theTypes) {
	return function (prop) {
		var _prop$type = prop.type(),
		    displayName = _prop$type.displayName,
		    required = _prop$type.required;

		return {
			type: displayName,
			required: required,
			description: prop.description,
			types: theTypes.map(function (type) {
				return type().getOneOfTypeDescription();
			})
		};
	};
};

// takes a doc-props shape object and returns the react proptype for that shape
var makeGetReactPT$3 = function makeGetReactPT(required) {
	return function (theTypes) {
		var reactPT = PropTypes.oneOfType(theTypes.map(function (type) {
			return type().getReactPT();
		}));

		return function () {
			if (required) return reactPT.isRequired;
			return reactPT;
		};
	};
};

var typesToName = function typesToName(theTypes) {
	return theTypes.map(function (type) {
		return ' ' + type().displayName;
	}).join().trim();
};

// makes a doc-props oneOfType proptype
var makeOneOfTypeProptype = function makeOneOfTypeProptype(required, theTypes) {
	return function () {
		return {
			displayName: 'One of type [' + typesToName(theTypes) + ']',
			getReactPT: makeGetReactPT$3(required)(theTypes),
			required: required,
			getDocs: getDocs$4(theTypes)
		};
	};
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var getArrayOfDoc = function getArrayOfDoc(theType) {
	if ('type' in theType) {
		return theType.type().getDocs(theType);
	}

	var _theType = theType(),
	    getDocs = _theType.getDocs,
	    getReactPT = _theType.getReactPT,
	    getOneOfTypeDescription = _theType.getOneOfTypeDescription,
	    displayName = _theType.displayName,
	    required = _theType.required,
	    shape = _theType.shape,
	    arrayOf = _theType.arrayOf,
	    rest = objectWithoutProperties(_theType, ['getDocs', 'getReactPT', 'getOneOfTypeDescription', 'displayName', 'required', 'shape', 'arrayOf']);

	return _extends({
		type: displayName,
		required: required
	}, rest);
};

// takes a shape docs-prop and converts it to a documentation object
var getDocs$5 = function getDocs(theType) {
	return function (prop) {
		var _prop$type = prop.type(),
		    displayName = _prop$type.displayName,
		    required = _prop$type.required,
		    description = _prop$type.description,
		    arrayOf = _prop$type.arrayOf;

		return {
			type: displayName,
			required: required,
			description: prop.description,
			arrayOf: getArrayOfDoc(theType)
		};
	};
};

// takes a doc-props shape object and returns the react proptype for that shape
var makeGetReactPT$4 = function makeGetReactPT(required) {
	return function (theType) {
		var arrayOfType = 'type' in theType ? theType.type().getReactPT() : theType().getReactPT();
		var reactPT = PropTypes.arrayOf(arrayOfType);

		return function () {
			if (required) return reactPT.isRequired;
			return reactPT;
		};
	};
};

var typeToName = function typeToName(theType) {
	if ('type' in theType) {
		return theType.type().displayName;
	}
	return theType().displayName;
};

// makes a doc-props arrayOf proptype
var makeArrayOfProptype = function makeArrayOfProptype(required, theType) {
	return function () {
		return {
			displayName: 'Array of type ' + typeToName(theType),
			getReactPT: makeGetReactPT$4(required)(theType),
			required: required,
			getDocs: getDocs$5(theType),
			arrayOf: theType
		};
	};
};

var getObjectOfDoc = function getObjectOfDoc(theType) {
	if ('type' in theType) {
		return theType.type().getDocs(theType);
	}

	var _theType = theType(),
	    getDocs = _theType.getDocs,
	    getReactPT = _theType.getReactPT,
	    getOneOfTypeDescription = _theType.getOneOfTypeDescription,
	    displayName = _theType.displayName,
	    required = _theType.required,
	    shape = _theType.shape,
	    arrayOf = _theType.arrayOf,
	    rest = objectWithoutProperties(_theType, ['getDocs', 'getReactPT', 'getOneOfTypeDescription', 'displayName', 'required', 'shape', 'arrayOf']);

	return _extends({
		type: displayName,
		required: required
	}, rest);
};

// takes a shape docs-prop and converts it to a documentation object
var getDocs$6 = function getDocs(theType) {
	return function (prop) {
		var _prop$type = prop.type(),
		    displayName = _prop$type.displayName,
		    required = _prop$type.required,
		    description = _prop$type.description,
		    arrayOf = _prop$type.arrayOf;

		return {
			type: displayName,
			required: required,
			description: prop.description,
			objectOf: getObjectOfDoc(theType)
		};
	};
};

// takes a doc-props shape object and returns the react proptype for that shape
var makeGetReactPT$5 = function makeGetReactPT(required) {
	return function (theType) {
		var arrayOfType = 'type' in theType ? theType.type().getReactPT() : theType().getReactPT();
		var reactPT = PropTypes.objectOf(arrayOfType);

		return function () {
			if (required) return reactPT.isRequired;
			return reactPT;
		};
	};
};

var typeToName$1 = function typeToName(theType) {
	if ('type' in theType) {
		return theType.type().displayName;
	}
	return theType().displayName;
};

// makes a doc-props objectOf proptype
var makeObjectOfProptype = function makeObjectOfProptype(required, theType) {
	return function () {
		return {
			displayName: 'Object with ' + typeToName$1(theType) + ' property values',
			getReactPT: makeGetReactPT$5(required)(theType),
			required: required,
			getDocs: getDocs$6(theType),
			arrayOf: theType
		};
	};
};

var docsToProps = function docsToProps(docs) {
	return mapToReactPT(docs.props);
};

function string() {
	return makeSimplePropType('String', PropTypes.string);
}

string.isRequired = function () {
	return makeSimplePropType('String', PropTypes.string.isRequired, true);
};

function number() {
	return makeSimplePropType('Number', PropTypes.number);
}

number.isRequired = function () {
	return makeSimplePropType('Number', PropTypes.number.isRequired, true);
};

function array() {
	return makeSimplePropType('Array', PropTypes.array);
}

array.isRequired = function () {
	return makeSimplePropType('Array', PropTypes.array.isRequired, true);
};

function bool() {
	return makeSimplePropType('Boolean', PropTypes.bool);
}

bool.isRequired = function () {
	return makeSimplePropType('Boolean', PropTypes.bool.isRequired, true);
};

function func() {
	return makeSimplePropType('Function', PropTypes.func);
}

func.isRequired = function () {
	return makeSimplePropType('Function', PropTypes.func.isRequired, true);
};

function object() {
	return makeSimplePropType('Object', PropTypes.object);
}

object.isRequired = function () {
	return makeSimplePropType('Object', PropTypes.object.isRequired, true);
};

function symbol() {
	return makeSimplePropType('Symbol', PropTypes.symbol);
}

symbol.isRequired = function () {
	return makeSimplePropType('Symbol', PropTypes.symbol.isRequired, true);
};

function any() {
	return makeSimplePropType('Any', PropTypes.any);
}

any.isRequired = function () {
	return makeSimplePropType('Any', PropTypes.any.isRequired, true);
};

function node() {
	return makeSimplePropType('Node', PropTypes.any);
}

node.isRequired = function () {
	return makeSimplePropType('Node', PropTypes.node.isRequired, true);
};

function element() {
	return makeSimplePropType('Element', PropTypes.element);
}

element.isRequired = function () {
	return makeSimplePropType('Element', PropTypes.element, true);
};

function shape(theShape) {
	return makeShapeProptype(false, theShape);
}

shape.isRequired = function (theShape) {
	return makeShapeProptype(true, theShape);
};

function instanceOf(theType, typeName) {
	return makeInstanceOfProptype(false, theType, typeName);
}

instanceOf.isRequired = function (theType, typeName) {
	return makeInstanceOfProptype(true, theType, typeName);
};

function oneOf(theEnum) {
	return makeOneOfProptype(false, theEnum);
}

oneOf.isRequired = function (theEnum) {
	return makeOneOfProptype(true, theEnum);
};

function oneOfType(theTypes) {
	return makeOneOfTypeProptype(false, theTypes);
}

oneOfType.isRequired = function (theTypes) {
	return makeOneOfTypeProptype(true, theTypes);
};

function arrayOf(theType) {
	return makeArrayOfProptype(false, theType);
}

arrayOf.isRequired = function (theType) {
	return makeArrayOfProptype(true, theType);
};

function objectOf(theType) {
	return makeObjectOfProptype(false, theType);
}

objectOf.isRequired = function (theType) {
	return makeObjectOfProptype(true, theType);
};

exports.string = string;
exports.number = number;
exports.array = array;
exports.bool = bool;
exports.func = func;
exports.object = object;
exports.symbol = symbol;
exports.any = any;
exports.node = node;
exports.element = element;
exports.shape = shape;
exports.instanceOf = instanceOf;
exports.oneOf = oneOf;
exports.oneOfType = oneOfType;
exports.arrayOf = arrayOf;
exports.objectOf = objectOf;
exports.docsToProps = docsToProps;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=my-library.js.map
