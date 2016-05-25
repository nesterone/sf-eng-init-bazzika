var specialForms = Object.create(null);
var topEnv = Object.create(null);
var parseExpression;

function skipSpace(string) {
  return string.replace(/#.*\n/g, '').trim();
}

function parseApply(expr, program) {
  var programCode;
  var expression = expr;
  var arg;

  programCode = skipSpace(program);
  if (programCode[0] !== '(') {
    return { expr: expr, rest: programCode };
  }

  programCode = skipSpace(programCode.slice(1));
  expression = { type: 'apply', operator: expression, args: [] };

  while (programCode[0] !== ')') {
    arg = parseExpression(programCode);
    expression.args.push(arg.expr);
    programCode = skipSpace(arg.rest);

    if (programCode[0] === ',') {
      programCode = skipSpace(programCode.slice(1));
    } else if (programCode[0] !== ')') {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }

  return parseApply(expression, programCode.slice(1));
}

parseExpression = function (program) {
  var programCode = program;
  var match;
  var expr;

  programCode = skipSpace(programCode);

  match = /^"([^"]*)"/.exec(programCode);

  if (match) {
    expr = { type: 'value', value: match[1] };
  }	else {
    match = /^\d+\b/.exec(programCode);

    if (match) {
      expr = { type: 'value', value: Number(match[0]) };
    } else {
      match = /^[^\s(),"]+/.exec(programCode);

      if (match) {
        expr = { type: 'word', name: match[0] };
      }	else {
        throw new SyntaxError('Unexpected syntax: ' + programCode);
      }
    }
  }

  return parseApply(expr, programCode.slice(match[0].length));
};

function parse(program) {
  var result = parseExpression(program);

  if (skipSpace(result.rest).length > 0) {
    throw new SyntaxError('Unexpected text after program');
  }

  return result.expr;
}

function evaluate(expr, env) {
  var op;
  var reply;

  switch (expr.type) {
    case 'value': return expr.value;
    case 'word':
      if (expr.name in env) {
        reply = env[expr.name];
      }	else {
        throw new ReferenceError('Undefined variable: ' + expr.name);
      }

      return reply;
    case 'apply':
      if (expr.operator.type === 'word' && expr.operator.name in specialForms) {
        return specialForms[expr.operator.name](expr.args, env);
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
  var value;
  var environment = env;

  if (args.length !== 2 || args[0].type !== 'word') {
    throw new SyntaxError('Bad use of define');
  }

  value = evaluate(args[1], environment);
  environment[args[0].name] = value;

  return value;
};

topEnv.true = true;
topEnv.false = false;

['+', '-', '*', '/', '==', '<', '>'].forEach(function (op) {
  topEnv[op] = function (a, b) {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      case '==': return a === b;
      case '<': return a < b;
      case '>': return a > b;
      default: return undefined;
    }
  };
});

topEnv.print = function (value) {
  console.log(value);

  return value;
};

topEnv.array = function () {
  if (!arguments) {
    throw new SyntaxError('Too few arguments for an array');
  }

  return Array.prototype.slice.call(arguments);
};

topEnv.length = function (array) {
  return array.length;
};

topEnv.element = function (array, index) {
  return array[index];
};

function run() {
  var env = Object.create(topEnv);
  var program = Array.prototype.slice.call(arguments, 0).join('\n');

  return evaluate(parse(program), env);
}

specialForms.fun = function (args, env) {
  var argNames;
  var body;
  var localEnv;
  var index;

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
    localEnv = Object.create(env);

    if (arguments.length !== argNames.length) {
      throw new TypeError('Wrong number of arguments');
    }

    for (index = 0; index < arguments.length; index++) {
      localEnv[argNames[index]] = arguments[index];
    }

    return evaluate(body, localEnv);
  };
};

specialForms.set = function (args, environment) {
  var currentScope = environment;

  if (args.length !== 2 || args[0].type !== 'word') {
    throw new SyntaxError('Incorrect using of define');
  }

  while (currentScope) {
    if (Object.prototype.hasOwnProperty.call(currentScope, args[0].name)) {
      currentScope[args[0].name] = evaluate(args[1], environment);
      return currentScope[args[0].name];
    }
    currentScope = Object.getPrototypeOf(currentScope);
  }

  throw new ReferenceError('Variable ' + args[0].name + ' was\'t declared ');
};

run('do(define(x, 4),',
  '   define(setx, fun(val, set(x, val))),',
  '   setx(50),',
  '   print(x))');
// → 50

run('set(quux, true)');
// → Some kind of ReferenceError
