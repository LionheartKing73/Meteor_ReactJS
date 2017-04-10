Feature: Responder a pergunta “Qual seu veículo?”

  Eu como corretor
  Quero responder a pergunta “Qual seu veículo?” do questionário lúdico do Carro Fácil
  Para prosseguir com a venda do produto Carro Fácil

  Scenario: Falta de preenchimento do campo “Modelo” para a pergunta “Qual seu veículo?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta “Qual seu veículo?”
    And não preencher o campo “Modelo”
    And os demais campos estiverem preenchidos sem erros de validação
    And eu clicar no botão “Seguir”
    Then deverá aparecer a mensagem “O campo Modelo é obrigatório” abaixo do campo “Modelo”, que deverá ficar destacado em vermelho

  Scenario: Falta de preenchimento do campo “Ano” para a pergunta “Qual seu veículo?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta “Qual seu veículo?”
    And não preencher o campo “Ano”
    And os demais campos estiverem preenchidos sem erros de validação
    And eu clicar no botão “Seguir”
    Then deverá aparecer a mensagem “O campo Ano é obrigatório” abaixo do campo “Ano”, que deverá ficar destacado em vermelho

  Scenario: Preenchimento inválido do campo “Ano” para a pergunta “Qual seu veículo?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta “Qual seu veículo?”
    And preencher o campo “Ano” com dados inválidos (EX: 5454)
    And os demais campos estiverem preenchidos sem erros de validação
    And eu clicar no botão “Seguir”
    Then deverá aparecer a mensagem “Ano inválido” abaixo do campo “Ano”, que deverá ficar destacado em vermelho

  Scenario: Preenchimento correto da pergunta “Qual seu veículo?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta “Qual seu veículo?”
    And preencher os campos corretamente
    And eu clicar no botão “Seguir”
    Then deverá ser aberto o bloco para responder à pergunta “Você pagou este veículo à vista ou financiado?” com as seguintes opções de resposta: "À vista | Financiado"
