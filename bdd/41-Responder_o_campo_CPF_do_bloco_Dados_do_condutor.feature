Feature: Responder o campo “CPF” do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “CPF” do bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Aplicação de máscara no campo “CPF”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “CPF”
Then deve ser aplicada a seguinte máscara no campo: 000.000.000-00

Scenario: Validação de preenchimento do campo “CPF”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “CPF”
And preencher os demais campos “Nome completo”, “Data de Nascimento”, “Sexo”, “Estado Civil”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH” “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Profissão”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "CPF" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O campo CPF é obrigatório"

Scenario: Validação de preenchimento do campo “CPF” com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “CPF” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação preenchimento do campo “CPF” com letras
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “CPF” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Validação de preenchimento do campo “CPF”, com valor inválido
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “CPF” com valor inválido
Then o campo "CPF" deverá ficar destacado em vermelho
And será apresentada a seguinte mensagem abaixo do campo “CPF”: "CPF inválido."
