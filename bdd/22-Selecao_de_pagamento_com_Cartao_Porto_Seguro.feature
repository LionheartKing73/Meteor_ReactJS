Feature: Seleção de pagamento com Cartão Porto Seguro

  Eu como corretor
  Quero selecionar o pagamento com Cartão Porto Seguro
  Para prosseguir com o processo de venda do Carro Fácil

Scenario: Seleção da forma de pagamento com Cartão de Crédito Porto Seguro para pagamento à vista
Given estou na tela de Oferta Final do Carro Fácil
When eu selecionar “1 ano” ou “2 anos” para a opção tempo do contrato
And selecionar “À vista” para o campo “Quantidade de Parcelas”
And selecionar a opção de pagamento com Cartão Porto Seguro
Then o valor do desconto concedido por essa forma de pagamento deve ser apresentado na tela.
Exemplo:
Valor total do contrato: R$ 50.000,00
Pagamento à vista
Deve ser exibido na tela:
Total: 1x de R$ 49.850,00 (valor do contrato – R$ 150 de desconto)

Scenario: Seleção da forma de pagamento com Cartão de Crédito Porto Seguro para pagamento parcelado
Given estou na tela de Oferta Final do Carro Fácil
When eu selecionar “1 ano” ou “2 anos” para a opção tempo do contrato
And selecionar “12 vezes” ou “24 vezes” para o campo “Quantidade de Parcelas”
And selecionar a opção de pagamento com Cartão Porto Seguro
Then o valor do desconto concedido por essa forma de pagamento deve ser apresentado na tela.
Exemplo 1:
Valor total do contrato: R$ 50.000,00
Pagamento em 12 vezes
Deve ser exibido na tela:
Total: 1x de R$ 4.016,00 (valor da parcela – R$ 150 de desconto)
11x de R$ 4.166,00 (valor normal da parcela)
Exemplo 2:
Valor total do contrato: R$ 50.000,00
Pagamento em 24 vezes
Deve ser exibido na tela:
Total: 1x de R$ 1.933,00 (valor da parcela – R$ 150 de desconto)
23x de R$ 2.083,00 (valor normal da parcela)
