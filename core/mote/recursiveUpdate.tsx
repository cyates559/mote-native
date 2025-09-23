function isEmpty(val: any) {
  return val === null || val === ""
}

function pruneEmpties(object: any) {
  for (const key in object) {
    const val = object[key];
    if (isEmpty(object[key])) {
      delete object[key];
    } else if (typeof val !== "string") {
      object[key] = pruneEmpties(val);
    }
  }
  return object
}

export default function recursiveUpdate(object: any, update: any) {
  if (object !== null && typeof object === "object") {
    const result = {...object}
    for (const key in update) {
      if (result.hasOwnProperty(key)) {
        const val = recursiveUpdate(result[key], update[key]);
        if (isEmpty(val)) {
          delete result[key];
        } else {
          result[key] = val;
        }
      } else {
        const val = update[key];
        if (!isEmpty(val)) {
          result[key] = typeof val === "string" ? val : pruneEmpties(val);
        }
      }
    }
    return (Object.keys(result).length === 0) ? null : result
  } else {
    if (isEmpty(update)) {
      return null;
    }
    return typeof update === "string" ? update : pruneEmpties(update);
  }
}