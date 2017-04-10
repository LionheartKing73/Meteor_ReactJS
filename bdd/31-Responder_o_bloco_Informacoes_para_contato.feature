Feature: Responder o bloco “Informações para contato”

  Eu como corretor
  Quero preencher o bloco “Informações para contato”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Aplicação de máscara no campo “Telefone Residencial”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações para contato”
When eu preencher o campo “Telefone Residencial”
Then deve ser aplicada a seguinte máscara no campo: (11) 1111-1111

Scenario: Validação campo “Telefone Residencial”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações para contato”
When eu não preencher o campo “Telefone Residencial”
And preencher os demais campos "Telefone Celular" e “E-mail”
And clicar no botão “Seguir”
Then o campo “Telefone Residencial” deve ficar destacado em vermelho
And deverá ser exibida a mensagem "O campo Telefone Residencial é obrigatório"

Scenario: Validação de preenchimento do campo “Telefone Residencial”, com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações para contato!
When eu preencher o campo “Telefone Residencial” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Telefone Residencial” com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações para contato”
When eu preencher o campo “Telefone Residencial” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Aplicação de máscara no campo “Telefone Celular”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações para contato”
When eu preencher o campo “Telefone Celular”
Then deve ser aplicada a seguinte máscara no campo: (11) 11111-1111

Scenario: Validação campo “Telefone Celular”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações para contato”
When eu não preencher o campo “Telefone Celular”
And preencher os demais campos "Telefone Residencial" e “E-mail”
And clicar no botão “Seguir”
Then o campo “Telefone Celular” deve ficar destacado em vermelho
And deverá ser exibida a mensagem "O campo Telefone Celular é obrigatório"

Scenario: Validação de preenchimento do campo “Telefone Celular”, com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações para contato”
When eu preencher o campo “Telefone Celular” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Telefone Celular” com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações para contato”
When eu preencher o campo “Telefone Celular” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Validação de preenchimento do campo “E-mail”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações para contato”
When eu não preencher o campo “E-mail”
And preencher os demais campos "Telefone Residencial" e “Telefone Celular” sem nenhum erro de validação 
And clicar no botão “Seguir”
Then o campo “E-mail” deve ficar destacado em vermelho
And deverá ser exibida a mensagem "O campo E-mail é obrigatório"
