/**
 * Я заметил, что часто повторяется код проверки аргументов функций, поэтому вынес его сюда.
 */

var OBJECT = 'object';
var NUMBER = 'number';
var STRING = 'string';
var FUNCTION = 'function';
var MUST_BE = ' must be';

module.exports.throwIfNotAString = function _throwIfNotAString(param, paramName){
    if (typeof param !== 'string'){
        throw new Error(paramName + MUST_BE + ' a ' + STRING);
    }
};

module.exports.throwIfNotAnObject = function _throwIfNotAnObject(param, paramName){
    if (typeof param !== OBJECT || !param){
        throw new Error(paramName + MUST_BE + ' an ' + OBJECT);
    }
};

module.exports.throwIfNotANumber =  function _throwIfNotANumber(param, paramName){
    if (typeof param !== NUMBER || Number.isNaN(param)){
        throw new Error(paramName + MUST_BE + ' a ' + NUMBER);
    }
};

module.exports.throwIfNotAFunction =  function _throwIfNotAFunction(param, paramName){
    if (typeof param !== FUNCTION ){
        throw new Error(paramName + MUST_BE + ' a ' + FUNCTION);
    }
};

module.exports.throwIfNotPositive = function _throwIfNotPositive(param, paramName){
    if (param <= 0){
        throw new Error(paramName + MUST_BE + ' positive');
    }
};


/**
 * Часто используемые имена аргументов.
 */
module.exports.frequentArgNames = {
    params: 'params',
    options: 'options',
    ppkNum: 'ppkNum',
    cb: 'cb'
};