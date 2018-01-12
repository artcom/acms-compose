const handlers = {
  EQUALS: ([value1, value2]) => value1 === value2,
  GET: ([key], values) => values.get(key),
  IN: ([item, list]) => list.includes(item),
  LIST: (args) => args
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
