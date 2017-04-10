Feature: Carregamento do bloco “Adicionar Indicações”

  Eu como corretor
  Quero visualizar o bloco “Adicionar Indicações”
  Para finalizar o produto Carro Fácil

Scenario: Carregar informações do bloco “Adicionar Indicações” da página de Avaliação da Venda
Given estou na tela de Avaliação da Venda
When eu clicar no bloco “Adicionar Indicações” 
Then o bloco “Indicações do Cliente” deve ser abrir com os seguintes campos:
“Nome”
“Telefone”
“Profissão”
“Estado Civil”
“Tem filhos?”
“Possui veículos?”
“Time de Futebol”
“Cidade”
“UF”
“Bairro”
“Anotações”
“Data de Agendamento”
And o botão “Seguir” deve ser apresentado
