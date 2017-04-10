Feature: Seleção de opção no combo “KM Adicional”

  Eu como corretor
  Quero selecionar a quilometragem adicional desejada pelo cliente
  Para realizar a contratação

Scenario: Selecionando Quilometragem adicional para pagamento à vista
Given estou na tela de Oferta Final do Carro Fácil
When selecionar “À vista” para o campo “Quantidade de Parcelas”
And selecionar uma opção para o campo “KM Adicional”
Then o valor a ser pago pelo adicional de quilometragem deve ser acrescentado no valor total do contrato.
Exemplo:
Valor total do contrato: R$ 20.000,00
KM Adicional: 10.000 KM (+ R$ 3500,00)
Pagamento à vista
Deve ser exibido na tela:
Total: 1x de R$ 23.350,00 (valor do contrato + km adicional)

Scenario: Selecionando Quilometragem adicional para contrato de 1 ano, pagamento em 12 vezes
Given estou na tela de Oferta Final do Carro Fácil
When eu selecionar “1 ano” para a opção tempo do contrato
And selecionar “12 vezes” para o campo “Quantidade de Parcelas”
And selecionar uma opção para o campo “KM Adicional”
Then o valor a ser pago pelo adicional de quilometragem deve ser acrescentado em todas as parcelas.
Exemplo:
Valor total do contrato: R$ 20.000,00
KM Adicional: 10.000 KM (+ R$ 350,00 na parcela)
Pagamento parcelado em 12 vezes
Deve ser exibido na tela:
Total: 12x de R$ 2.016,66 (valor do contrato dividido por 12 + 350 reais do km adicional)

Scenario: Selecionando Quilometragem adicional para contrato de 2 anos, pagamento em 24 vezes
Given estou na tela de Oferta Final do Carro Fácil
When eu selecionar “2 anos” para a opção tempo do contrato
And selecionar “24 vezes” para o campo “Quantidade de Parcelas”
And selecionar uma opção para o campo “KM Adicional”
Then o valor a ser pago pelo adicional de quilometragem deve ser acrescentado nas parcelas.
Exemplo:
Valor total do contrato: R$ 50.000,00
KM Adicional: 10.000 KM (+ R$ 350,00 na parcela)
Pagamento parcelado em 24 vezes
Deve ser exibido na tela:
Total: 24x de R$ 2.433,33 (valor do contrato dividido por 24 + 350 reais do km adicional)
