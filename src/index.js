import axios from 'axios'

const NAMESPACE = 'http'

const http = (config) => {
  return {
    namespace: NAMESPACE,
    observable: app => config ? axios.create(config) : axios
  }
}

export default http
