# Getting Started

Para rodar o projeto certifique-se de ter o docker-compose instalado

## Passo 1: Backend
Clone o projeto e depois inície o docker-compose que tem o banco de dados mongoDB e o serviço do SQS
```bash
# Clonar 
git clone {link respositório}

# Entrar na pasta
cd desafio-fullstack

# Rodar docker compose
docker-compose up -d

# Entrar na pasta do backend
cd backend

# Criar uma copia do .env-example e renomear para .env

# Instalar as dependências
npm install

# iniciar o modo desenvolvedor, esse comando usa npx
npm run dev
```

A url base é http://localhost:3000 existe lambadas para recuperar todas: get('/task'), cadastrar: post('task'), visualizar: get('/task/[id]'), atualizar: put('/task/[id]') e deletar: delete('/task/[id]')

```bash
# o body para ser enviado no post e put está abaixo completed é opcional:
{
  description: string,
  completed?: boolean
}

```
As mensagens são adicionadas no SQS quando uma tarefa é concluída e depois é processada por um consumer que enviar um email atravês do SES.
Para acompanhar as mensagens que estão sendo processadas acesse http://localhost:9325 e para visualizar o email recebido acesse http://localhost:8005

## Passo 2: Frontend

Como o backend em execução sair da pasta e seguir para os passos no front

```bash
# Acessar a pasta frontend
cd frontend

# Fazer uma copia do .env-example e renomear para .env

# Instalar as dependências
npm install

# Rodar o projeto
npm run dev
```
O front vai estár disponivel em http://localhost:4000
