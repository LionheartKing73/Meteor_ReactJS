Feature: Responder o campo “Nome completo” do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “Nome completo” bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Validação de preenchimento do campo “Nome Completo”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “Nome completo”
And preencher os demais campos “Data de Nascimento”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH” “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Profissão”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação 
And clicar no botão “Seguir”
Then o campo "Nome completo" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O campo Nome completo é obrigatório"

Scenario: Validação de preenchimento do campo “Nome Completo” com menos de 02 caracteres
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Nome completo” com menos de 02 caracteres
And preencher os demais campos “Data de Nascimento”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH” “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Profissão”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação 
And clicar no botão “Seguir”
Then o campo "Nome completo" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O Nome Completo deve conter no mínimo 2 caracteres"

Scenario: Validação de preenchimento do campo “Nome completo” com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Nome completo” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Nome completo” com números
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Nome completo” com números
Then o sistema não deve aceitar o preenchimento de números
