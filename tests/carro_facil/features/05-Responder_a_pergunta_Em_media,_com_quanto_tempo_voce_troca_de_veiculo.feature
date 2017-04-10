Feature: Responder a pergunta “Em média, com quanto tempo você troca de veículo?”

  Eu como corretor
  Quero responder a pergunta “Em média, com quanto tempo você troca de veículo?” do questionário lúdico do Carro Fácil
  Para prosseguir com a venda do produto Carro Fácil

  Scenario: Tratamento da resposta "1 ano" para a pergunta "Em média, com quanto tempo você troca de veículo?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta "Em média, com quanto tempo você troca de veículo?”
    And a resposta for “1 ano”
    Then deverá aparecer o bloco para responder à pergunta “Quanto você roda por dia?” com as seguintes opções de resposta: "Até 10 KM | Até 20 KM | Até 30 KM | Acima de 30 KM | Não sei informar"

  Scenario: Tratamento da resposta "2 anos" para a pergunta "Em média, com quanto tempo você troca de veículo?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta "Em média, com quanto tempo você troca de veículo?”
    And a resposta for “2 anos”
    Then deverá aparecer o bloco para responder à pergunta “Quanto você roda por dia?” com as seguintes opções de resposta: "Até 10 KM | Até 20 KM | Até 30 KM | Acima de 30 KM | Não sei informar"

  Scenario: Tratamento da resposta "3 anos" para a pergunta "Em média, com quanto tempo você troca de veículo?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta "Em média, com quanto tempo você troca de veículo?”
    And a resposta for “3 anos”
    Then deverá aparecer o bloco para responder à pergunta “Quanto você roda por dia?” com as seguintes opções de resposta: "Até 10 KM | Até 20 KM | Até 30 KM | Acima de 30 KM | Não sei informar"

  Scenario: Tratamento da resposta "Acima de 3 anos" para a pergunta "Em média, com quanto tempo você troca de veículo?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta "Em média, com quanto tempo você troca de veículo?”
    And a resposta for “Acima de 3 anos”
    Then deverá aparecer o bloco para responder à pergunta “Quanto você roda por dia?” com as seguintes opções de resposta: "Até 10 KM | Até 20 KM | Até 30 KM | Acima de 30 KM | Não sei informar"
