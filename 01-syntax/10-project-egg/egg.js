/* eslint no-new-func: 0 */
var parseApply;
var skipSpace;
var specialForms = Object.create(null);
var topEnv = {};
function parseExpression(progr) {
  var program = skipSpace(progr);
  var match;
  var expr;
  match = /^"(.*)"/.exec(program);
  if (match) {
    expr = { type: 'value', value: match[1] };
  } else {
    match = /^\d+\b/.exec(program);
    if (match) {
      expr = { type: 'value', value: Number(match[0]) };
    } else {
      match = /^[^\s(),"]+/.exec(program);
      if (match) {
        expr = { type: 'word', name: match[0] };
      } else {
        throw new SyntaxError('Unexpected syntax: ' + program);
      }
    }
  }
  return parseApply(expr, program.slice(match[0].length));
}
skipSpace = function (string) {
  var first = string.search(/\S/);
  if (first === -1) return '';
  return string.slice(first);
};
parseApply = function (expr, progr) {
  var expression;
  var arg;
  var program = skipSpace(progr);
  if (program[0] !== '(') {
    return { expr: expr, rest: program };
  }
  program = skipSpace(program.slice(1));
  expression = { type: 'apply', operator: expr, args: [] };
  while (program[0] !== ')') {
    arg = parseExpression(program);
    expression.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] === ',') {
      program = skipSpace(program.slice(1));
    } else if (program[0] !== ')') {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expression, program.slice(1));
};

function parse(progr) {
  var result = parseExpression(progr);
  if (skipSpace(result.rest).length > 0) {
    throw new SyntaxError('Unexpected text after program');
  }
  return result.expr;
}

function evaluate(expr, env) {
  var op;
  switch (expr.type) {
    case 'value':
      return expr.value;

    case 'word':
      if (expr.name in env) {
        return env[expr.name];
      } throw new ReferenceError('Undefined variable: ' +
          expr.name);
    case 'apply':
      if (expr.operator.type === 'word' &&
        expr.operator.name in specialForms) {
        return specialForms[expr.operator.name](expr.args,
          env);
      }
      op = evaluate(expr.operator, env);
      if (typeof op !== 'function') {
        throw new TypeError('Applying a non-function.');
      }
      return op.apply(null, expr.args.map(function (arg) {
        return evaluate(arg, env);
      }));
    default: return undefined;
  }
}
specialForms.if = function (args, env) {
  if (args.length !== 3) {
    throw new SyntaxError('Bad number of args to if');
  }

  if (evaluate(args[0], env) !== false) {
    return evaluate(args[1], env);
  }
  return evaluate(args[2], env);
};

specialForms.while = function (args, env) {
  if (args.length !== 2) {
    throw new SyntaxError('Bad number of args to while');
  }

  while (evaluate(args[0], env) !== false) {
    evaluate(args[1], env);
  }
  // Since undefined does not exist in Egg, we return false,
  // for lack of a meaningful result.
  return false;
};

specialForms.do = function (args, env) {
  var value = false;
  args.forEach(function (arg) {
    value = evaluate(arg, env);
  });
  return value;
};

specialForms.define = function (args, env) {
  var enviroment = env;
  var value;
  if (args.length !== 2 || args[0].type !== 'word') {
    throw new SyntaxError('Bad use of define');
  }
  value = evaluate(args[1], env);
  enviroment[args[0].name] = value;
  return value;
};
topEnv.true = true;
topEnv.false = false;

['+', '-', '*', '/', '==', '<', '>'].forEach(function (op) {
  topEnv[op] = new Function('a, b', 'return a ' + op + ' b;');
});

topEnv.print = function (value) {
  console.log(value);
  return value;
};
topEnv.array = function () {
  if (!arguments) {
    throw new SyntaxError('Not enough arguments to form an array');
  }
  return Array.prototype.slice.call(arguments);
};
topEnv.length = function (array) {
  return array.length;
};
topEnv.element = function (array, i) {
  return array[i];
};
function run() {
  var env = Object.create(topEnv);
  var program = Array.prototype.slice
    .call(arguments, 0).join('\n');
  return evaluate(parse(program), env);
}
specialForms.fun = function (args, env) {
  var argNames;
  var body;
  if (!args.length) {
    throw new SyntaxError('Functions need a body');
  }
  function name(expr) {
    if (expr.type !== 'word') {
      throw new SyntaxError('Arg names must be words');
    }
    return expr.name;
  }

  argNames = args.slice(0, args.length - 1).map(name);
  body = args[args.length - 1];

  return function () {
    var localEnv = Object.create(env);
    var i;
    if (arguments.length !== argNames.length) {
      throw new TypeError('Wrong number of arguments');
    }
    for (i = 0; i < arguments.length; i++) {
      localEnv[argNames[i]] = arguments[i];
    }
    return evaluate(body, localEnv);
  };
};

run('do(define(sum, fun(array,',
  '     do(define(i, 0),',
  '        define(sum, 0),',
  '        while(<(i, length(array)),',
  '          do(define(sum, +(sum, element(array, i))),',
  '             define(i, +(i, 1)))),',
  '        sum))),',
  '   print(sum(array(1, 2, 3))))');
