Feature: Responder o bloco “Informações da residência”

  Eu como corretor
  Quero responder o bloco “Informações da residência”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Aplicação de máscara no campo “CEP”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações da residência”
When eu preencher o campo “CEP”
Then deve ser aplicada a seguinte máscara no campo: 000.000.000-00

Scenario: Validação de preenchimento do campo “CEP”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações da residência”
When eu não preencher o campo “CEP”
And preencher os demais campos "Logradouro", “Número”, "Complemento", "Bairro", "Cidade" e “UF”
And clicar no botão “Seguir”
Then o campo “CEP” deve ficar destacado em vermelho
And deverá ser exibida a mensagem "O CEP é obrigatório"

Scenario: Preenchimento inválido do campo “CEP”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações da residência”
When eu preencher o campo “CEP” com informações inválidas
And clicar no botão “Seguir”
Then deverá ser exibida a mensagem "CEP inválido"
And o campo CEP deve ficar destacado em vermelho

Scenario: Preenchimento correto do campo “CEP”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações da residência”
When eu preencher o campo “CEP” com informações válidas
And sair do campo “CEP”
Then os campos "Logradouro", "Bairro", "Cidade" e "Estado" devem ser preenchidos automaticamente

Scenario: Validação de preenchimento do campo “Número”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações da residência”
When eu não preencher o campo “Número”
And preencher os demais campos “CEP”, “Logradouro”, “Complemento”, “Bairro”, “Cidade” e “UF” sem nenhum erro de validação
And clicar no botão “Seguir”
Then deverá ser exibida a mensagem "O campo Número é obrigatório"
And o campo Número deve ficar destacado em vermelho

Scenario: Validação de preenchimento do campo “Número” com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações da residência”
When eu preencher o campo “Número” com um caractere especial
Then o sistema não deve aceitar caractere especial no campo

Scenario: Validação de preenchimento do campo “Número” com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações da residência”
When eu preencher o campo “Número” com letras
Then o sistema não deve aceitar letras no campo

Scenario: Validação de preenchimento do campo “Complemento” com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações da residência”
When eu preencher o campo “Complemento” com um caractere especial
Then o sistema não deve aceitar caractere especial no campo
