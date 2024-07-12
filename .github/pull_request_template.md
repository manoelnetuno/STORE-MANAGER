# Projeto Store Manager

## O que vou desenvolver?

- Você vai desenvolver sua primeira API utilizando a arquitetura em camadas!
- A API a ser construída é um sistema de gerenciamento de vendas em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Você deverá utilizar o banco de dados MySQL para a gestão de dados. Além disso, a API deve ser RESTful.
- Você também irá desenvolver testes para garantir as funcionalidade das implementações, uma habilidade essencial para a pessoa desenvolvedora.

Neste projeto, verificamos se você é capaz de:

- Interagir com um banco de dados relacional MySQL;
- Implementar uma API utilizando arquitetura em camadas;
- Criar validações para os dados recebidos pela API;
- Escrever testes para APIs para garantir a implementação dos endpoints;

## Missão essencial

- [X] PR aberto para entrega do projeto Store Manager

## O que preciso saber para fazer o projeto?

- [ ] Fazer a comunicação do Node com o Banco de Dados
- [ ] Criar a camada de modelo e desenvolver os seus respectivos testes unitários.
- [ ] Criar a camada de serviço e desenvolver os seus respectivos testes unitários.
- [ ] Criar a camada de controller e desenvolver os seus respectivos testes unitários.

## Habilidades para o projeto

### _Vão ser necessárias para realização do projeto_

<details>
   <summary>1. BE4.5 - Node.js: Express e MySQL</summary>

- [ ] [BE4.5 - Node.js: Express e MySQL](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/2ed87e4f-9049-4314-8091-8f71b1925cf6/day/6b700197-22c6-4a2d-b791-b66d5247d3f0/lesson/4083c533-2264-42eb-b39a-dd7cd5b505e8): Neste dia de conteúdo é apresentado pela primeira vez a integração de **Express** com **MySQL** que é uma habilidade que é replicada principalmente no dia BE5.1 para a criação da camada **Model**. Também é apresentado o uso do **docker-compose** para iniciar uma aplicação com banco de dados criando um container para cada responsabilidade (_api_ e _banco de dados_). Esse dia dá uma bagagem para começar a seção 5 entendendo o funcionamento básico da lib _mysql2_.

</details>

<details>
   <summary>2. BE5.1 - Arquitetura de Software: Camada Model</summary>

- [ ] [Implementando o "R" de um CRUD do zero - Camada Model](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/6b5ecd71-9499-4ffe-8776-e91e46f93a08/lesson/35826f95-5fc1-4985-8497-7fc1464a937a): Nesta lição existe um exemplo de como implementar uma função na camada **Model** para as funcionalidades `Listar pessoas passageiras` e `Buscar pessoas passageiras por id` através da implementação das funções `findAll` e `findById`

</details>

<details>
   <summary>3. BE5.2 - Arquitetura de Software: Refatorando Camada Model</summary>

- [ ] [Refatorando a Camada Model](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/4d980798-642f-4b0d-bbdd-914e0f501383/lesson/05c246c3-19dd-4a7e-81d3-d30c9bf57290): Nesta lição você vai conhecer e entender a API `Trybecar`, que tem como propósito gerenciar corridas entre pessoas passageiras e motoristas. Vamos começar a refatorá-la e implementar a camada de **Model**, para isso usaremos a rota `POST /passengers/:passengerId/request/travel`, nela temos um `insert` e um `select` na tabela `travel`. Para garantir que tudo continua funcionando como esperamos vamos escrever testes unitários.
- [ ] [Avaliando cobertura de teste com nyc](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/4d980798-642f-4b0d-bbdd-914e0f501383/lesson/25ab6a94-b675-4577-99aa-18dadcbd0f33): Nesta lição é apresentado como a ferramenta nyc mede a cobertura de testes de uma aplicação.
  
</details>

<details>
   <summary>4. BE5.3 - Arquitetura de Software: Camada Service</summary>

- [ ] [Implementando um CRUD do zero - Parte 1 - Camada Service](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/6e17b47a-8c39-46f0-aa0f-98d10e689e2d/lesson/7ff514c7-b101-422d-9ef0-73ad7220c90d): Nesta lição implementaremos a camada de **Service** para a função `createCar` e adicionaremos as `regras de negócio`. Será apresentado pela primeira vez o uso do módulo **Joi** e um contrato de retorno de funções do **Service** para fazer uma validação.
- [ ] [Implementando um CRUD do zero - Parte 2 - Camada Service](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/6e17b47a-8c39-46f0-aa0f-98d10e689e2d/lesson/09e9cd30-ce77-4dfc-98fa-12a5224b64c9): Nesta lição vamos colocar nosso código para funcionar depois de implementarmos a camada de **Service**
- [ ] [Implementando um CRUD do zero - Parte 3 - Camada Service](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/6e17b47a-8c39-46f0-aa0f-98d10e689e2d/lesson/538fb95d-0f8c-48c6-95a0-eb4a5099a51d): Nesta lição implementaremos a função findAll, responsável por listar todos os carros cadastrados na aplicação. Essa função será bem simples, pois não teremos nenhuma regra de negócio a ser aplicada.
- [ ] [Bônus - Promise.all](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/6e17b47a-8c39-46f0-aa0f-98d10e689e2d/lesson/3b63da9d-f106-417c-85ce-5e61cbc4f701): Nesta lição é apresentado o `Promise.all` que nos ajuda a lidar métodos assíncronos em loops

