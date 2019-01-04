'use strict';

var BOOLEAN = 'boolean';
var OBJECT = 'object';
var NUMBER = 'number';
var STRING = 'string';
var FUNCTION = 'function';
var UNDEFINED = 'undefined';
var MUST_BE = ' must be';
var PARAM_NAME = 'paramName';

module.exports.bool = _bool;
function _bool(param, paramName) {
    _string(paramName, PARAM_NAME);
    if (typeof param !== BOOLEAN) {
        throw new Error(paramName + MUST_BE + ' a ' + BOOLEAN);
    }
}

module.exports.func = _func;
function _func (param, paramName) {
    _string(paramName, PARAM_NAME);
    if (typeof param !== FUNCTION) {
        throw new Error(paramName + MUST_BE + ' a ' + FUNCTION);
    }
}

module.exports.object = _object;
function _object (param, paramName) {
    _string(paramName, PARAM_NAME);
    if (typeof param !== OBJECT || !param) {
        throw new Error(paramName + MUST_BE + ' an ' + OBJECT);
    }
}

module.exports.array = _array;
function _array (param, paramName) {
    _string(paramName, PARAM_NAME);
    if (!Array.isArray(param)) {
        throw new Error(paramName + MUST_BE + ' an array');
    }
}

module.exports.number = _number;
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
    };
}

module.exports.string = _string;
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
            throw new Error(paramName + MUST_BE + ' one of ' + JSON.stringify(arr));
        },
        nonempty: function(){
            if (param === ''){
                throw new Error(paramName + ' must not be empty');
            }
        }
    };
}

function emptyFunc(){
    return;
}

//fequently used arg names
module.exports.names = {
    params: 'params',
    options: 'options',
    cb: 'cb',
};

//allow undefined
module.exports.maybe = {
    number: function(param, paramName){
        _string(paramName, PARAM_NAME);
        if (typeof param === UNDEFINED){
            return { positive: emptyFunc };
        }
        return _number(param, paramName);
    },
    string: function(param, paramName){
        _string(paramName, PARAM_NAME);
        if (typeof param === UNDEFINED){
            return { oneOf: emptyFunc, nonempty: emptyFunc };
        }
        return _string(param, paramName);
    },
    func: function(param, paramName){
        _string(paramName, PARAM_NAME);
        if (typeof param !== UNDEFINED){
            _func(param, paramName);
        }
    },
    bool: function(param, paramName){
        _string(paramName, PARAM_NAME);
        if (typeof param !== UNDEFINED){
            _bool(param, paramName);
        }
    },
};