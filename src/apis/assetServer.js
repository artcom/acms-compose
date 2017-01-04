import axios from "axios"
import { dirname, join } from "path"
import querystring from "querystring"
import { format, parse } from "url"

const params = querystring.parse(window.location.search.substring(1))
const baseURL = params.assetServer || defaultUrl()
const api = axios.create({ baseURL })

export async function uploadFile(path, file, options) {
  await ensureDirectory(dirname(path))
  await api.put(path, file, options)
}

async function ensureDirectory(path) {
  if (!await exists(path)) {
    const parentPath = dirname(path)

    if (parentPath !== path) {
      await ensureDirectory(parentPath)
      await makeDirectory(path)
    }
  }
}

async function exists(path) {
  try {
    await api.request({ method: "PROPFIND", headers: { Depth: 0 }, url: path })
    return true
  } catch (error) {
    return false
  }
}

function makeDirectory(path) {
  return api.request({ method: "MKCOL", url: path })
}

export function assetUrl(path) {
  const url = parse(baseURL)
  return format({ ...url, pathname: join(url.pathname, path) })
}

function defaultUrl() {
  const url = parse(window.location.href)

  return format({
    protocol: url.protocol,
    slashes: true,
    host: `asset-server.${url.host}`
  })
}
