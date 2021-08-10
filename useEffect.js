let prevDepsArray = []
let effectIndex = 0

export default function useEffect(callback, depsArray) {
  if (Object.prototype.toString.call(callback) !== '[object Function]') {
    throw new Error('The first argument of useEffect function must be function')
  }
  if (typeof depsArray === 'undefined') {
    callback()
  } else {
    if (Object.prototype.toString.call(depsArray) !== '[object Array]') {
      throw new Error('The first argument of useEffect function must be Array')
    }
    // 将当前依赖数组的元素与上一次的做对比，有变化则调用callback，并更新依赖数组
    let prevDep = prevDepsArray[effectIndex]
    let hasChanged = prevDep? depsArray.every((dep, index) => {
      return dep === prevDep[index]
    }) === false : true
    if (hasChanged) {
      callback()
    }
    // 同步更新depsArray
    prevDepsArray[effectIndex] = depsArray
    effectIndex ++
    // 注意：在组件重新渲染的时候，effectIndex需要重置为0
  }
}