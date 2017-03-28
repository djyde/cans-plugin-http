const cans = require('cans')
const { observable, action } = require('cans/mobx')
const { http } = require('../dist/cansPluginHttp.common.js')
const assert = require('power-assert')

describe('http', () => {

  describe('default', () => {
    // export default trick 😅
    const app = cans.default()

    app.use(http())

    app.model({
      namespace: 'test',
      observable: app => {
        return observable({
          data: {},

          click: action.bound(function () {
            return app.plugins.http.get('https://www.reddit.com/r/reactjs.json')
              .then(res => {
                this.data = res.data
              })
              .catch(e => {
                console.error(e)
              })
          })
        })
      }
    })

    describe('GET', () => {
      it('should get', done => {
        app.models.test.click()
          .then(() => { assert(app.models.test.data.kind === 'Listing'); done() })
          .catch(e => {
            done(e)
          })
      }).timeout(10000)
    })
  })

  describe('instance', () => {
    const app = cans.default()

    app.use(http({
      baseURL: 'https://www.reddit.com/r'
    }))

    app.model({
      namespace: 'test',
      observable: app => {
        return observable({
          data: {},

          click: action.bound(function () {
            return app.plugins.http.get('/reactjs.json')
              .then(res => {
                this.data = res.data
              })
              .catch(e => {
                console.error(e)
              })
          })
        })
      }
    })

    describe('GET', () => {
      it('should get', done => {
        app.models.test.click()
          .then(() => { assert(app.models.test.data.kind === 'Listing'); done() })
          .catch(e => {
            done(e)
          })
      }).timeout(10000)
    })
  })
})