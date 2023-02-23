export const useStorage = () => {
  function removeFromStorage() {
    window.localStorage.removeItem('cart')
  }
  function saveIntoStorage(cart) {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }
  function getFromStorage() {
    const storage = window.localStorage.getItem('cart')
    if (storage) {
      return JSON.parse(storage)
    }
    return []
  }

  return {
    saveIntoStorage,
    removeFromStorage,
    getFromStorage
  }
}
