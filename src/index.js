import PropTypes from 'prop-types';
import { makeSimplePropType } from './makeSimplePropType';
import { makeShapeProptype } from './shape';
import { makeInstanceOfProptype } from './instanceOf';
import { makeOneOfProptype } from './oneOf';
import { makeOneOfTypeProptype } from './oneOfType';
import { makeArrayOfProptype } from './arrayOf';
import { makeObjectOfProptype } from './objectOf';

export { docsToProps } from './docsToProps';

export function string() {
	return makeSimplePropType('String', PropTypes.string);
}

string.isRequired = function () {
	return makeSimplePropType('String', PropTypes.string.isRequired, true);
}


export function number() {
	return makeSimplePropType('Number', PropTypes.number);
}

number.isRequired = function() {
	return makeSimplePropType('Number', PropTypes.number.isRequired, true);
}


export function array() {
	return makeSimplePropType('Array', PropTypes.array);
}

array.isRequired = function() {
	return makeSimplePropType('Array', PropTypes.array.isRequired, true);
}


export function bool() {
	return makeSimplePropType('Boolean', PropTypes.bool);
}

bool.isRequired = function() {
	return makeSimplePropType('Boolean', PropTypes.bool.isRequired, true);
}


export function func() {
	return makeSimplePropType('Function', PropTypes.func);
}

func.isRequired = function() {
	return makeSimplePropType('Function', PropTypes.func.isRequired, true);
}


export function object() {
	return makeSimplePropType('Object', PropTypes.object);
}

object.isRequired = function() {
	return makeSimplePropType('Object', PropTypes.object.isRequired, true);
}


export function symbol() {
	return makeSimplePropType('Symbol', PropTypes.symbol);
}

symbol.isRequired = function() {
	return makeSimplePropType('Symbol', PropTypes.symbol.isRequired, true);
}


export function any() {
	return makeSimplePropType('Any', PropTypes.any);
}

any.isRequired = function() {
	return makeSimplePropType('Any', PropTypes.any.isRequired, true);
}


export function node() {
	return makeSimplePropType('Node', PropTypes.any);
}

node.isRequired = function() {
	return makeSimplePropType('Node', PropTypes.node.isRequired, true);
}


export function element() {
	return makeSimplePropType('Element', PropTypes.element);
}

element.isRequired = function() {
	return makeSimplePropType('Element', PropTypes.element, true);
}

export function shape(theShape) {
	return makeShapeProptype(false, theShape);
}

shape.isRequired = function (theShape) {
	return makeShapeProptype(true, theShape);
}


export function instanceOf(theType, typeName) {
	return makeInstanceOfProptype(false, theType, typeName);
}

instanceOf.isRequired = function(theType, typeName) {
	return makeInstanceOfProptype(true, theType, typeName);
}


export function oneOf(theEnum) {
	return makeOneOfProptype(false, theEnum);
}

oneOf.isRequired = function(theEnum) {
	return makeOneOfProptype(true, theEnum);
}


export function oneOfType(theTypes) {
	return makeOneOfTypeProptype(false, theTypes);
}

oneOfType.isRequired = function (theTypes) {
	return makeOneOfTypeProptype(true, theTypes);
}


export function arrayOf(theType) {
	return makeArrayOfProptype(false, theType);
}

arrayOf.isRequired = function(theType) {
	return makeArrayOfProptype(true, theType);
}


export function objectOf(theType) {
	return makeObjectOfProptype(false, theType);
}

objectOf.isRequired = function(theType) {
	return makeObjectOfProptype(true, theType);
}