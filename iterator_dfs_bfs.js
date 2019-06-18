function* dfs(node) {
  yield node
  for (const child of node.children) {
    yield* dfs(child)
  }
}

function* bfs(node) {
  let queue = [node]
  // use whiele
  while (queue.length) {
    const current = queue.shift()
    yield current
    queue.push(...current.children)
  }
}