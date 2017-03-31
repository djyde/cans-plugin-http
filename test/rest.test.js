const cans = require('cans')
const { observable, action } = require('cans/mobx')
const { restPlugin } = require('../dist/cansPluginHttp.common.js')
const assert = require('power-assert')
const enzyme = 

describe('rest', () => {
  const app = cans.default()

  const ENDPOINT = 'http://jsonplaceholder.typicode.com'

  app.use(restPlugin, {
    resources: [ { name: 'posts', url: ENDPOINT } ]
  })

  it('should wait for fetching', done => {
    assert.deepEqual(app.models.rest.posts.data.index, [])
    assert(app.models.rest.posts.loading.index === false)
    done()
  })

  it('should fetch index', done => {
    app.models.rest.posts.index()
      .then((res) => {
        assert.equal(res.status, 200)
        assert(app.models.rest.posts.data.index.length > 0)
        assert(app.models.rest.posts.loading.index === false)
        done()
      })
      .catch(e => {
        done(e)
      })
  }).timeout(10000)
})