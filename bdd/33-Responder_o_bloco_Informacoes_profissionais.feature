Feature: Responder o bloco “Informações profissionais”

  Eu como corretor
  Quero responder o bloco “Informações profissionais”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Validação de preenchimento do campo “Profissão”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu não preencher o campo “Profissão” 
And preencher os demais campos “Empresa”, “Telefone comercial”, “Ramal”, “CEP”, “Logradouro”, “Número”, “Complemento”, “Bairro”, “Cidade”, “UF”, “Salário bruto” e “Outras rendas” sem nenhum erro de validação 
And clicar no botão “Seguir”
Then o campo "Profissão" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O campo Profissão é obrigatório "

Scenario: Validação de preenchimento do campo “Profissão” com menos de 02 caracteres
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Profissão” com menos de 02 caracteres
And preencher os demais campos “Empresa”, “Telefone comercial”, “Ramal”, “CEP”, “Logradouro”, “Número”, “Complemento”, “Bairro”, “Cidade”, “UF”, “Salário bruto” e “Outras rendas” sem nenhum erro de validação 
And clicar no botão “Seguir”
Then o campo "Profissão" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "A Empresa deve conter no mínimo 2 caracteres"

Scenario: Validação de preenchimento do campo “Profissão” com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Profissão” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Profissão” com números
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Profissão” com números
Then o sistema não deve aceitar o preenchimento de números

Scenario: Validação de preenchimento do campo “Empresa” com menos de 02 caracteres
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Empresa” com menos de 02 caracteres
And preencher os demais campos “Profissão”, “Telefone comercial”, “Ramal”, “CEP”, “Logradouro”, “Número”, “Complemento”, “Bairro”, “Cidade”, “UF”, “Salário bruto” e “Outras rendas” sem nenhum erro de validação 
And clicar no botão “Seguir”
Then o campo "Empresa" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "A Empresa deve conter no mínimo 2 caracteres"

Scenario: Validação de preenchimento do campo “Empresa” com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Empresa” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Aplicação de máscara no campo “Telefone Comercial”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Telefone Comercial”
And inserir um número válido
Then deve ser aplicada a seguinte máscara no campo: (11) 1111-1111

Scenario: Validação de preenchimento do campo “Telefone Comercial”, com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Telefone Comercial” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Telefone Comercial” com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Telefone Comercial” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Validação de preenchimento do campo “Ramal”, com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Ramal” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Ramal” com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Ramal” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Aplicação de máscara no campo “CEP”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “CEP”
Then deve ser aplicada a seguinte máscara no campo: 000.000.000-00

Scenario: Preenchimento inválido do campo “CEP”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “CEP” com informações inválidas
And clicar no botão “Seguir”
Then deverá ser exibida a mensagem "CEP inválido"
And o campo CEP deve ficar destacado em vermelho

Scenario: Preenchimento correto do campo “CEP”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “CEP” com informações válidas
And sair do campo “CEP”
Then os campos "Logradouro", "Bairro", "Cidade" e "Estado" devem ser preenchidos automaticamente

Scenario: Validação de preenchimento do campo “Número”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu não preencher o campo “Número”
And preencher os demais campos “CEP”, “Logradouro”, “Complemento”, “Bairro”, “Cidade” e “UF” sem nenhum erro de validação
And clicar no botão “Seguir”
Then deverá ser exibida a mensagem "O campo Número é obrigatório"
And o campo Número deve ficar destacado em vermelho

Scenario: Validação de preenchimento do campo “Número” com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Número” com um caractere especial
Then o sistema não deve aceitar caractere especial no campo

Scenario: Validação de preenchimento do campo “Número” com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Número” com letras
Then o sistema não deve aceitar letras no campo

Scenario: Validação de preenchimento do campo “Complemento” com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Complemento” com um caractere especial
Then o sistema não deve aceitar caractere especial no campo

Scenario: Aplicação de máscara no campo “Salário Bruto”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Salário bruto”
Then deve ser aplicada a seguinte máscara no campo: R$ 000.000.000,00

Scenario: Validação de preenchimento do campo “Salário Bruto”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu não preencher o campo “Salário bruto”
And preencher os demais campos "Profissão”, “Empresa”, “Telefone Comercial”, “Ramal”, “CEP”, Logradouro", “Número”, "Complemento", "Bairro", "Cidade", “UF” e “Outras rendas”
And clicar no botão “Seguir”
Then o campo “Salário bruto” deve ficar destacado em vermelho
And deverá ser exibida a mensagem "O Salário bruto é obrigatório"

Scenario: Validação de preenchimento do campo “Salário bruto” com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Salário bruto” com letras
Then o sistema não deve aceitar letras no campo

Scenario: Validação de preenchimento do campo “Salário bruto” com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Salário bruto” com um caractere especial
Then o sistema não deve aceitar caractere especial no campo

Scenario: Aplicação de máscara no campo “Outras rendas”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Outras rendas”
Then deve ser aplicada a seguinte máscara no campo: R$ 000.000.000,00

Scenario: Validação de preenchimento do campo “Outras rendas” com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Outras rendas” com letras
Then o sistema não deve aceitar letras no campo

Scenario: Validação de preenchimento do campo “Outras rendas” com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações profissionais”
When eu preencher o campo “Salário bruto” com um caractere especial
Then o sistema não deve aceitar caractere especial no campo
