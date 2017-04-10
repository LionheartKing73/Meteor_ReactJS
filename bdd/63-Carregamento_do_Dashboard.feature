Feature: Carregamento do Dashboard

  Eu como corretor
  Quero voltar para o dashboard
  Para buscar novos clientes e iniciar um novo processo de venda

Scenario: Seguir da tela “Sugestão de melhoria” para “Dashboard”
Given estou na página “Sugestão de melhoria”
When eu clicar no botão “Finalizar” 
Then a página “Dashboard” deve ser carregada
