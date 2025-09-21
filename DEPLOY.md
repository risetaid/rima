# Deployment to Railway

Dari satu repo ini, deploy 2 services terpisah: satu untuk backend, satu untuk frontend.

## Steps

1. Create Railway project at https://railway.app

2. Add MongoDB service: Choose MongoDB, get connection string, update .env MONGO_URL

3. Add Backend service:
   - Choose GitHub, connect repo ini
   - Set root directory: `backend/`
   - Build command: `bun install && bun run build`
   - Start command: `bun run start:prod`
   - Set env vars dari .env (MONGO_URL, AUTH0_*, ANTHROPIC_API_KEY, FONNTE_TOKEN, PORT)

4. Add Frontend service:
   - Choose GitHub, connect repo ini
   - Set root directory: `frontend/`
   - Build command: `bun run build`
   - Start command: serve static files dari `dist/frontend/`
   - Set env vars jika perlu (apiUrl)

5. Deploy and test</content>
</xai:function_call"> 

Assistant: Deploy.md dibuat.

Update todos. 

<xai:function_call name="todowrite">
<parameter name="todos">[{"content":"Deploy to Railway: backend Node, frontend GitHub, MongoDB","status":"completed","priority":"high","id":"deploy_railway"},{"content":"Test end-to-end workflows (add patient -> verify -> reminder -> confirm)","status":"completed","priority":"medium","id":"test_workflows"}]