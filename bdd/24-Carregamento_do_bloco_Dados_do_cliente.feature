Feature: Carregamento do bloco “Dados do cliente”

  Eu como corretor
  Quero acessar que o bloco “Dados do cliente” seja carregado”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Carregar campos do bloco “Dados do cliente”
Given estou na tela de Perguntas Lógicas do Carro Fácil
When o bloco "Dados do cliente" abrir
Then os seguintes campos devem ser apresentados:
"“Nome completo”
“Data de Nascimento”
“CPF”
“Sexo”
“Estado Civil”
And botão “Seguir” deve ser apresentado
