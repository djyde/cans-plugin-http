'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var cans_mobx = require('cans/mobx');

function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a);}catch(e){j(e);return}r.done?s(r.value):Promise.resolve(r.value).then(c,d);}function d(e){c(e,1);}c();})}

var httpPlugin = function (app, options) {
  if ( options === void 0 ) options = {};

  app.http = options.axiosConfig ? axios.create(options.axiosConfig) : axios;
};

var restPlugin = function (app, options) {
  if ( options === void 0 ) options = {};

  var resources = options.resources || [];
  var storeMap = {};
  resources.forEach(function (resource) {
    var endpoint = (resource.url) + "/" + (resource.name);
    var o = cans_mobx.observable({
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

      index: cans_mobx.action.bound(function () {return __async(function*(){
        this.loading.index = true;
        try {
          var res = yield axios.get(endpoint);
          this.data.index = res.data;
          return res
        } catch (e) {
          throw e
        } finally {
          this.loading.index = false;
        }
      }.call(this))}),

      show: cans_mobx.action.bound(function (id) {return __async(function*(){
        this.loading.show = true;
        try {
          var res = yield axios.get((endpoint + "/" + id));
          this.data.show = res.data;
          return res
        } catch (e) {
          throw e
        } finally {
          this.loading.show = false;
        }
      }.call(this))}),

      create: cans_mobx.action.bound(function (data) {return __async(function*(){
        this.loading.create = true;
        try {
          var res = yield axios.post(("" + endpoint), data);
          return res
        } catch (e) {
          throw e
        } finally {
          this.loading.create = false;
        }
      }.call(this))}),

      update: cans_mobx.action.bound(function (id, body) {return __async(function*(){
        this.loading.update = true;
        try {
          var res = yield axios.put((endpoint + "/" + id), body);
          return res
        } catch (e) {
          throw e
        } finally {
          this.loading.update = false;
        }
      }.call(this))}),

      delete: cans_mobx.action.bound(function (id) {return __async(function*(){
        this.loading.delete = true;
        try {
          var res = yield axios.delete((endpoint + "/" + id));
          return res
        } catch (e) {
          throw e
        } finally {
          this.loading.delete = false;
        }
      }.call(this))})
    });
    storeMap[resource.name] = o;
  });

  app.model({
    namespace: 'rest',
    observable: storeMap
  });
};

exports.httpPlugin = httpPlugin;
exports.restPlugin = restPlugin;
