import axios from "axios"
import querystring from "querystring"

import AssetServer from "./apis/assetServer"
import GitJsonApi from "./apis/gitJsonApi"

export async function loadConfig() {
  const config = await doLoadConfig("config.json")

  return {
    assetServer: new AssetServer(config.assetServer),
    gitJsonApi: new GitJsonApi(config.gitJsonApi)
  }
}

async function doLoadConfig(path) {
  try {
    const response = await axios.get(path)
    return response.data
  } catch (error) {
    return querystring.parse(window.location.search.substring(1))
  }
}
