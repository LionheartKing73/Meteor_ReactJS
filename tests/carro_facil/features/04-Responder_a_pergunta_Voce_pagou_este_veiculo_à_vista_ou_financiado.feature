Feature: Responder a pergunta “Você pagou este veículo à vista ou financiado?”

  Eu como corretor
  Quero responder a pergunta “Você pagou este veículo à vista ou financiado?” do questionário lúdico do Carro Fácil
  Para prosseguir com a venda do produto Carro Fácil

  Scenario: Tratamento da resposta "À vista" para a pergunta " Você pagou este veículo à vista ou financiado?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta " Você pagou este veículo à vista ou financiado?”
    And a resposta for “À vista”
    Then deverá ser aberto o bloco para responder à pergunta “Em média quanto tempo você troca de veículo?” com as seguintes opções de resposta: "1 ano | 2 anos | 3 anos | Acima de 3 anos"
    And deverão ser exibidas as seguintes argumentações: "Investir o valor do veículo. Quanto teria de rendimento? | Mantém suas reservas para emergência."

  Scenario: Tratamento da resposta "Financiado" para a pergunta " Você pagou este veículo à vista ou financiado?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta " Você pagou este veículo à vista ou financiado?”
    And a resposta for “Financiado”
    Then deverá ser aberto o bloco para responder à pergunta “Em média quanto tempo você troca de veículo?” com as seguintes opções de resposta: "1 ano | 2 anos | 3 anos | Acima de 3 anos"
    And deverão ser exibidas as seguintes argumentações: "Juros do financiamento equivale a quase 2 carros | Você paga um valor mensal e só se preocupa em dirigir. | Parcelas fixas e sem surpresas"
