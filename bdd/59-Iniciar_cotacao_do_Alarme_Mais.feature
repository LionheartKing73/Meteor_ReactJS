Feature: Iniciar cotação do Alarme Mais

  Eu como corretor
  Quero iniciar a cotação do Alarme Mais
  Para realizar a venda de mais um produto

Scenario: Seguir da página “Produtos de Checkout” para a página “Cotação Alarme Mais”
Given estou na página “Produtos de Checkout” do Carro Fácil
When eu clicar no botão “Iniciar cotação” na página “Produtos de Checkout” do Carro Fácil
Then a página de “Perguntas lúdicas” do produto Alarme Mais deve ser carregada
