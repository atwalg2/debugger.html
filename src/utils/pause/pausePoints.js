import { reverse, sortBy } from "lodash";
function insertStrtAt(string, index, newString) {
  const start = string.slice(0, index);
  const end = string.slice(index);
  return `${start}${newString}${end}`;
}

export function formatPausePoints(text, nodes) {
  nodes = reverse(sortBy(nodes, ["location.line", "location.column"]));
  const lines = text.split("\n");
  nodes.forEach((node, index) => {
    const { line, column } = node.location;
    const { breakpoint, stepOver } = node.types;
    const num = nodes.length - index;
    const types = `${breakpoint ? "b" : ""}${stepOver ? "s" : ""}`;
    lines[line - 1] = insertStrtAt(
      lines[line - 1],
      column,
      `/*${types} ${num}*/`
    );
  });

  return lines.join("\n");
}
