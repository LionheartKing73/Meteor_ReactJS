Feature: Responder o campo “Profissão” do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “Profissão” do bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Validação de preenchimento do campo “Profissão”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “Profissão” 
And preencher os demais campos “Nome completo”, “Data de nascimento”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH”, “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, “Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Profissão" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro:
"O campo Profissão é obrigatório "

Scenario: Validação de preenchimento do campo “Profissão” com menos de 02 caracteres
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Profissão” com menos de 02 caracteres
And preencher os demais campos “Nome completo”, “Data de nascimento”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH”, “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, “Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Profissão" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro:
"A Empresa deve conter no mínimo 2 caracteres"

Scenario: Validação de preenchimento do campo “Profissão” com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Profissão” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Profissão” com números
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Profissão” com números
Then o sistema não deve aceitar o preenchimento de números
