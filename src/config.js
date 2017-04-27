import axios from "axios"
import querystring from "querystring"

import AssetServer from "./apis/assetServer"
import GitJsonApi from "./apis/gitJsonApi"

export async function loadConfig() {
  const config = await doLoadConfig("config.json")
  const params = querystring.parse(window.location.search.substring(1))
  const merged = { ...config, ...params }

  return {
    assetServer: new AssetServer(merged.assetServer),
    gitJsonApi: new GitJsonApi(merged.gitJsonApi),
    whitelist: merged.whitelist
  }
}

async function doLoadConfig(path) {
  try {
    const response = await axios.get(path)
    return response.data
  } catch (error) {
    return {}
  }
}
