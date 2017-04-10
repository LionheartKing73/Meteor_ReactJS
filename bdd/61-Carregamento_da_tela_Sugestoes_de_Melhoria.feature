Feature: Carregamento da tela “Sugestões de Melhoria”

  Eu como corretor
  Quero visualizar a tela “Sugestões de Melhoria”
  Para finalizar o processo de venda do produto

Scenario: Seguir da tela “Produtos de Checkout” para “Sugestões de melhoria”
Given estou na página “Produtos de Checkout” do Carro Fácil
When eu clicar no botão “Classificar” e preencher todos os campos sem nenhum erro de validação
And clicar no botão “Salvar”
Then a página “Sugestões de melhoria” deve ser carregada 

Scenario: Carregar informações da página “Sugestões de melhoria”
Given estou na tela de “Sugestões de melhoria”
When a página carregar
Then deve ser apresentados os seguintes campos:
  “Assunto”
  “Sugestão”
