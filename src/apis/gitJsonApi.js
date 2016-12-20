import axios from "axios"
import { format, parse } from "url"
import querystring from "querystring"

const params = querystring.parse(window.location.search.substring(1))
const url = params.gitJsonApi || defaultUrl()

export async function loadData(version = "master") {
  const response = await axios.get(version, { baseURL: url })
  return {
    data: response.data,
    version: response.headers["git-commit-hash"]
  }
}

export async function updateContent(content, version) {
  await axios.post(`${version}/content`, content, { baseURL: url })
}

function defaultUrl() {
  const url = parse(window.location.href)

  return format({
    protocol: url.protocol,
    slashes: true,
    host: `git-json-api.${url.host}`
  })
}
