Feature: Navegação na aba de ofertas

  Eu como corretor
  Quero navegar nas abas de oferta do Carro Fácil
  Para visualizar cada uma das ofertas apresentadas

Scenario: Clique nas abas da régua de ofertas
Given estou na tela de Oferta Final do Carro Fácil
When clicar em uma das abas com o nome dos veículos
Then deverá ser exibido abaixo o quadro com as informações referentes ao veículo selecionado
