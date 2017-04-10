Feature: Responder o campo “Número” do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “Número” do bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Validação de preenchimento do campo “Número”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “Número”
And preencher os demais campos “Nome completo”, “Data de nascimento”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH”, “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Profissão”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then deverá ser exibida a mensagem "O campo Número é obrigatório"
And o campo Número deve ficar destacado em vermelho

Scenario: Validação de preenchimento do campo “Número” com caracteres especiais
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Número” com um caractere especial
Then o sistema não deve aceitar caractere especial no campo

Scenario: Validação de preenchimento do campo “Número” com letras
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu preencher o campo “Número” com letras
Then o sistema não deve aceitar letras no campo
