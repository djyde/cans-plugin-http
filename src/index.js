import axios from 'axios'

const NAMESPACE = 'http'

exports.http = (config) => {
  return {
    namespace: NAMESPACE,
    observable: app => config ? axios.create(config) : axios
  }
}
