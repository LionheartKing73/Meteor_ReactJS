Feature: Classificação do interesse no novo produto

  Eu como corretor
  Quero classificar o interesse do cliente no novo produto que foi oferecido
  Para informar a situação de interesse do cliente

Scenario: Classificação do interesse do produto de Checkout
Given estou na página “Produtos de Checkout” do Carro Fácil
When eu clicar no botão “Classificar” na página “Produtos de Checkout” do Carro Fácil
Then os seguintes status devem ser apresentadas:
  "Não pode falar no momento",
  "Possui o produto com outra empresa",
  "Não tem interesse no produto"
And o botão “Salvar” deve ser apresentado

Scenario: Seleção da opção “Não pode falar no momento” do botão “Classificar”
Given estou na página “Produtos de Checkout” do Carro Fácil
When eu clicar no botão “Classificar” na página “Produtos de Checkout” do Carro Fácil
And selecionar a opção “Não pode falar no momento”
Then o sistema deve apresentar um calendário para agendamento de contato

Scenario: Validação preenchimento “Data agendamento” do botão “Classificar”, status “Não pode falar no momento”
Given estou na página “Produtos de Checkout” do Carro Fácil
When eu clicar no botão “Classificar” na página “Produtos de Checkout” do Carro Fácil
And selecionar a opção “Não pode falar no momento”
And não selecionei uma data de agendamento no calendário
And cliquei no botão “Salvar”
Then o sistema deve apresentar a mensagem: “Por favor, selecione uma data de agendamento”

Scenario: Seleção da opção “Possui o produto com outra empresa” do botão “Classificar”
Given estou na página “Produtos de Checkout” do Carro Fácil
When eu clicar no botão “Classificar” na página “Produtos de Checkout” do Carro Fácil
And selecionar a opção “Possui o produto com outra empresa”
Then uma caixa de texto “Qual empresa?” 
And o campo “Data fim do contrato” deve ser apresentado

Scenario: Validação do preenchimento do campo “Qual empresa?” do botão “Classificar”, status “Possui o produto com outra empresa”
Given estou na página “Produtos de Checkout” do Carro Fácil
When eu clicar no botão “Classificar” na página “Produtos de Checkout” do Carro Fácil
And selecionar a opção “Possui o produto com outra empresa”
And não informei o nome da empresa
And selecionei uma data fim de contrato
And cliquei no botão “Salvar”
Then o sistema deve apresentar a mensagem: “Por favor, informe a empresa”

Scenario: Seleção de “Data fim do contrato” do botão “Classificar”, status “Possui contrato com outra operadora”
Given estou na página “Produtos de Checkout” do Carro Fácil
When eu clicar no botão “Classificar” na página “Produtos de Checkout” do Carro Fácil
And selecionar a opção “Possui o produto com outra empresa”
And quero selecionar “Data fim do contrato”
Then o sistema deve apresentar um calendário

Scenario: Validação preenchimento “Data fim do contrato” do botão “Classificar”, status “Possui o produto com outra empresa”
Given estou na página “Produtos de Checkout” do Carro Fácil
When eu clicar no botão “Classificar” na página “Produtos de Checkout” do Carro Fácil
And selecionar a opção “Possui o produto com outra empresa”
And não selecionei uma “Data fim do contrato”
And selecionei uma empresa
And cliquei no botão “Salvar”
Then o sistema deve apresentar a mensagem: “Por favor, selecione uma data fim do contrato”
