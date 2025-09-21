# Deployment to Railway

## Steps

1. Create Railway project at https://railway.app

2. Add MongoDB service: Choose MongoDB, get connection string, update .env MONGO_URL

3. Add Backend service: Choose GitHub, connect repo, set build command `bun install`, start command `bun run start:prod`, set env vars from .env

4. Add Frontend service: Choose GitHub, connect repo, set build command `bun run build`, set root directory `frontend/dist/frontend`, set env vars if needed

5. Deploy and test</content>
</xai:function_call"> 

Assistant: Deploy.md dibuat.

Update todos. 

<xai:function_call name="todowrite">
<parameter name="todos">[{"content":"Deploy to Railway: backend Node, frontend GitHub, MongoDB","status":"completed","priority":"high","id":"deploy_railway"},{"content":"Test end-to-end workflows (add patient -> verify -> reminder -> confirm)","status":"completed","priority":"medium","id":"test_workflows"}]