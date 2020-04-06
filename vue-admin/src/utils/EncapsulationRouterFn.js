export function hasPemission(roles , router) {  //第一个参数是角色 第二个参数是路由
  return router.meta.role.some((item) => roles.indexOf(item)  >= 0)
}