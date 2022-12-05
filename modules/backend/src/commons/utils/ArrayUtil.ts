function intersection<T>(
  a: T[],
  b: T[],
  predicate?: (array1Value: T, array2Value: T) => boolean
): T[] {
  const _predicate = predicate ?? ((a, b) => a === b)
  return a.filter(v => b.some(u => _predicate(v, u)))
}

function difference<T>(
  a: T[],
  b: T[],
  predicate?: (array1Value: T, array2Value: T) => boolean
): T[] {
  const _predicate = predicate ?? ((a, b) => a === b)
  return a.filter(v => !b.some(u => _predicate(v, u)))
}

function arrayify<T>(itemOrArray: T | T[]): T[] {
  if (itemOrArray instanceof Array) {
    return itemOrArray
  }
  return [itemOrArray]
}

export const arr = {
  intersection,
  difference,
  arrayify
}
