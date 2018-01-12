import axios from "axios"
import { dirname, join } from "path"
import { format, parse } from "url"

export default class AssetServer {
  constructor(url = "/assets") {
    this.api = axios.create({ baseURL: url })
    this.url = parse(url)
  }

  async uploadFile(path, file, options) {
    await this.ensureDirectory(dirname(path))
    await this.api.put(path, file, options)
  }

  async ensureDirectory(path) {
    if (!await this.exists(path)) {
      const parentPath = dirname(path)

      if (parentPath !== path) {
        await this.ensureDirectory(parentPath)
        await this.makeDirectory(path)
      }
    }
  }

  async exists(path) {
    try {
      await this.api.request({ method: "PROPFIND", headers: { Depth: 0 }, url: path })
      return true
    } catch (error) {
      return false
    }
  }

  makeDirectory(path) {
    return this.api.request({ method: "MKCOL", url: path })
  }

  assetUrl(path) {
    return format({ ...this.url, pathname: join(this.url.pathname, path) })
  }
}
