# cans-plugin-http

HTTP (axios) plugin for cans

## Install

```bash
$ yarn add cans-plugin-http
```

## Usage

```js
import cans from 'cans'
import { observable, action } from 'cans/mobx'
import { http } from 'cans-plugin-http'

const app = cans()

app.use(http())

app.model({
  observable: app => {
    list: [],
    
    fetchList: action.bound(async function () {
      const list = (await app.get('/api/v1/lists')).data
      // modify `list`
    })
  }
})
```

If you pass an object to `http()`, it will use `axios.create(config)` to create an axios instance.

## License

MIT License
