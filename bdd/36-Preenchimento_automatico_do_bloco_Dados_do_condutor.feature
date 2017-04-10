Feature: Preenchimento automático do bloco “Dados do condutor”

  Eu como corretor
  Quero responder o bloco “Dados do condutor”
  Para dar continuidade à venda do produto Carro Fácil

Scenario: Seleção do Checkbox “Dados do condutor são os mesmos do cliente”
Given estou na tela de Adição de Condutores do Carro Fácil, bloco “Dados do condutor”
When eu selecionar o checkbox “Dados do condutor são os mesmos do cliente”
Then todos os campos do bloco devem ser preenchidos automaticamente com os dados do cliente
