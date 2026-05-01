export function loginApi(data) {
  return new Promise(resolve => {
    if (data.username === 'admin' && data.password === '123456') {
      resolve({
        code: 200,
        message: '登录成功',
        data: {
          token: 'mock-token',
          userInfo: {
            username: 'admin',
            nickname: '管理员'
          }
        }
      })
    } else {
      resolve({
        code: 500,
        message: '账号或密码错误'
      })
    }
  })
}