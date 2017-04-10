Feature: Responder o campo “Empresa” do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “Empresa” do bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Validação de preenchimento do campo “Empresa” com menos de 02 caracteres
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Empresa” com menos de 02 caracteres
And preencher os demais campos “Profissão”, “Telefone comercial”, “Ramal”, “CEP”, “Logradouro”, “Número”, “Complemento”, “Bairro”, “Cidade”, “UF”, “Salário bruto” e “Outras rendas” sem nenhum erro de validação 
And clicar no botão “Seguir”
Then o campo "Empresa" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro:
"A Empresa deve conter no mínimo 2 caracteres"

Scenario: Validação de preenchimento do campo “Empresa” com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Empresa” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais
