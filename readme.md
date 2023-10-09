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
- [ ] Deve ser possível ver todos os relatórios geerado e as autorizações;
- [ ] Deve ser possível adicionar fotos ( 3 ) ao relatório;
- [ ] Pode ser possível CRUD de um pdf;

## RNs (Regras de negócio)

- [x] Não pode ter funcionários com o mesmo cpf/numero da carteira de trabalho;
- [x] Não pode gerar um relatório sem uma autorização;
- [x] Um funcionário não pode alterar infos de outros funcionários;
- [x] Usúario será criado apenas por conta ADM;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);