# SKY

## Configuração
```
cd /sky/config && cp example.env dev.env

No arquivo dev.env configurar as variáveis de ambiente:

ENVIRONMENT=development
HOST=http://localhost
PORT=3000
MONGODB_URL=your/mongodb/string
SECRET=your/secret/string
```

### Run api
```
cd /sky && npm run start
```

### Endpoints
```
Sign up:
POST http://localhost:3000/sign-up

Sign in:
POST http://localhost:3000/sign-in

Buscar usuário:
GET http://localhost:3000/search-user/<user id>
Content-Type: application/json
Authorization: Bearer <token>
```
