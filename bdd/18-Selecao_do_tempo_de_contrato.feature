Feature: Seleção do tempo de contrato

  Eu como corretor
  Quero selecionar o tempo de contrato do veículo
  Para continuar o processo de venda do Carro Fácil

Scenario: Selecionando contrato de 1 ano para o Carro Fácil
Given estou na tela de Oferta Final do Carro Fácil
When eu estiver escolhendo o tempo de contrato
And selecionar a opção “1 ano”
Then o campo “Quantidade de parcelas” deve ser carregado com as seguintes opções:
À vista
12 vezes

Scenario: Selecionando contrato de 2 anos para o Carro Fácil
Given estou na tela de Oferta Final do Carro Fácil
When eu estiver escolhendo o tempo de contrato
And selecionar a opção “2 anos”
Then o campo “Quantidade de parcelas” deve ser carregado com as seguintes opções:
À vista
24 vezes

Scenario: Campo “Tempo de contrato” não selecionado
Given estou na tela de Oferta Final do Carro Fácil
When eu não selecionar a opção do tempo de contrato
And clicar no botão “Vamos em frente?”
Then deve ser apresentada a mensagem “O tempo de contrato é obrigatório”
And o campo “Tempo de contrato” deve ser destacado em vermelho
