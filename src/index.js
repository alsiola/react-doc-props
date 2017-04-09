import PropTypes from 'prop-types';
import { makeSimplePropType } from './makeSimplePropType';
import { makeShapeProptype } from './shape';



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


export function shape(theShape) {
	return makeShapeProptype(false, theShape);
}

shape.isRequired = function (theShape) {
	return makeShapeProptype(true, theShape);
}