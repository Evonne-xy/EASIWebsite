import axios from 'axios'

const instance = axios.create({
  baseURL:
    'https://www.fastmock.site/mock/27a7a97298b45004b177ad4c492f30e6/test',
  timeout: 10000,
})

/** 封装的axios get请求方法 */
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

/** 封装的axios post请求方法 */
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
  })
}
