import axios from 'axios'
import { action, observable } from 'cans/mobx'

export const httpPlugin = (app, options = {}) => {
  app.http = options.axiosConfig ? axios.create(options.axiosConfig) : axios
}

export const restPlugin = (app, options = {}) => {
  const resources = options.resources || []
  const storeMap = {}
  resources.forEach(resource => {
    const endpoint = `${resource.url}/${resource.name}`
    const o = observable({
      data: resource.defaultData || {
        index: [],
        show: {}
      },
      loading: {
        index: false,
        show: false,
        create: false,
        update: false,
        delete: false
      },

      index: action.bound(async function () {
        this.loading.index = true
        try {
          const res = await axios.get(endpoint)
          this.data.index = res.data
          return res
        } catch (e) {
          throw e
        } finally {
          this.loading.index = false
        }
      }),

      show: action.bound(async function (id) {
        this.loading.show = true
        try {
          const res = await axios.get(`${endpoint}/${id}`)
          this.data.show = res.data
          return res
        } catch (e) {
          throw e
        } finally {
          this.loading.show = false
        }
      }),

      create: action.bound(async function (data) {
        this.loading.create = true
        try {
          const res = await axios.post(`${endpoint}`, data)
          return res
        } catch (e) {
          throw e
        } finally {
          this.loading.create = false
        }
      }),

      update: action.bound(async function (id, body) {
        this.loading.update = true
        try {
          const res = await axios.put(`${endpoint}/${id}`, body)
          return res
        } catch (e) {
          throw e
        } finally {
          this.loading.update = false
        }
      }),

      delete: action.bound(async function (id) {
        this.loading.delete = true
        try {
          const res = await axios.delete(`${endpoint}/${id}`)
          return res
        } catch (e) {
          throw e
        } finally {
          this.loading.delete = false
        }
      })
    })
    storeMap[resource.name] = o
  })

  app.model({
    namespace: 'rest',
    observable: storeMap
  })
}
