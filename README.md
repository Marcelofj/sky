# SKY

## Configuração
```
cd sky/config && cp example.env dev.env

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
