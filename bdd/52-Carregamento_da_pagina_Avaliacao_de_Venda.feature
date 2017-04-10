Feature: Carregamento da página “Avaliação de Venda”

  Eu como corretor
  Quero acessar a página “Avaliação de Venda”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Seguir da página “Adição de Condutores” para a página “Avaliação de Venda”
Given preenchi todos os blocos e seus respectivos campos da página “Adição de Condutores” do Carro Fácil sem nenhum erro de validação
When eu clicar no botão “Seguir” no bloco “Dados do condutor”
Then a página “Avaliação de Venda” deve ser carregada com o bloco “Classificar a Venda” aberto 
And os blocos “Adicionar Indicações” e o botão “Vamos em frente?”
And as argumentações do produto devem ser apresentadas do lado direito da tela

Scenario: Carregar informações do bloco “Classificar a venda” da página de Avaliação da Venda
Given estou na tela de Avaliação da Venda
When o bloco “Classificar a Venda” carregar
Then deve ser apresentados o seguinte texto:
“Considerando os argumentos apresentados, as informações sobre o produto e assertividade da propensão de compra do cliente, como você classifica o processo de venda desse produto?”
And cinco estrelas devem ser apresentadas
