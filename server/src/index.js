import {fileURLToPath} from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import Koa from 'koa'
import websokify from 'koa-websocket'
const app = websokify(new Koa())
import cors from '@koa/cors'
import logger from 'koa-morgan'
import bodyParser from '@koa/bodyparser'
import authMiddleware from './middleware/authMiddleware.js'
import serve from 'koa-static'
import Router from '@koa/router'
const wsRouter = new Router()
const router = new Router()
import api from './routes/index.js'
import blog from './routes/blog.js'
import works from './routes/works.js'

app.use(cors({
    origin: '*',
    credentials: true,
}))
// console.log(path.join(__dirname, '/uploads'))
app.use(serve(path.join(__dirname, '../public')));
app.use(logger('dev'))
app.use(bodyParser())
app.use(authMiddleware)
wsRouter.use((ctx, next) => {
    // return `next` to pass the context (ctx) on to the next ws middleware
    return next(ctx);
  });

// api, blog, works 라우트 미들웨어보다 앞서서 authMiddleware 사용 (=미들웨어 장착)
router.use("/api", api.routes());
router.use("/blog", blog.routes());
router.use("/works", works.routes());
// Using routes
wsRouter.get('/', async (ctx, next) => {
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    ctx.websocket.send('Hello World 명심님!');
    ctx.websocket.on('message', (message) => {
        console.log('massage',toString())
      // do something with the message from client
      if (message.toString() === 'ping') {
        ctx.websocket.send('pong');
      }
    });
    return next;
  });
  app.ws.use(wsRouter.routes()).use(wsRouter.allowedMethods());
  app.use(router.routes()).use(router.allowedMethods())


app.listen(4000, () => {
    console.log('server is listening on port 4000!')
})