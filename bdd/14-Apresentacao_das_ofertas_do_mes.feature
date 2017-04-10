Feature: Apresentação das ofertas do mês

  Eu como corretor
  Quero visualizar as ofertas do mês
  Para oferecer promoções para o cliente

Scenario: Clique do botão “Ofertas do mês”
Given estou na tela de Oferta Final do Carro Fácil
When clicar no botão “Ofertas do mês”
Then deve ser exibida uma lista contendo todos os veículo que estão em oferta no mês com as seguintes informações:
Título “Selecione o veículo desejado”
Marca do veículo
Modelo do veículo
Valor original
Valor promocional
Botão “Cancelar”
