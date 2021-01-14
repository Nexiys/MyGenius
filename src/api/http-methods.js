import axios from 'axios'
import qs from 'qs'
import store from '../store/index'
import router from '@/router/index'
import { Message, Loading } from 'element-ui' // 这里依赖了element-ui库的消息弹窗
const host = process.env.NODE_ENV === 'production' ? 'http://www.ruggear.mobi/' : 'http://www.ruggear.mobi/'

// 拦截请求，目的是给每个请求加入token
axios.interceptors.request.use(
  config => {
    const token = store.state.userToken || window.localStorage.getItem('data')

    if (config.method === 'post' && router.currentRoute.name !== 'Login') {
      config.data = config.data + '&api_token=' + token
    } else if (config.method === 'get') {
      config.params = {
        api_token: token,
        ...config.params
      }
    }
    return config
  },
  error => {
    return Promise.error(error)
  })

const handleResponse = (result) => {
  return new Promise((resolve, reject) => {
    if (result.status === 200) {
      const errCode = result.data.code

      switch (errCode) {
        case 200:
          resolve(result.data.data || result.data)
          break
        case 401:
        case 403:
          store.commit('removeUserToken')
          router.replace({
            path: '/Login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        default:
          // Message.warning({
          //   message: result.data.msg || '出问题了~请检查响应信息'
          // })
          reject(result.data)
      }
    } else {
      Message.error({
        message: `网络不好，请重试（状态码：${result.status}）`
      })
      reject(result.data)
    }
  })
}

const _get = (url, params, paramData) => {
  let loading = null
  if (paramData.isLoading) {
    loading = Loading.service({
      lock: true,
      body: true
    })
  }
  return axios.request({
    url: (paramData && paramData.apiHost) ? `${paramData.apiHost}${url}` : `${host}${url}`,
    method: 'GET',
    params: params,
    withCredentials: true,
    validateStatus: function (status) {
      return status < 600
    }
  }).then(response => {
    loading && loading.close()
    return handleResponse(response)
  })
}

const _post = (url, payload, paramData) => {
  let loading = null
  if (paramData.isLoading) {
    loading = Loading.service({
      lock: true,
      body: true
    })
  }
  return axios.request({
    url: `${host}${url}`,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(payload),
    withCredentials: true,
    validateStatus: function (status) {
      return status < 600
    }
  }).then(response => {
    loading && loading.close()
    return handleResponse(response)
  })
}

export const factory = (obj) => {
  const output = {}
  Object.keys(obj).forEach(methodKey => {
    Object.keys(obj[methodKey]).forEach(apiKey => {
      const api = obj[methodKey][apiKey]
      output[apiKey] = function (data, paramData = { isLoading: true }) {
        switch (methodKey) {
          case 'get':
            return _get(api, data, paramData)
          case 'post':
            return _post(api, data, paramData)
          default:
            return null
        }
      }
    })
  })
  return output
}
