# cans-plugin-http

[![npm](https://img.shields.io/npm/v/cans-plugin-http.svg)](https://www.npmjs.com/package/cans-plugin-http)
[![circle](https://circleci.com/gh/djyde/cans-plugin-http.svg?style=shield)](https://circleci.com/gh/djyde/cans-plugin-http)

HTTP (axios) plugin for cans

## Install

```bash
$ yarn add cans-plugin-http
```

## Usage

```js
import cans from 'cans'
import { observable, action } from 'cans/mobx'
import httpPlugin from 'cans-plugin-http'

const app = cans()

app.use(httpPlugin())

app.model({
  observable: app => {
    return observable({
      list: [],

      fetchList: action.bound(async function () {
        const list = (await app.get('/api/v1/lists')).data
        // modify `list`
      })
    })
  }
})
```

If you pass an object to `http()`, it will use `axios.create(config)` to create an axios instance.

## License

MIT License
