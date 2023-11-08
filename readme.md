# JRPanfletos
## Versão: 1.0 
## Status do Projeto: ⚠️ Espera

## Tópicos
🔹 Descrição do projeto 

🔹 Funcionalidades

🔹 Distribuição

🔹 Pré-requisitos

🔹 Como rodar a aplicação

🔹 Testes realizados

🔹 Banco de Dados

🔹 Linguagens, dependências e libs utilizadas

🔹 Novas Recursos

🔹 Resolvendo problemas

🔹 Recursos inseridos 

🔹 Desenvolvedores/Contribuintes

🔹 Informações Extras


## Descrição do projeto
Foi um projeto realizado em conjunto com a JRPanfletos para ajudar no controle interno da empresa , tendo funções como : controle de funcionários , controle de clientes, controle dos setores , controles das autorizações de distribuição e também tendo controle dos relatórios de distribuição

## Funcionalidades ⚙️

✔️ Deve ser possível se autenticar; <br/>
✔️ Deve ser possível obter o perfil de um usuário logado;<br/>
✔️ Deve ser possível criar uma autorização de distribuição;<br/>
✔️ Deve ser possível criar um relatório de distribuição;<br/>
✔️ Deve ser possível fazer o CRUD de um cliente à plataforma;<br/>
✔️ Deve ser possível fazer o CRUD de um funcionário;<br/>
✔️ Deve ser possível buscar o cliente pela razão social e/ou cnpj;<br/>
✔️ Deve ser possível ver todos os relatórios geerado e as autorizações;<br/>
✔️ Deve ser possível adicionar fotos ( 3 ) ao relatório;<br/>
[ ] Pode ser possível ver/criar um pdf;<br/>

## Distribuição
Link para teste da versão disponibilizada.

## Pré-requisitos ⚠️   

[ ] - NodeJs
[ ] - Docker

## Como rodar a aplicação 
1 - Deve-se clonar o repositório 
2 - Mudar a branch para a develop
3 - Backend
```
  cd server
  npm i
  docker compoese up -d
  npm run start:dev
  HTTP SERVER RUNNING
```
* lembrando que precisa executar npx prisma studio , e inserir um usuário no banco de dados

3 - Frontend
```
  cd web
  npm i
  npm run dev
```

## Testes realizados
Foi utilizados a metologia de TDD, com testes unitários e testes de aceitação

## Banco de Dados 🗂️
Este sendo utilizado banco de dados em POSTGREESQL

## Linguagens, dependencias e libs utilizadas 📚
![Typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Fastify](https://img.shields.io/badge/-Fastify-black?logo=fastify&logoColor=red&style=for-the-badge)
![TailwindCss](https://img.shields.io/badge/-TailwindCss-white?logo=tailwindcss&logoColor=blue&style=for-the-badge)
![Vitest](https://img.shields.io/badge/-Vitest-white?logo=vitest&logoColor=yellow&style=for-the-badge)
![Axios](https://img.shields.io/badge/-Axios-white?logo=axios&logoColor=red&style=for-the-badge)

## Resolvendo Problemas 
Foram resolvidos problemas através da planilha de testes .

## Recursos de inseridos 🧰
Se for o caso, liste tarefas/funcionalidades que ainda precisam ser implementadas na sua aplicação, insira fotos da tela do app.

📝 Gerar Pdf
📝 Fazer implementação

## Desenvolvedores/Contribuintes:
Gabriel Aparecido - Desenvolvedor
Lucas Kenzo Credencio - QA
Gabriel Alexandre Rosa - Infra
Gabriel Koury de Lima - Product Manager
Erik Barrados Viera - Product Manager
Vitor Augusto - Product Manager

## Licença
The MIT License (MIT)

## Copyright ©️ 2023 - JRPanfletos
