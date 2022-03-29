export default function logger(store) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      console.log(store)
      return next(action)
    }
  }
}
