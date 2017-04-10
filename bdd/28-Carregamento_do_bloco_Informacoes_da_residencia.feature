Feature: Carregamento do bloco “Informações da residência”

  Eu como corretor
  Quero acessar o bloco “Informações da residência”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Seguir do bloco “Informações de habilitação” para o bloco “Informações da residência”
Given estou na tela de Perguntas Lógicas do Carro Fácil, bloco “Informações da residência”
When eu preencher os campos
“CNH”
"Validade"
"Data da 1ª habilitação "
And clicar no botão Seguir
And não for impedido por nenhum erro de preenchimento/validação
Then o bloco “Informações de habilitação” deve fechar e o bloco “Informações da residência” deve abrir

Scenario: Carregar campos do bloco “Informações da residência”
Given estou na tela de Perguntas Lógicas do Carro Fácil
When o bloco "Informações da residência" abrir
Then os seguintes campos devem ser apresentados:
"CEP"
“Logradouro”
"Número" 
“Complemento”
“Bairro”
“Cidade”
“UF”
And botão “Seguir” deve ser apresentado