</details>

<details>
   <summary>5. BE5.4: Arquitetura de Software: Refatorando Camada Service</summary>

- [ ] [Identificando as regras de negócio na API Trybecar](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/b44273c2-eee9-415e-8635-1c3b9c434266/lesson/a63cee4f-1635-4229-9e12-ae225f6b3677): Nesta lição vamos continuar refatorando nossa API `Trybecar`, agora na camada de **Service**, buscando identificar as regras de negócio para rotas de `POST` e `GET`
- [ ] [Refatorando rota POST - Inserção de viagens](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/b44273c2-eee9-415e-8635-1c3b9c434266/lesson/452b08c5-d0b8-4a47-8dd4-b203cd408fff): Esta lição apresenta a refatoração da rota `POST` `/passengers/:passengerId/request/travel` e a criação de testes unitários para ela.
- [ ] [Refatorando rota GET - Busca viagens em aberto](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/b44273c2-eee9-415e-8635-1c3b9c434266/lesson/8e6f5517-1d34-47c4-a84c-8ac468f16438): Esta lição apresenta a refatoração da rota `GET` `/drivers/open/travels` e a criação de testes unitários para ela.

</details>

<details>
   <summary>6. BE5.5: Arquitetura de Software: Refatorando Camada Controller</summary>

   - [ ] [Introdução à Camada Controller](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/47e36934-739e-427e-b405-cda3908ff9b1/lesson/2a8ce43c-7765-4262-a2bc-ff9512130a2d): Nesta lição iremos entender a camada **Controller**, suas responsabilidades e como ela interage com as outras camadas.
   - [ ] [Refatorando rota POST - Inserção de viagens](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/47e36934-739e-427e-b405-cda3908ff9b1/lesson/77d2e6be-f6c0-4853-87d2-a18ba4747bea):  Esta lição apresenta a refatoração da rota `POST` `/passengers/:passengerId/request/travel` e a criação de testes unitários para ela.
  - [ ] [Refatorando rota GET - Busca viagens em aberto](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/47e36934-739e-427e-b405-cda3908ff9b1/lesson/91529b00-350c-448e-a6cf-b8f54b2a3609): Esta lição apresenta a refatoração da rota `GET` `/drivers/open/travels` e a criação de testes unitários para ela.

</details>

### Conteúdos de Soft Skills

Bora relembrar conceitos importantes para gerir suas emoções durante o projeto?

