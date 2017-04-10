Feature: Responder os campos de Telefone do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “CNH” do bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Aplicação de máscara no campo “Telefone Comercial”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Telefone Comercial”
And inserir um número válido
Then deve ser aplicada a seguinte máscara no campo: (11) 1111-1111

Scenario: Validação de preenchimento do campo “Telefone Comercial”, com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Telefone Comercial” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Telefone Comercial” com letras
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Telefone Comercial” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Validação de preenchimento do campo “Ramal”, com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Ramal” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Ramal” com letras
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Ramal” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Aplicação de máscara no campo “Telefone Residencial”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Telefone Residencial”
Then deve ser aplicada a seguinte máscara no campo: (11) 1111-1111

Scenario: Validação campo “Telefone Residencial”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “Telefone Residencial”
And preencher os demais campos “Nome completo”, “Data de nascimento”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH”, “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, “Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Telefone Comercial”, “Ramal”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo “Telefone Residencial” deve ficar destacado em vermelho
And deverá ser exibida a mensagem "O campo Telefone Residencial é obrigatório"

Scenario: Validação de preenchimento do campo “Telefone Residencial”, com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Telefone Residencial” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Telefone Residencial” com letras
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Telefone Residencial” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Aplicação de máscara no campo “Telefone Celular”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Telefone Celular”
Then deve ser aplicada a seguinte máscara no campo: (11) 11111-1111

Scenario: Validação campo “Telefone Celular”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “Telefone Celular”
And preencher os demais campos “Nome completo”, “Data de nascimento”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH”, “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, “Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Telefone Comercial”, “Ramal”, “Telefone Residencial” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo “Telefone Celular” deve ficar destacado em vermelho
And deverá ser exibida a mensagem "O campo Telefone Celular é obrigatório"

Scenario: Validação de preenchimento do campo “Telefone Celular”, com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Telefone Celular” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Telefone Celular” com letras
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor 
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Telefone Celular” com letras
Then o sistema não deve aceitar o preenchimento de letras
