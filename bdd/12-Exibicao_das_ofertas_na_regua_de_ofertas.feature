Feature: Exibição das ofertas na régua de ofertas

  Eu como corretor
  Quero visualizar os veículos da régua de ofertas
  Para oferecer mais opções de compra e aumentar as chances de venda

Scenario: Regra de exibição da régua de ofertas
Given estou na tela de Oferta Final do Carro Fácil
When a régua de ofertas for carregada
Then devem ser exibidos os veículos da régua de ofertas de acordo com as regras abaixo:
Aba da esquerda: deve ser exibido um veículo que possui valor menor ou igual ao veículo escolhido pelo cliente. Se não existir um veículo nessas condições, a aba não deve ser exibida
Aba central: deve ser exibido o veículo escolhido pelo cliente
Aba da direita: deve ser exibido um veículo que possui um valor maior ou igual ao veículo escolhido pelo cliente. Se não existir um veículo nessas condições, a aba não deve ser exibida
