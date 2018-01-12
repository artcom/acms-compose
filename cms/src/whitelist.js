export function isWhitelisted(whitelist, path) {
  return whitelist.some(pattern => matchesPattern(path, pattern))
}

function matchesPattern(path, patternString) {
  const pattern = patternString.split("/")

  for (let i = 0; i < path.length; i++) {
    const item = path[i]
    const matcher = pattern[i]

    if (i === pattern.length) {
      return false
    } else if (matcher === "**") {
      return true
    } else if (matcher === "*") {
      // continue
    } else if (!doesMatch(item, matcher)) {
      return false
    }
  }

  return true
}

function doesMatch(item, matcher) {
  if (matcher.startsWith("!(") && matcher.endsWith(")")) {
    const negativeMatcher = matcher.slice(2, -1)
    return item !== negativeMatcher
  } else {
    return item === matcher
  }
}
