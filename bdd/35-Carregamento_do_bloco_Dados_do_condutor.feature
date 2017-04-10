Feature: Carregamento do bloco “Dados do condutor”

  Eu como corretor
  Quero acessar o bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Carregar campos do bloco “Dados do Condutor” da página de Adição de Condutores
Given estou na tela de Adição de Condutores do Carro Fácil
When o bloco “Dados do Condutor” carregar
Then deve ser apresentados os seguintes campos
Checkbox: “Os dados do condutor são os mesmos do cliente”
“Nome completo”
“Data de nascimento”
“Sexo”
“Estado Civil”
“CPF”
“RG”
“Data de emissão do RG”
“Órgão Emissor”
“CNH”
“Validade da CNH”
“Data da 1ª habilitação”
“CEP”
“Logradouro”
“Número”
“Complemento”
“Bairro”
“Cidade”
“UF”
“Empresa”
“Profissão”
“Telefone Comercial”
“Ramal”
“Telefone Residencial”
“Telefone Celular”
“E-mail”
And o botão “Seguir” deve ser apresentado
