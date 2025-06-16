import {ReactNode} from "react";

function isSingleTextNode(e: ReactNode) {
  switch (typeof e) {
    case "string":
    case "number":
      return true;
  }
  return false;
}

export default function isTextNode(e: ReactNode) {
  const type = typeof e;
  switch (type) {
    case "string": case "number":
      return true;
    case "object":
      if(!Array.isArray(e)) {
        return false;
      }
      return !e.find(item => !isSingleTextNode(item));
  }
  return false;
}
