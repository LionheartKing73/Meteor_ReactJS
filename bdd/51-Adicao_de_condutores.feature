Feature: Adição de condutores

  Eu como corretor
  Quero adicionar condutores
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Adicionar Condutores na tela de Adição de Condutores
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu selecionar o botão “Adicionar Condutores”
Then um novo bloco de “Dados do condutor” deve ser aberto

Scenario: Limite de adição de Condutores Adicionais na tela “Adição de condutores”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu selecionar o botão “Adicionar Condutores”
Then o sistema deve limitar a adição em até 5 condutores
