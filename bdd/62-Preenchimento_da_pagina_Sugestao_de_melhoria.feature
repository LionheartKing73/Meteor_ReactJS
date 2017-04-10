Feature: Preenchimento da página “Sugestão de melhoria”

  Eu como corretor
  Quero preencher a página “Sugestão de melhoria”
  Para informar os pontos que podem ser melhorados no sistema

Scenario: Seleção do “Assunto” da página “Sugestão de melhoria”
Given estou na tela de “Sugestões de melhoria”
When eu selecionar o combo box “Assunto”
Then as seguintes opções devem ser apresentadas:
  “Avisos e alertas”,
  “Argumentos de venda”,
  “Informações sobre produtos”,
  “Assertividade da propensão de venda”,
  “Outros”

Scenario: Validação preenchimento do campo “Sugestão” da página “Sugestão de melhoria” com menos de 30 caracteres
Given estou na tela de “Sugestões de melhoria”
When eu selecionar uma opção no combo box “Assunto”
And preencher o campo “Sugestão” com menos de 30 caracteres 
Then a seguinte mensagem deve ser apresentada em vermelho, abaixo do campo “Sugestão” e com a Quantidade mínima de caracteres: "30"

Scenario: Limitação de sugestões da página “Sugestão de melhoria”
Given estou na tela de “Sugestões de melhoria”
When eu preencher uma sugestão
And clicar no botão “Adicionar”
Then o sistema deve limitar a adição de 03 sugestões
