# App

JRPanfletos

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível criar uma autorização de distribuição;
- [ ] Deve ser possível criar um relatório de distribuição;
- [ ] Deve ser possível fazer o CRUD de um cliente à plataforma;
- [ ] Deve ser possível fazer o CRUD de um funcionário;
- [ ] Deve ser possível buscar o cliente pela razão social e/ou cnpj;
- [ ] Deve ser possível ver todos os relatórios geerado e as autorizações;
- [ ] Deve ser possível adicionar fotos ( 3 ) ao relatório;
- [ ] Pode ser possível CRUD de um pdf;

## RNs (Regras de negócio)

- [ ] Não pode ter funcionários com o mesmo cpf/numero da carteira de trabalho;
- [ ] Não pode gerar um relatório sem uma autorização;
- [ ] Um funcionário não pode alterar infos de outros funcionários;
- [ ] Usúario será criado apenas por conta ADM;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);