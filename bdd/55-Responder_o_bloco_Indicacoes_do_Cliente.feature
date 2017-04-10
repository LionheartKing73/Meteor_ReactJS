Feature: Responder o bloco “Indicações do Cliente”

  Eu como corretor
  Quero responder o bloco “Indicações do Cliente”
  Para finalizar o fluxo do produto Carro Fácil

Scenario: Validação de preenchimento do campo “Nome”
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu não preencher o campo “Nome” 
And preencher os demais campos "Telefone”, “Profissão", "Estado Civil", 
"Tem filhos?", "Possui veículos?”, “Time de futebol”, “Cidade”, “UF”, “Bairro”, “Anotações” e “Data de agendamento” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Nome" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro:
"O campo Nome é obrigatório"

Scenario: Validação de preenchimento do campo “Nome” com menos de 02 caracteres
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Nome” com menos de 02 caracteres
And preencher os demais campos "Telefone”, “Profissão", "Estado Civil", 
"Tem filhos?", "Possui veículos?”, “Time de futebol”, “Cidade”, “UF”, “Bairro”, “Anotações” e “Data de agendamento” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Nome" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro:
"O Nome deve conter no mínimo 2 caracteres"

Scenario: Validação de preenchimento do campo “Nome” com caracteres especiais
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Nome” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais
Scenario: Validação de preenchimento do campo “Nome” com números
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Nome” com números
Then o sistema não deve aceitar o preenchimento de números

Scenario: Aplicação de máscara no campo “Telefone”
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Telefone”
Then deve ser aplicada a seguinte máscara no campo: (11) 1111-1111

Scenario: Validação campo “Telefone”
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu não preencher o campo “Telefone”
And preencher os demais campos "Telefone”, “Profissão", "Estado Civil", "Tem filhos?", "Possui veículos?”, “Time de futebol”, “Cidade”, “UF”, “Bairro”, “Anotações” e “Data de agendamento” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo “Telefone” deve ficar destacado em vermelho
And deverá ser exibida a mensagem "O campo Telefone é obrigatório"

Scenario: Validação de preenchimento do campo “Telefone”, com caracteres especiais
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Telefone” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Telefone Fixo” com letras
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Telefone” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Validação de preenchimento do campo “Profissão” com menos de 04 caracteres
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Profissão” com menos de 04 caracteres
And preencher os demais campos "Nome”, “Telefone”, "Estado Civil", "Tem filhos?", "Possui veículos?”, “Time de futebol”, “Cidade”, “UF”, “Bairro”, “Anotações” e “Data de agendamento” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Profissão" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro:
"A Profissão deve conter no mínimo 4 caracteres"

Scenario: Validação de preenchimento do campo “Profissão” com caracteres especiais
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Profissão” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Profissão” com números
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Profissão” com números
Then o sistema não deve aceitar o preenchimento de números

Scenario: Seleção de opções do combo box “Estado Civil”
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When selecionar o combo box “Estado Civil”
Then as opções que devem aparecer em lista, na seguinte ordem são:
Casado (a)
Divorciado (a)
Separado (a)
Solteiro (a)
União Estável
Viúvo (a)

Scenario: Seleção de opções do radio button “Tem filhos?”
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When selecionar a opção “Sim” no radio button para a pergunta “Tem filhos?”
Then Um combo box deve aparecer com as seguintes opções:
1
2
3
4 ou mais

Scenario: Validação preenchimento quantidade de filhos para a pergunta “Tem filhos?”
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When selecionar a opção “Sim” no radio button para a pergunta “Tem filhos?”
And não selecionar nenhuma opção do combo box “Quantidade”
And preencher os demais campos "Nome”, “Telefone”, "Profissão” Estado Civil", "Possui veículos?”, “Time de futebol”, “Cidade”, “UF”, “Bairro”, “Anotações” e “Data de agendamento” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Quantidade" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro:
"Selecione a quantidade de filhos"

Scenario: Seleção de opções do radio button “Possui veículos?”
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When selecionar a opção “Sim” no radio button para a pergunta “Possui veículos?”
Then Um combo box deve aparecer com as seguintes opções:
1
2
3
4 ou mais

Scenario: Validação preenchimento quantidade de veículos para a pergunta “Possui veículos?”
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When selecionar a opção “Sim” no radio button para a pergunta “Possui veículos?”
And não selecionar nenhuma opção do combo box “Quantidade”
And preencher os demais campos "Nome”, “Telefone”, "Profissão” Estado Civil", "Tem filhos?”, “Time de futebol”, “Cidade”, “UF”, “Bairro”, “Anotações” e “Data de agendamento” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Quantidade" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro:
"Selecione a quantidade de veículos"

Scenario: Seleção de opções do combo box “Time de futebol”
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When selecionar o combo box “Time de futebol”
Then devem aparecer as seguintes opções:
ABC
América Mineiro
ASA - AL
Atlético GO
Atlético MG
Atlético PR
Avaí
Bahia
Boa Esporte
Botafogo
Botafogo-PB
Botafogo-SP
Bragantino
Brasil de Pelotas
Ceará
Chapecoense
Confiança - SE
Corinthians
Coritiba
CRB
Criciúma
Cruzeiro
CSA - AL
Cuiabá
Figueirense
Flamengo
Fluminense
Fortaleza
Goiás
Grêmio
Guarani
Internacional
Joinville
Juventude
Londrina
Luverdense
Macaé
Mogi Mirim
Moto Club
Náutico
Oeste
Palmeiras
Paraná
Paysandu
Ponte Preta
Remo
Salgueiro
Sampaio Corrêa
Santa Cruz
Santos
São Bento
São Paulo
Sport
Tombense
Tupi
Vasco da Gama
Vila Nova
Vitória
Volta Redonda
Ypiranga de Erechim

Scenario: Validação de preenchimento do campo “Cidade” com menos de 02 caracteres
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Cidade” com menos de 02 caracteres
And preencher os demais campos "Nome”, “Telefone”, "Profissão” Estado Civil", "Tem filhos?”, “Possui Veículos”, “Time de futebol”, “UF”, “Bairro”, “Anotações” e “Data de agendamento” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Cidade" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro:
"A Cidade deve conter no mínimo 2 caracteres"

Scenario: Validação de preenchimento do campo “Cidade” com caracteres especiais
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Cidade” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Cidade” com números
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Cidade” com números
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Seleção de opções do combo box “UF”
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When selecionar o combo box “UF”
Then devem aparecer as seguintes opções:
AL
AP
AM
BA
CE
DF
ES
GO
MA
MT
MS
MG
PA
PB
PR
PE
PI
RJ
RN
RS
RO
RR
SC
SP
SE
TO

Scenario: Validação de preenchimento do campo “Bairro” com menos de 02 caracteres
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Bairro” com menos de 02 caracteres
And preencher os demais campos "Nome”, “Telefone”, "Profissão” Estado Civil", "Tem filhos?”, “Possui Veículos”, “Time de futebol”, “UF”, “Anotações” e “Data de agendamento” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Bairro" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro:
"O Bairro deve conter no mínimo 2 caracteres"

Scenario: Validação de preenchimento do campo “Bairro” com caracteres especiais
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Bairro” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Bairro” com números
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When eu preencher o campo “Cidade” com números
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Seleção da “Data de Agendamento”
Given estou na tela de Avaliação da Venda, bloco “Indicações do Cliente”
When selecionar o campo “Data de agendamento” 
Then o sistema deverá abrir um calendário
And deve preencher o campo “Data de agendamento” com a data selecionada no calendário
