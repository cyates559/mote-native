export default function joinPaths(...paths: (string | null | undefined)[]) {
  const buf = (paths?.[0]?.[0] === "/")? [""]: [];
  for (const path of paths) {
    if (path && path !== "") {
      if(path.startsWith("/")) {
        if(path.endsWith("/")) {
          buf.push(path.slice(1, -1));
        } else {
          buf.push(path.slice(1));
        }
      } else {
        buf.push(path);
      }
    }
  }
  return buf.join("/");
}