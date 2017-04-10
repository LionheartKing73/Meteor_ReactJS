Feature: Visualizar acessórios de um veículo

  Eu como corretor
  Quero saber todos os acessórios que o veículo possui
  Para informar ao cliente tudo que está contido no carro

Scenario: Visualização dos acessórios do veículo
Given estou na tela de Oferta Final do Carro Fácil
When clicar no botão “Ver mais itens de série”
Then deverá ser aberta uma tela que contenha uma lista com todos os acessórios contidos no veículo selecionado

Scenario: Saindo da tela de visualização dos acessórios do veículo
Given estou na tela de Oferta Final do Carro Fácil
When clicar no botão “Ver mais itens de série”
And for aberta uma lista com todos os acessórios contidos no veículo
And eu clicar em qualquer lugar da tela fora da lista que foi exibida
Then a lista de acessórios deve ser fechada
And a tela de oferta final não deve sofrer nenhuma alteração