- Que tal dedicar um momento para aprimorar suas soft skills e impulsionar sua carreira? [Neste artigo](https://forbes.com.br/carreira/2023/05/5-passos-para-construir-e-aperfeicoar-seu-elevator-pitch/?utm_campaign=AP_Newsletter&utm_medium=email&_hsmi=261064564&_hsenc=p2ANqtz-_YmF_g7wNSS9-gRcNaAQzu4vw3Vut74ZdskdqMrK7W3PmKnAk4dm2gtsGUzSgew7OgowK4X_iYDXpVZmwv8s3AJYBtPQ&utm_content=261064564&utm_source=hs_email#foto1) da Forbes, você encontrará dicas valiosas para aperfeiçoar seu "elevator pitch" e causar uma ótima impressão nos processos seletivos.
- Além disso, para se preparar ainda mais para as oportunidades, recomendamos criar um planejamento para divulgar seus projetos no Github e Linkedin. Confira [este conteúdo](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/2e0692c9-e226-4e95-860a-b4cad80e3c3c/section/d041930c-2861-493a-ab7e-9f566aa90d29/day/21747c38-dfaa-4103-99c1-e026f4405d3b/lesson/f8914f10-0491-4ca3-a6c9-680d44763eb6) sobre gestão de tempo, que irá te apoiar na organização, e [este](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/a3cac6d2-5060-445d-81f4-ea33451d8ea4/section/7b8bf759-4300-4ecc-a55d-52dbd44ee170/day/421938fc-56fc-44f4-9541-bedbb27f80f7/lesson/431f92b4-99b3-434e-91a1-d4845d0955f0) sobre publicações e marca pessoal, para criar uma publicação cativante e atrair a atenção no mercado!

### Materiáis complementares

 - [ ] [Mentoria de JOIN]()
 - [ ] [Mentoria de JOI]()
 - [ ] [Mentoria vale a pena ver de novo HOF`s parte 1]()
 - [ ] [Revisão de seção]()
 - [ ] [Mentoria Promise All]()
 - [ ] [Mentoria Clientes HTTP]()

## Requisitos obrigatórios do Projeto

- [ ] 01 - Crie endpoints para listar produtos
- [ ] 02 - Crie endpoints para listar vendas
- [ ] 03 - Crie endpoint para cadastrar produtos
- [ ] 04 - Crie validações para o cadastro de produtos
- [ ] 05 - Crie endpoint para cadastrar vendas
- [ ] 06 - Crie validações para o cadastro de vendas
- [ ] 07 - Crie endpoint para atualizar um produto
- [ ] 08 - Crie endpoint para deletar um produto

:bulb: _**Dica:** Os requisitos 5 e 6 são os que exigem maior esforço no desenvolvimento. Separe um tempo de qualidade para focar nesses requisitos. Use a dica de revisar as lições. **[Refatorando - Parte 1](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/6e17b47a-8c39-46f0-aa0f-98d10e689e2d/lesson/9e624151-2c01-4af8-9564-62075b2514d1)** e **[Validações](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/6e17b47a-8c39-46f0-aa0f-98d10e689e2d/lesson/b3016ec8-4df4-4ee9-9e71-22a5e77504ea)** para fazer esse requisito._

## Requisitos bônus

- [ ] 09 - Crie endpoint para deletar uma venda
- [ ] 10 - Crie endpoint para atualizar a quantidade de um produto em uma venda
- [ ] 11 - Crie endpoint para pesquisar produtos

---

## Bônus: Sugestão de Planejamento

O projeto possui 8 requisitos obrigatórios e 5 dias dedicados completamente. Para ser aprovado dentro do prazo regular vai ser necessário fazer no mínimo 7 dos requisitos obrigatórios. Se você fizer 2 requisitos por dia, é possível entregar o projeto praticamente inteiro dentro dos dias do projeto! 🤩

Segue uma sugestão de cronograma simplificado de planejamento. Fique a vontade para fazer as adaptações que achar necessário.

### **Dia 1:** Requisitos 1 e 2

- Os requisitos 1 são para o desenvolvimento dos _endpoints_ de listagem, que não demandam o desenvolvimento de uma regra de negócio nem validação. Aproveite para criar uma estrutura de projeto bem organizada e com uma boa cobertura de testes.

### Dia 2: Requisitos 3 e 4

- Os requisitos 3 e 4 são parte de uma mesma funcionalidade (_cadastrar um produto_).

- O requisito 3 é mais simples, pois apenas pede a criação do _endpoint_ sem validações (o _"caminho feliz"_).

- 💡Dica: Ao chegar no requisito 4, crie os testes de validação (os _"caminhos tristes"_) antes de implementar as validações, assim ficará mais fácil ver que a validação está funcionando corretamente.

### Dia 3: Requisito 5 e 6

- Os requisitos 5 e 6 são parte de uma mesma funcionalidade (_cadastrar uma venda_).

- Esses requisitos seguem na mesma linha dos requisitos 3 e 4, mas adicionam a complexidade de ter que manipular mais de uma tabela no banco de dados. Começar pelos testes é uma boa estratégia para esses requisitos!

### Dia 4: Requisitos 7 e 8

- O requisito 7 é um requisito mais rápido de desenvolver, pois pode aproveitar as validações do requisito 3, e o requisito 8 tem um esforço similar ao requisito 1.

### Dia 5: Requisitos bônus!

- Parabéns pelo seu esforço até aqui! Se você chegou no dia 5 com 7 dos requisitos obrigatórios feitos, você já está aprovado! 🎉

- Caso ainda não tenha completado os requisitos obrigatórios, aproveite o dia 5 para finalizar o que falta e, se ainda tiver tempo, comece a fazer os requisitos bônus! 🚀

## Conteúdos de Carreira
Projeto finalizado e aprovado pelo avaliador do GitHub? É hora de deixar registrada a sua capacidade técnica.
Acesse o conteúdo [GitHub: Publicando projetos feitos na Trybe](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/a3cac6d2-5060-445d-81f4-ea33451d8ea4/section/d4f5e97a-ca66-4e28-945d-9dd5c4282085/day/eff12025-1627-42c6-953d-238e9222c8ff/lesson/49cb103b-9e08-4ad5-af17-d423a624285a) e publique seu projeto de forma correta em seu GitHub pessoal, preservando todo seu histórico de commits, e respeitando os [Termos de Uso da Trybe](https://www.betrybe.com/termos-de-uso). 🎉

Desejamos um bom projeto para todas as pessoas estudantes e que seja fonte de muito aprendizado. ✌️
