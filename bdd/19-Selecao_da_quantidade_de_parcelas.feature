Feature: Seleção da quantidade de parcelas

  Eu como corretor
  Quero selecionar a quantidade de parcelas que o cliente deseja pagar
  Para continuar o processo de venda do Carro Fácil

Scenario: Selecionando a quantidade de parcelas: contrato de 1 ano, à vista
Given estou na tela de Oferta Final do Carro Fácil
When eu selecionar “1 ano” para o tempo do contrato
And selecionar “À vista” para o campo “Quantidade de Parcelas”
Then deverá ser exibido o valor a ser pago pelo cliente no seguinte formato e com a seguinte máscara:
Total: 1x de R$ 99.999,00

Scenario: Selecionando a quantidade de parcelas: contrato de 2 anos, à vista
Given estou na tela de Oferta Final do Carro Fácil
When eu selecionar “2 anos” para o tempo do contrato
And selecionar “À vista” para o campo “Quantidade de Parcelas”
Then deverá ser exibido o valor a ser pago pelo cliente no seguinte formato e com a seguinte máscara:
Total: 1x de R$ 99.999,00

Scenario: Selecionando a quantidade de parcelas: contrato de 1 ano, 12 vezes
Given estou na tela de Oferta Final do Carro Fácil
When eu selecionar “1 ano” para o tempo do contrato
And selecionar “12 vezes” para o campo “Quantidade de Parcelas”
Then deverá ser exibido o valor a ser pago pelo cliente no seguinte formato e com a seguinte máscara:
Total: 12x de R$ 99.999,00

Scenario: Selecionando a quantidade de parcelas: contrato de 2 anos, 24 vezes
Given estou na tela de Oferta Final do Carro Fácil
When eu selecionar “2 anos” para o tempo do contrato
And selecionar “24 vezes” para o campo “Quantidade de Parcelas”
Then deverá ser exibido o valor a ser pago pelo cliente no seguinte formato e com a seguinte máscara:
Total: 24x de R$ 99.999,00

Scenario: Campo “Quantidade de parcelas” não selecionado
Given estou na tela de Oferta Final do Carro Fácil
When eu não selecionar uma opção para o campo “Quantidade de Parcelas”
And clicar no botão “Vamos em frente?”
Then deve ser apresentada a mensagem “A quantidade de parcelas é obrigatória”
And o campo “Quantidade de Parcelas” deve ser destacado em vermelho
