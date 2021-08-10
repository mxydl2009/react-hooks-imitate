import useState from "./useState";

/**
 * useState的增强，内部需要调用useState
 * @param {*} reducer 
 * @param {*} initialState 
 */
export default function useReducer(reducer, initialState) {
  const [ state, setState ] = useState(initialState)
  function dispatch(action) {
    const newState = reducer(state, action)
    setState(newState)
  }
  return [state, dispatch]
}