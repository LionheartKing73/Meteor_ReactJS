Feature: Carregamento do bloco “Informações para contato”

  Eu como corretor
  Quero acessar o bloco “Informações para contato”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Seguir do bloco “Informações da residência” para o bloco” Informações para contato”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações da residência”
When eu preencher todos os campos sem nenhum erro de validação
And clicar no botão “Seguir”
Then o bloco "Informações da residência" deve fechar e o bloco “Informações para contato” deve abrir

Scenario: Carregamento dos campos do bloco “Informações para contato”
Given estou no bloco "Informações para contato" na tela de perguntas lógicas do Carro Fácil
When o bloco carregar
Then os seguintes campos devem ser exibidos:
“Telefone Residencial”
“Telefone Celular”
“E-mail”
And o botão “Seguir” deve ser apresentado
