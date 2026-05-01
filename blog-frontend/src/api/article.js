import request from '@/utils/request'

export function getArticlePage(params) {
  return request({
    url: '/api/articles/page',
    method: 'get',
    params
  })
}

export function getArticleById(id) {
  return request({
    url: `/api/articles/${id}`,
    method: 'get'
  })
}

export function addArticle(data) {
  return request({
    url: '/api/articles',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/articles',
    method: 'put',
    data
  })
}

export function deleteArticle(id) {
  return request({
    url: `/api/articles/${id}`,
    method: 'delete'
  })
}