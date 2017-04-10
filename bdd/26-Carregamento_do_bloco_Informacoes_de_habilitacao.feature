Feature: Carregamento do bloco “Informações de habilitação”

  Eu como corretor
  Quero acessar que o bloco “Informações de habilitação”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Carregar campos do bloco “Informações de habilitação”
Given estou na tela de Perguntas Lógicas do Carro Fácil
When o bloco "Informações de habilitação" abrir
Then os seguintes campos devem ser apresentados:
"CNH"
“Validade da CNH”
"Data da 1ª habilitação " 
And botão “Seguir” deve ser apresentado
