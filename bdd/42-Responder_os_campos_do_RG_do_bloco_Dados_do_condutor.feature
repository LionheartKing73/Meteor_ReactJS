Feature: Responder os campos do RG do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “RG” do bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Validação de preenchimento do campo “RG”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “RG”
And preencher os demais campos “Nome completo”, “Data de Nascimento”, “Sexo”, “Estado Civil”, “CPF”, “Data de emissão do RG”, “Órgão emissor”, “CNH” “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Profissão”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "RG" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O campo RG é obrigatório"

Scenario: Validação de preenchimento do campo “RG” com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “RG” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Data de Emissão do RG”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “Data de emissão do RG”
And preencher os demais campos “Nome completo”, “Data de nascimento”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Órgão emissor”, “CNH” “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Profissão”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Data de emissão do RG" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O campo Data de emissão do RG é obrigatório"

Scenario: Validação de preenchimento do campo “Data de emissão do RG”, com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Data de emissão do RG” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Data de emissão do RG”, com letras
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Data de emissão do RG” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Validação de preenchimento do campo “Data de emissão do RG”, com data inválida
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Data de emissão do RG” com data inválida Ex: (00/30/0001)
Then o campo "Data de emissão do RG" deverá ficar destacado em vermelho
And será apresentada a seguinte mensagem abaixo do campo “Data de Nascimento”: "Data de nascimento inválida."

Scenario: Validação de preenchimento do campo “Órgão Emissor”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “Órgão Emissor”
And preencher os demais campos “Nome completo”, “Data de nascimento”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “CNH” “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Profissão”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
Then o campo "Órgão emissor" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O campo Órgão Emissor é obrigatório"