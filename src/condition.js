const handlers = {
  "!in": ([item, list]) => list.includes(item),
  "!get": ([key], values) => values.get(key),
  "!list": (args) => args
}

export function evaluate(expression, values) {
  if (Array.isArray(expression)) {
    return evaluateCommand(expression, values)
  } else {
    return expression
  }
}

function evaluateCommand(expression, values) {
  const [command, ...args] = expression
  const handler = handlers[command]
  return handler(args.map(arg => evaluate(arg, values)), values)
}
