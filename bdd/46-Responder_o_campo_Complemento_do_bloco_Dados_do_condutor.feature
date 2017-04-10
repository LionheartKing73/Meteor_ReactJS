Feature: Responder o campo “Complemento” do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “Complemento” do bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Validação de preenchimento do campo “Complemento” com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Complemento” com um caractere especial
Then o sistema não deve aceitar caractere especial no campo

