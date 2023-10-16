# App

JRPanfletos

## RFs (Requisitos funcionais)

- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível criar uma autorização de distribuição;
- [x] Deve ser possível criar um relatório de distribuição;
- [x] Deve ser possível fazer o CRUD de um cliente à plataforma;
- [x] Deve ser possível fazer o CRUD de um funcionário;
- [x] Deve ser possível buscar o cliente pela razão social e/ou cnpj;
- [x] Deve ser possível ver todos os relatórios geerado e as autorizações;
- [ ] Deve ser possível adicionar fotos ( 3 ) ao relatório;
- [ ] Pode ser possível ver/criar um pdf;

## RNs (Regras de negócio)

- [x] Não pode ter funcionários com o mesmo cpf/numero da carteira de trabalho;
- [x] Não pode gerar um relatório sem uma autorização;f
- [x] Um funcionário não pode alterar infos de outros funcionários;
- [x] Usúario será criado apenas por conta ADM;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);


## Como rodar ?

Aqui tem o repositorio , do backend e do frontend , então tem que instalado o seguinte :

- Docker - https://www.docker.com/products/docker-desktop/
- NodeJS

### Passo a passo

git clone https://github.com/Gabriel-Aparecido03/JRPanfletos.git
entre na branch dev

#### Server
- cd server
- npm i
- docker compose up -d [ -d serve para rodar em mode detached ]
- npx prisma studio
- Crie um usuario como ADMIN ( Na role )
- Com a senha : $2a$06$agJssGcdYTPP/n5/31sURuOr.nWKcFn1LLuIsdlpDRjDGh9tKFutu , que é o hash de 123mudar
- npm run start:dev
- Deve aparecer 'HTTP server running'

##### Frontend
- cd web
- npm i 
- npm run dev
- Deve aparecer a URL do localhost

#### Obs

Não temos ainda a opção de mandar imagem , gerar pdf !
