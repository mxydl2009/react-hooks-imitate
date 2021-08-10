// 使用数组来存储多个状态，useState可以调用多次，返回多个状态值
const state = []
// state对应的设置状态值的函数
const setters = []
// 需要一个索引来将state与setState对应起来
let stateIndex = 0
// 创建更新state的方法时，方法需要知道修改的是哪个state值，所以需要使用闭包机制将索引值固定在方法里
function createSetter(index) {
  // 返回的函数会作为修改state的方法，即setState, index作为每个state状态值的索引记录，以闭包的形式存在
  return function(newState) {
    state[index] = newState
    render()
  }
}
/**
 * 实现思路
 * 1. 为了实现多次调用返回多个隔离的状态值，所以需要使用数组的形式来存储多个状态值和对应的更新状态方法
 * 2. 为了让state与更新state的函数对应起来，需要一个索引变量来指明这种对应关系
 * 3. 在创建更新state的方法时，方法需要知道修改的是哪个state值，所以需要使用闭包机制将索引值固定在方法里
 * 4. 在将更新任务添加到React任务队列后，将索引变量置为0，因为函数组件重新执行时，会重新按顺序调用useState
 * @param {*} initialState 初始state状态值
 */
export default function useState(initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  setters.push(createSetter(stateIndex))
  const value = state[stateIndex]
  const setter = setters[stateIndex]
  stateIndex ++
  return [ value, setter ]
}