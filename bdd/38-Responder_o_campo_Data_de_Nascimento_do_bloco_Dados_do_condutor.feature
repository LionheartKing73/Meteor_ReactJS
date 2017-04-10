Feature: Responder o campo “Data de Nascimento” do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “Data de Nascimento” do bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Aplicação de máscara no campo “Data de Nascimento”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Data de Nascimento”
Then deve ser aplicada a seguinte máscara no campo: dd/mm/aaaa

Scenario: Validação de preenchimento do campo “Data de Nascimento”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “Data de Nascimento”
And preencher os demais campos “Nome completo”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH” “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Profissão”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Data de Nascimento" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "O campo Data de Nascimento é obrigatório"

Scenario: Validação de preenchimento do campo “Data de Nascimento”, com idade inferior a 25 anos
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o ano do campo “Data de Nascimento” que resulte em menos de 25 anos, dado a data atual 
And preencher os demais campos “Nome completo”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH” “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Profissão”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Data de Nascimento" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: "Data de Nascimento – É necessário que o cliente seja maior que 25 anos."

Scenario: Validação de preenchimento do campo “Data de Nascimento”, com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Data de Nascimento” com caracteres especiais (@#$%)
Then o sistema não deve aceitar o preenchimento de caracteres especiais

Scenario: Validação de preenchimento do campo “Data de Nascimento”, com letras
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Data de Nascimento” com letras
Then o sistema não deve aceitar o preenchimento de letras

Scenario: Validação de preenchimento do campo “Data de Nascimento”, com data inválida
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Data de Nascimento” com data inválida Ex: (00/30/0001)
Then o campo "Data de Nascimento" deverá ficar destacado em vermelho
And será apresentada a seguinte mensagem abaixo do campo “Data de Nascimento”: "Data de nascimento inválida."
