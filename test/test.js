var expect = require('chai').expect;
var arguard = require('../index');


describe('arguard.number() ', function(){
    it('should throw error if second arg is not a string', function(){
        expect(function(){ arguard.number(); }).to.throw(Error, /string/);
        expect(function(){ arguard.number(1); }).to.throw(Error, /string/);
    });
    it('should throw error if first arg is not a number or NaN', function(){
        var inputs = [undefined, null, true, false, '1', NaN, {}, [], function(){} ];
        for (var i = 0; i < inputs.length; i++){
            expect(function(){ arguard.number(inputs[i], 'foo'); }).to.throw(Error, /number/);
        }
    });
    it('should not throw error if first arg is a number', function(){
        var inputs = [-Infinity, -100, 0, 100.32, Infinity, -0];
        for (var i = 0; i < inputs.length; i++){
            expect(function(){ arguard.number(inputs[i], 'foo'); }).to.not.throw(Error);
        }
    });
    it('should return object with member called "positive"', function(){
        var result = arguard.number(1, 'foo');
        expect(result).to.have.a.property('positive');
    });
});

describe('arguard.number().positive() ', function(){
    it('should throw error if first arg is a negative number o zero', function(){
        var inputs = [ -Infinity, -3.14, -0, 0, +0 ];
        for (var i = 0; i < inputs.length; i++){
            expect(function(){ arguard.number(inputs[i], 'foo').positive(); }).to.throw(Error, /positive number/);
        }
    });
    it('should not throw error if first arg is a positive number', function(){
        var inputs = [1, 100.32, Infinity];
        for (var i = 0; i < inputs.length; i++){
            expect(function(){ arguard.number(inputs[i], 'foo').positive(); }).to.not.throw(Error);
        }
    });
});

describe('arguard.string() ', function(){
    it('should throw error if second arg is not a string', function(){
        expect(function(){ arguard.string(); }).to.throw(Error, /string/);
        expect(function(){ arguard.string('foo'); }).to.throw(Error, /string/);
    });
    it('should throw error if first arg is not a string', function(){
        var inputs = [undefined, null, true, false, 1, -1, NaN, {}, [], function(){} ];
        for (var i = 0; i < inputs.length; i++){
            expect(function(){ arguard.string(inputs[i], 'foo'); }).to.throw(Error, /string/);
        }
    });
    it('should not throw error if first arg is a string', function(){
        var inputs = ['', 'foo', Date.now().toString() ];
        for (var i = 0; i < inputs.length; i++){
            expect(function(){ arguard.string(inputs[i], 'foo'); }).to.not.throw(Error);
        }
    });
});

describe('arguard.string().oneOf() ', function(){
    it('should throw error if arg passed to oneOf is not an array', function(){
        expect(function(){ arguard.string('foo', 'foo').oneOf('foo', 'bar'); }).to.throw(Error, /array/);
    });
    it('should throw error if array passed to oneOf is empty', function(){
        expect(function(){ arguard.string('foo', 'foo').oneOf([]); }).to.throw(Error, /empty/);
    });
    it('should throw error if arg passed to oneOf contains non-string element', function(){
        expect(function(){ arguard.string('foo', 'foo').oneOf(['bar', 1]); }).to.throw(Error, /oneOf/);
    });
    it('should throw error if string is not in the array passed to oneOf', function(){
        expect(function(){ arguard.string('foo', 'foo').oneOf(['bar', 'baz']); }).to.throw(Error, /one of/);
    });
    it('should not throw error if string is in the array passed to oneOf', function(){
        expect(function(){ arguard.string('foo', 'foo').oneOf(['bar', 'foo']); }).to.not.throw(Error);
    });
});

describe('arguard.string().nonempty() ', function(){
    it('should throw error if string is empty', function(){
        expect(function(){ arguard.string('', 'foo').nonempty(); }).to.throw(Error, /empty/);
    });
    it('should not throw error if string is not empty', function(){
        expect(function(){ arguard.string('foo', 'foo').nonempty(); }).to.not.throw(Error);
    });
});

describe('arguard.array() ', function(){
    it('should throw error if second arg is not a string', function(){
        expect(function(){ arguard.array(); }).to.throw(Error, /string/);
        expect(function(){ arguard.array( [1,2] ); }).to.throw(Error, /string/);
    });
    it('should throw error if first arg is not an array', function(){
        var inputs = [undefined, null, true, false, 1, NaN, 'hello', '', {} ];
        for (var i = 0; i < inputs.length; i++){
            expect(function(){ arguard.array(inputs[i], 'foo'); }).to.throw(Error, /array/);
        }
    });
    it('should not throw error if first arg is an array', function(){
        expect(function(){ arguard.array( [1,2,3], 'foo'); }).to.not.throw(Error);
    });
});

describe('arguard.func() ', function(){
    it('should throw error if second arg is not a string', function(){
        expect(function(){ arguard.func(); }).to.throw(Error, /string/);
        expect(function(){ arguard.func( function(){} ); }).to.throw(Error, /string/);
    });
    it('should throw error if first arg is not a function', function(){
        var inputs = [undefined, null, true, false, 1, NaN, 'hello', '', {}, [] ];
        for (var i = 0; i < inputs.length; i++){
            expect(function(){ arguard.func(inputs[i], 'foo'); }).to.throw(Error, /function/);
        }
    });
    it('should not throw error if first arg is a function', function(){
        expect(function(){ arguard.func( function(){}, 'foo'); }).to.not.throw(Error);
    });
});

describe('arguard.object() ', function(){
    it('should throw error if second arg is not a string', function(){
        expect(function(){ arguard.object(); }).to.throw(Error, /string/);
        expect(function(){ arguard.object({}); }).to.throw(Error, /string/);
    });
    it('should throw error if first arg is not an object', function(){
        var inputs = [undefined, null, true, false, 1, NaN, 'hello', '', function(){} ];
        for (var i = 0; i < inputs.length; i++){
            expect(function(){ arguard.object(inputs[i], 'foo'); }).to.throw(Error, /object/);
        }
    });
    it('should not throw error if first arg is an object', function(){
        expect(function(){ arguard.object( {}, 'foo'); }).to.not.throw(Error);
        expect(function(){ arguard.object( [], 'foo'); }).to.not.throw(Error);
    });
});

describe('arguard.bool() ', function(){
    it('should throw error if second arg is not a string', function(){
        expect(function(){ arguard.bool(); }).to.throw(Error, /string/);
        expect(function(){ arguard.bool(true); }).to.throw(Error, /string/);
    });
    it('should throw error if first arg is not a boolean', function(){
        var inputs = [undefined, null, 1, NaN, 'hello', '', function(){}, [], {} ];
        for (var i = 0; i < inputs.length; i++){
            expect(function(){ arguard.bool(inputs[i], 'foo'); }).to.throw(Error, /boolean/);
        }
    });
    it('should not throw error if first arg is an object', function(){
        expect(function(){ arguard.bool( true, 'foo'); }).to.not.throw(Error);
        expect(function(){ arguard.bool( false, 'foo'); }).to.not.throw(Error);
    });
});

describe('arguard.names ', function(){
    it('.params == "params"', function(){
        expect(arguard.names.params).to.equal('params');
    });
    it('.options == "options"', function(){
       expect(arguard.names.options).to.equal('options');
    });
    it('.cb == "cb"', function(){
        expect(arguard.names.cb).to.equal('cb');
    });
});