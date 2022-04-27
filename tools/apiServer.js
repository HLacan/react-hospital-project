const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))

const middlewares = jsonServer.defaults({
  static: 'node_modules/json-server/dist',
})

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(router)
server.listen(3001, () => {
  console.log('Server running on port 3001!')
})
