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

function skipSpace(text) {
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

function run() {
  var env = Object.create(topEnv);
  var progr = Array.prototype.slice.call(arguments, 0).join('\n');
  return evaluate(parse(progr), env);
}

run('do(define(total, 0),',
  '   define(count, 1),',
  '   while(<(count, 11),',
  '         do(define(total, +(total, count)),',
  '            define(count, +(count, 1)))),',
  '   println(total))');
// → 55
console.log(parse('+(a, 10)'));
// → {type: "apply",
//    operator: {type: "word", name: "+"},
//    args: [{type: "word", name: "a"},
//           {type: "value", value: 10}]}
