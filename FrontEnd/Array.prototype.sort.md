# 理解 Array 的 sort 方法 (Array.prototype.sort)

Array 的 sort 方法只有一个参数用来比较数组中的元素来进行排序。

在不传参数的情况下，默认会将数组中的元素转化成 `String` 然后按照 `UTF-16` 规则排序。比如：
- 'banana' 在 'cherry' 之前
- 2在10之前

sort 的唯一参数是一个 compareFunction，接收两个参数 a 和 b，a 是比较时的前一个元素，b 是后一个的元素 。
- 如果 `compareFunction(a, b)` 小于0，就把 a 交换到前面。
- 如果 `compareFunction(a, b)` 等于0，a 和 b 的顺序不变。
- 如果 `compareFunction(a, b)` 大于0，就把 b 交换到前面。

比较两个数字的时候也可以将 compareFunction 简写成：
```
const arr = [3,1,4,6,2,5]

arr.sort(compareNumberAsc)
arr.sort(compareNumberDesc)

function compareNumberAsc(a, b) {
  return a - b // 升序
  // 如果 a 大 b 小，a - b 大于0，b 应该交换到前面，所以小的在前，升序
  // 如果 a 小 b 大，a - b 小于0，a 应该交换到前面，所以小的在前，升序
}

function compareNumberDesc(a, b) {
  return b - a // 降序
  // 如果 a 大 b 小，b - a 小于0，a 应该交换到前面，所以大的在前，降序
  // 如果 a 小 b 大，b - a 大于0，b 应该交换到前面，所以大的在前，降序
}
```