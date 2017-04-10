Feature: Responder o bloco “Classificar a venda”

  Eu como corretor
  Quero responder o bloco “Classificar a venda”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Validação de preenchimento do bloco “Classificar a venda” da página de Avaliação da Venda
Given estou na tela de Avaliação da Venda
When eu não preencher o bloco “Classificar a Venda” 
Then a página apresentará a seguinte mensagem de erro:
"Classificar a Venda é obrigatório"
