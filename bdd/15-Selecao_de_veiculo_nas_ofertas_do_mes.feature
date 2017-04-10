Feature: Seleção de veículo nas ofertas do mês

  Eu como corretor
  Quero selecionar o veículo que está nas ofertas do mês
  Para oferecer um produto mais barato para o cliente

Scenario: Seleção de veículo nas ofertas do mês
Given estou na tela de Oferta Final do Carro Fácil
When clicar no botão “Ofertas do mês”
And clicar em um dos veículos que apareceram na lista
Then a tela deverá ser carregada novamente com o veículo escolhido
And a aba da esquerda deverá apresentar um veículo de valor menor ou igual ao veículo selecionado
And a aba da direita deverá apresentar um veículo de valor maior ou igual ao veículo selecionado

Scenario: Saindo da tela de seleção de veículo nas ofertas do mês
Given estou na tela de Oferta Final do Carro Fácil
When clicar no botão “Ofertas do mês”
And clicar no botão “Cancelar”
Then a tela de ofertas do mês deve ser fechada sem que ocorra nenhuma alteração na tela de oferta final
