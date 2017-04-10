Feature: Responder o campo “E-mail” do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “E-mail” do bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Validação de preenchimento do campo “E-mail”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “E-mail”
And preencher os demais campos “Nome completo”, “Data de nascimento”, “Sexo” “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH”, “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, “Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo “E-mail” deve ficar destacado em vermelho
And deverá ser exibida a mensagem "O campo E-mail é obrigatório"
