var specialForms = Object.create(null);
var parseApply;
var topEnv = {};

topEnv.true = true;
topEnv.false = false;
topEnv.println = function (value) { console.log(value); };
topEnv['+'] = function (a, b) { return a + b; };
topEnv['-'] = function (a, b) { return a - b; };
topEnv['/'] = function (a, b) { return a / b; };
topEnv['*'] = function (a, b) { return a * b; };
topEnv['%'] = function (a, b) { return a % b; };
topEnv['>'] = function (a, b) { return a > b; };
topEnv['<'] = function (a, b) { return a < b; };
topEnv.array = function () {
  if (arguments.length === 0) {
    throw new SyntaxError('You should pass arguments when creating array');
  }
  return Array.prototype.slice.call(arguments);
};
topEnv.length = function (arr) { return arr.length; };
topEnv.element = function (arr, i) { return arr[i]; };

function skipSpace(text) {
  if (text.match(/#/)) {
    return text.replace(/#[\d\D\S\s]*\n/g, '');
  }
  return text.trim();
}

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

parseApply = function (expr, progr) {
  var program = skipSpace(progr);
  var expression;
  var arg;
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
    } else {
      if (program[0] !== ')') {
        throw new SyntaxError('Expected "," or ")"');
      }
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
      }
      throw new ReferenceError('Undefined variable: ' + expr.name);

    case 'apply':
      if (expr.operator.type === 'word' && expr.operator.name in specialForms) {
        return specialForms[expr.operator.name](expr.args, env);
      }
      op = evaluate(expr.operator, env);
      if (typeof op !== 'function') {
        throw new TypeError('Applying not a function: ' + op);
      }
      return op.apply(null, expr.args.map(function (arg) {
        return evaluate(arg, env);
      }));
    default:
      return undefined;
  }
}

specialForms.if = function (args, env) {
  if (args.length === 1) {
    return !!args[0];
  }
  if (args.length !== 3) {
    throw new SyntaxError('Three or one argument should be passed to if! ' + args);
  }
  if (evaluate(args[0], env) !== false) {
    return evaluate(args[1], env);
  }
  return evaluate(args[2], env);
};

specialForms.while = function (args, env) {
  if (args.length !== 2) {
    throw new SyntaxError('Two arguments should be passed to if! ' + args);
  }
  while (evaluate(args[0], env) !== false) {
    evaluate(args[1], env);
  }
  return false;
};

specialForms.do = function (args, env) {
  var result = false;
  args.forEach(function (arg) {
    result = evaluate(arg, env);
  });
  return result;
};

specialForms.define = function (args, env) {
  var value;
  var environment = env;
  if (args.length !== 2 && args[0].type !== 'word') {
    throw new SyntaxError('Incorrect use of define');
  }
  value = evaluate(args[1], env);
  environment[args[0].name] = value;
  return value;
};

specialForms.fun = function (args, env) {
  var argNames;
  var body;
  var localEnv;
  var i;
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
    if (arguments.length !== argNames.length) {
      throw new TypeError('Wrong number of arguments');
    }
    localEnv = Object.create(env);
    for (i = 0; i < arguments.length; i++) {
      localEnv[argNames[i]] = arguments[i];
    }
    return evaluate(body, localEnv);
  };
};

function run() {
  var env = Object.create(topEnv);
  var progr = Array.prototype.slice.call(arguments, 0).join('\n');
  return evaluate(parse(progr), env);
}

console.log(parse('+(a, 10)'));
// → {type: "apply",
//    operator: {type: "word", name: "+"},
//    args: [{type: "word", name: "a"},
//           {type: "value", value: 10}]}
run('do(define(total, 0),',
  '   define(count, 1),',
  '   while(<(count, 11),',
  '         do(define(total, +(total, count)),',
  '            define(count, +(count, 1)))),',
  '   println(total))');
// → 55
run('do(define(sum, fun(array,',
  '     do(define(i, 0),',
  '        define(sum, 0),',
  '        while(<(i, length(array)),',
  '          do(define(sum, +(sum, element(array, i))),',
  '             define(i, +(i, 1)))),',
  '        sum))),',
  '   println(sum(array(1, 2, 3))))');
// → 6
