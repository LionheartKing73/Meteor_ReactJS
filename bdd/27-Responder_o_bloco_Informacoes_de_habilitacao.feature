Feature: Responder o bloco “Informações de habilitação”

  Eu como corretor
  Quero acessar que o bloco “Informações de habilitação”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Validação de preenchimento do campo CNH
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When não preencher o campo “CNH” 
And preencher os demais campos "Validade da CNH” e “Data da 1º habilitação”
And clicar no botão “Seguir”
Then o campo "CNH" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O campo CNH é obrigatório"

Scenario: Validação de preenchimento do campo “CNH” com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “CNH” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação preenchimento do campo “CPF” com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “CNH” com letras 
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Validação de preenchimento do campo “CNH”, com valor inválido
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “CNH” com valor inválido
Then o campo "CNH" deverá ficar destacado em vermelho
And será apresentada a seguinte mensagem abaixo do campo “CNH”: "CNH inválida."

Scenario: Aplicação de máscara no campo “Validade da CNH”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “Validade da CNH”
Then deve ser aplicada a seguinte máscara no campo: dd/mm/aaaa

Scenario: Validação de preenchimento do campo “Validade da CNH”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When não preencher o campo “Validade da CNH” 
And preencher os demais campos "CNH” e “Data da 1º habilitação”
And clicar no botão “Seguir”
Then o campo "Validade da CNH" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O campo Validade da CNH é obrigatório"

Scenario: Validação de preenchimento do campo “Validade da CNH” com data vencida
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “Validade da CNH” com uma data inferior a data atual do preenchimento
And preencher os demais campos "CNH” e “Data da 1º habilitação”
And clicar no botão “Seguir”
Then o campo "Validade da CNH" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "CNH vencida"

Scenario: Validação de preenchimento do campo “Validade da CNH”, com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “Validade da CNH” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Validade da CNH”, com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “Validade da CNH” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Validação de preenchimento do campo “Validade da CNH”, com data inválida
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “Validade da CNH” com data inválida Ex: (00/30/0001)
Then o campo "Validade da CNH" deverá ficar destacado em vermelho
And será apresentada a seguinte mensagem abaixo do campo “Validade da CNH”: "Data inválida."

Scenario: Aplicação de máscara no campo “Data da 1ª habilitação”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “Data da 1ª habilitação”
Then deve ser aplicada a seguinte máscara no campo: dd/mm/aaaa

Scenario: Validação de preenchimento do campo “Data da 1ª habilitação”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When não preencher o campo “Data da 1ª habilitação” 
And preencher os demais campos "CNH” e “Validade da CNH”
And clicar no botão “Seguir”
Then o campo "Data da 1ª habilitação" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "A Data da 1ª habilitação é obrigatória"

Scenario: Validação de preenchimento do campo “Data da 1ª habilitação”, com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “Data da 1ª habilitação” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Data da 1ª habilitação”, com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “Data da 1ª habilitação” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Validação de preenchimento do campo “Data da 1ª habilitação”, com data inválida
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “Data da 1ª habilitação” com data inválida Ex: (00/30/0001)
Then o campo "Data da 1ª habilitação" deverá ficar destacado em vermelho
And será apresentada a seguinte mensagem abaixo do campo “Data da 1ª habilitação”: "Data inválida."

Scenario: Validação de preenchimento do campo “Data da 1ª habilitação”, com data inferior a 2 anos de habilitação
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações de habilitação”
When eu preencher o campo “Data da 1ª habilitação” com data inferior a 02 anos dado a data atual
Then o campo "Data da 1ª habilitação" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "A Data da 1ª habilitação deve ser superior a 2 anos"