import axios from "axios"
import querystring from "querystring"

const params = querystring.parse(window.location.search.substring(1))
const url = params.gitJsonApi

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
