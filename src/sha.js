import createHash from "sha.js"

export async function sha1(file) {
  const buffer = await toTypedArray(file)
  const hash = createHash("sha1")
  return hash.update(buffer).digest("hex")
}

function toTypedArray(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = event => { resolve(new Uint8Array(event.target.result)) }
    fileReader.onerror = event => { reject(event.target.error) }
    fileReader.readAsArrayBuffer(file)
  })
}
