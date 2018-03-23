'use strict';

var BOOLEAN = 'boolean';
var OBJECT = 'object';
var NUMBER = 'number';
var STRING = 'string';
var FUNCTION = 'function';
var MUST_BE = ' must be';
var PARAM_NAME = 'paramName';

module.exports.bool = function _bool(param, paramName) {
    _string(paramName, PARAM_NAME);
    if (typeof param !== BOOLEAN) {
        throw new Error(paramName + MUST_BE + ' a ' + BOOLEAN);
    }
};

module.exports.func = function _func (param, paramName) {
    _string(paramName, PARAM_NAME);
    if (typeof param !== FUNCTION) {
        throw new Error(paramName + MUST_BE + ' a ' + FUNCTION);
    }
};

module.exports.object = function _object (param, paramName) {
    _string(paramName, PARAM_NAME);
    if (typeof param !== OBJECT || !param) {
        throw new Error(paramName + MUST_BE + ' an ' + OBJECT);
    }
};

function _array (param, paramName) {
    _string(paramName, PARAM_NAME);
    if (!Array.isArray(param)) {
        throw new Error(paramName + MUST_BE + ' an array');
    }
};

module.exports.array = _array;

function _number (param, paramName) {
    _string(paramName, PARAM_NAME);
    if (typeof param !== NUMBER || Number.isNaN(param)) {
        throw new Error(paramName + MUST_BE + ' a ' + NUMBER);
    }
    return {
        positive: function(){
            if (param <= 0) {
                throw new Error(paramName + MUST_BE + ' a positive ' + NUMBER);
            }
        }
    }
}

module.exports.number = _number;

function _string (param, paramName) {
    if (typeof paramName !== STRING){
        throw new Error(PARAM_NAME + MUST_BE + ' a ' + STRING);
    }
    if (typeof param !== STRING) {
        throw new Error(paramName + MUST_BE + ' a ' + STRING);
    }
    return {
        oneOf: function(arr){
            _array(arr, '.oneOf() argument');
            if (arr.length === 0){
                throw new Error('empty array passed to .oneOf()');
            }
            for (var i = 0; i < arr.length; i++){
                _string(arr[i], '.oneOf()[' + i + ']');
                if (arr[i] === param){
                    return;
                }
            }
            throw new Error(paramName + MUST_BE + ' one of ' + JSON.stringify(arr))
        }
    }
};

module.exports.string = _string;

//fequently used arg names
module.exports.names = {
    params: 'params',
    options: 'options',
    cb: 'cb'
};