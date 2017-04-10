Feature: Responder o campo “Sexo” do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “Sexo” do bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Seleção de opções do combo box “Sexo”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And selecionar o combo box “Sexo” no bloco “Dados do Cliente”
Then as opções que devem aparecer em lista, na seguinte ordem são: Feminino, Masculino

Scenario: Validação de preenchimento do combo box “Sexo”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o campo “Sexo” 
And preencher os demais campos “Nome completo”, “Data de Nascimento”, “Estado Civil”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH” “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Profissão”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Sexo" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: “O campo Sexo é obrigatório”
