Feature: Carregamento da tela “Adicionar condutores”

  Eu como corretor
  Quero acessar o bloco “Informações profissionais”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Seguir da tela de “Perguntas Lógicas” para tela “Adicionar Condutores”
Given finalizei o preenchimento de todos os blocos da página de “Perguntas Lógicas” do Carro Fácil sem nenhum erro de validação
When eu clicar no botão Seguir no bloco “Informações profissionais”
Then a página “Adicionar Condutores” deve ser carregada com o bloco “Dados do condutor” aberto
