export function toTypedArray(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = event => { resolve(new Uint8Array(event.target.result)) }
    fileReader.onerror = event => { reject(event.target.error) }
    fileReader.readAsArrayBuffer(file)
  })
}
