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

- Readme
- more info in package.json

Similar module: aproba.


aproba
======

A ridiculously light-weight function argument validator

```
var validate = require("aproba")

function myfunc(a, b, c) {
  // `a` must be a string, `b` a number, `c` a function
  validate('SNF', arguments) // [a,b,c] is also valid
}

myfunc('test', 23, function () {}) // ok
myfunc(123, 23, function () {}) // type error
myfunc('test', 23) // missing arg error
myfunc('test', 23, function () {}, true) // too many args error

```

Valid types are:

| type | description
| :--: | :----------
| *    | matches any type
| A    | `Array.isArray` OR an `arguments` object
| S    | typeof == string
| N    | typeof == number
| F    | typeof == function
| O    | typeof == object and not type A and not type E
| B    | typeof == boolean
| E    | `instanceof Error` OR `null` **(special: see below)**
| Z    | == `null`

Validation failures throw one of three exception types, distinguished by a
`code` property of `EMISSINGARG`, `EINVALIDTYPE` or `ETOOMANYARGS`.

If you pass in an invalid type then it will throw with a code of
`EUNKNOWNTYPE`.

If an **error** argument is found and is not null then the remaining
arguments are optional.  That is, if you say `ESO` then that's like using a
non-magical `E` in: `E|ESO|ZSO`.