Feature: Mover indicação para ações do dia

  Eu como corretor
  Quero visualizar minhas indicações nas ações do dia
  Para saber When devo entrar em contato com elas

Scenario: Adicionar cliente indicado na lista de ações do dia
Given que estou na tela de Avaliação de Venda, bloco “Indicações do Cliente”
When eu preencher os campos “Nome”, “Telefone”, “Data de agendamento” e “Produto”
And o campo “Data de agendamento” tiver a data igual ao dia de hoje
Then a pessoa indicada deve aparecer na lista de Ações do Dia




