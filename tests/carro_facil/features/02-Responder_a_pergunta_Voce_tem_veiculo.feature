Feature: 02 - Responder a pergunta "Você tem veículo?"

  Eu como corretor
  Quero responder a pergunta "Você tem veículo" do questionário lúdico do Carro Fácil
  Para prosseguir com a venda do produto Carro Fácil

  Background:
    Given estou na tela de questionário lúdico do Carro Fácil
    And eu estiver respondendo à pergunta "Você tem veículo ?"

  @watch
  Scenario: Tratamento da resposta "Sim, 0 KM" para a pergunta "Você tem veículo?"
    When escolher a resposta "Sim, 0 KM" para a pergunta "Você tem veículo ?"
    Then deverão aparecer os seguintes blocos de pergunta: "Qual é o seu veículo ? | Você pagou este veículo à vista ou financiado? | Em média, com quanto tempo você troca de veículo?"
    And deverão ser exibidas as seguintes argumentações: "Depreciação média do veículo: 20% por ano | Melhor planejamento financeiro | Não precisa retirar seus investimentos"

  @watch
  Scenario: Tratamento da resposta "Sim, usado" para a pergunta "Você tem veículo?"
    When escolher a resposta "Sim, usado" para a pergunta "Você tem veículo ?"
    Then deverão aparecer os seguintes blocos de pergunta: "Qual é o seu veículo ? | Você pagou este veículo à vista ou financiado? | Em média, com quanto tempo você troca de veículo?"
    And deverão ser exibidas as seguintes argumentações: "Depreciação média do veículo: 20% por ano | Melhor planejamento financeiro | Não precisa retirar seus investimentos"

  @watch
  Scenario: Tratamento da resposta "Não" para a pergunta "Você tem veículo?"
    When escolher a resposta "Não" para a pergunta "Você tem veículo ?"
    Then deverá ser aberto o bloco para responder à pergunta: "Qual seu meio de locomoção preferido"