Feature: Responder o campo “Estado Civil” do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o campo “Estado Civil” do bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Seleção de opções do combo box “Estado Civil”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And selecionar o combo box “Estado Civil” 
Then as opções que devem aparecer em lista, na seguinte ordem são:
Casado (a)
Divorciado (a)
Separado (a)
Solteiro (a)
União Estável
Viúvo (a)

Scenario: Validação de preenchimento do campo “Estado Civil”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu não selecionar o checkbox “Dados do condutor são os mesmos do cliente”
And eu não preencher o combo box “Estado Civil” 
And preencher os demais campos “Nome completo”, “Data de Nascimento”, “Sexo”, “CPF”, “RG”, “Data de emissão do RG”, “Órgão emissor”, “CNH” “Validade da CNH”, “Data da 1ª habilitação”, “CEP”, “Logradouro”, “Número”, Complemento”, “Bairro”, “Cidade”, “UF”, “Empresa”, “Profissão”, “Telefone Comercial”, “Ramal”, “Telefone Residencial”, “Telefone Celular” e “E-mail” sem nenhum erro de validação
And clicar no botão “Seguir”
Then o campo "Estado Civil" deverá ficar destacado em vermelho
And a página apresentará a seguinte mensagem de erro: “O campo Estado Civil é obrigatório”
