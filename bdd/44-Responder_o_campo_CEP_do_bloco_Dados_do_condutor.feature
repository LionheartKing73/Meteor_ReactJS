Feature: Responder o campo “CEP” do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “CEP” do bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Aplicação de máscara no campo “CEP”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “CEP”
Then deve ser aplicada a seguinte máscara no campo: 000.000.000-00

Scenario: Validação de preenchimento do campo “CEP”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “CEP”
And preencher os demais campos “Nome completo”, “Data de nascimento”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH”, “Validade da CNH”, “Data da 1ª habilitação”, “Logradouro”, “Número”, Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Profissão”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo “CEP” deve ficar destacado em vermelho
And deverá ser exibida a mensagem "O CEP é obrigatório"

Scenario: Preenchimento inválido do campo “CEP”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “CEP” com informações inválidas
And clicar no botão “Seguir”
Then deverá ser exibida a mensagem "CEP inválido"
And o campo CEP deve ficar destacado em vermelho

Scenario: Preenchimento correto do campo “CEP”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “CEP” com informações válidas
And sair do campo “CEP”
Then os campos "Logradouro", "Bairro", "Cidade" e "Estado" devem ser preenchidos automaticamente
