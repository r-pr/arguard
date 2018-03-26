arguard
=======

Function argument validator. 

Throws an error if the argument being tested is of wrong type or doesn't meet specified criteria.

## Usage ##

```
var arguard = require('arguard');

function foo(bar, baz, options){
	arguard.number(bar, 'bar');
	arguard.string(baz, 'baz').oneOf(['local', 'remote']);
	arguard.object(options, arguard.names.options);
}
```

## API ##

| Function                                     | Throws errof if
| :------------------------------------------- | :-------------------------------------------
| bool(arg, argName)                           | typeof arg !== 'boolean'
| object(arg, argName)                         | typeof arg !== 'object' OR !arg
| array(arg, argName)                          | !Array.isArray(arg)
| func(arg, argName)                           | typeof arg !== 'function'
| number(arg, argName)                         | typeof arg !== 'number' OR Number.isNaN(arg)
| number(arg, argName).positive()              | as above AND arg <= 0
| string(arg, argName)                         | typeof !== 'string'
| string(arg, argName).oneOf(['str1', 'str2']) | as above AND (arg != 'str1' AND arg != 'str2')

`arguard.names` is an object with 3 keys, which holds strings for common arguments names: 

```
{
	params: 'params',
	options: 'options',
	cb: 'cb'
}
```

Similar module: [aproba](https://www.npmjs.com/package/aproba)