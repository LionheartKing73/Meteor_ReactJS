Feature: Responder o bloco “Dados do cliente”

  Eu como corretor
  Quero preencher o bloco “Dados do cliente”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Validação de preenchimento do campo “Nome completo”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu não preencher o campo “Nome completo” 
And preencher os demais campos “Data de Nascimento", "CPF", "Sexo" e "Estado Civil" sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Nome" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O campo Nome é obrigatório"

Scenario: Validação de preenchimento do campo “Nome completo” com menos de 02 caracteres
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu preencher o campo “Nome completo” com menos de 02 caracteres
And preencher os demais campos "Data de Nascimento", "CPF", "Sexo" e "Estado Civil" sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Nome" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O Nome deve conter no mínimo 2 caracteres"

Scenario: Validação de preenchimento do campo “Nome completo” com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu preencher o campo “Nome completo” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Nome completo” com números
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu preencher o campo “Nome completo” com números
Then o sistema não deve aceitar o preenchimento de números

Scenario: Aplicação de máscara no campo “Data de Nascimento”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu preencher o campo “Data de Nascimento”
Then deve ser aplicada a seguinte máscara no campo: dd/mm/aaaa

Scenario: Validação de preenchimento do campo “Data de Nascimento”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu não preencher o campo “Data de Nascimento”
And preencher os demais campos "Nome completo", "CPF", "Sexo" e "Estado Civil", sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Data de Nascimento" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O campo Data de Nascimento é obrigatório"

Scenario: Validação de preenchimento do campo “Data de Nascimento”, com idade inferior a 25 anos
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu preencher o ano do campo “Data de Nascimento” que resulte em menos de 25 anos, dado a data atual 
And preencher os demais campos "Nome completo", "CPF", "Sexo" e "Estado Civil" sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Data de Nascimento" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "Data de Nascimento – É necessário que o cliente seja maior que 25 anos."

Scenario: Validação de preenchimento do campo “Data de Nascimento”, com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu preencher o campo “Data de Nascimento” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Data de Nascimento”, com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu preencher o campo “Data de Nascimento” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Validação de preenchimento do campo “Data de Nascimento”, com data inválida
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu preencher o campo “Data de Nascimento” com data inválida Ex: (00/30/0001)
Then o campo "Data de Nascimento" deverá ficar destacado em vermelho
And será apresentada a seguinte mensagem abaixo do campo “Data de Nascimento”: "Data de nascimento inválida."

Scenario: Aplicação de máscara no campo “CPF”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu preencher o campo “CPF”
Then deve ser aplicada a seguinte máscara no campo: 000.000.000-00

Scenario: Validação de preenchimento do campo “CPF”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu não preencher o campo “CPF”
And preencher os demais campos "Nome completo", "Data de nascimento", "Sexo" e "Estado Civil” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "CPF" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O campo CPF é obrigatório"

Scenario: Validação de preenchimento do campo “CPF” com caracteres especiais
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu preencher o campo “CPF” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação preenchimento do campo “CPF” com letras
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu preencher o campo “CPF” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Validação de preenchimento do campo “CPF”, com valor inválido
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu preencher o campo “CPF” com valor inválido
Then o campo "CPF" deverá ficar destacado em vermelho
And será apresentada a seguinte mensagem abaixo do campo “CPF”: "CPF inválido."

Scenario: Seleção de opções do combo box “Sexo”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When selecionar o combo box “Sexo” no bloco “Dados do Cliente”
Then as opções que devem aparecer em lista, na seguinte ordem são: "Feminino", "Masculino"

Scenario: Validação de preenchimento do combo box “Sexo”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu não preencher o campo “Sexo” 
And preencher os demais campos "Nome completo", “Data de nascimento”, "CPF" e "Estado Civil” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Sexo" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: “O campo Sexo é obrigatório”

Scenario: Seleção de opções do combo box “Estado Civil”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When selecionar o combo box “Estado Civil” 
Then as opções que devem aparecer em lista, na seguinte ordem são:
Casado (a)
Divorciado (a)
Separado (a)
Solteiro (a)
União Estável
Viúvo (a)

Scenario: Validação de preenchimento do campo “Estado Civil”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do Cliente”
When eu não preencher o combo box “Estado Civil” 
And preencher os demais campos "Nome completo", “Data de nascimento”, "CPF" e "Sexo" sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Estado Civil" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: “O campo Estado Civil é obrigatório”

Scenario: Seguir do bloco “Dados do cliente” para o bloco “Informações de habilitação”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Dados do cliente”
When eu preencher os campos todos os campos do bloco sem nenhum erro de preenchimento/validação
And clicar no botão Seguir
Then o bloco “Dados do cliente” deve fechar e o bloco “Informações de habilitação” deve abrir
