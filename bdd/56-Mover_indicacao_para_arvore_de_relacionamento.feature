Feature: Mover indicação para árvore de relacionamento

  Eu como corretor
  Quero visualizar minhas indicações na árvore de relacionamento
  Para poder classifica-las nos meus círculos de contatos

Scenario: Criar cliente indicado na árvore de relacionamento
Given estou na tela de Avaliação de Venda, bloco “Indicações do Cliente”
When eu preencher os campos “Nome” e “Telefone” 
Then a pessoa indicada deve aparecer com na tela “Árvore de relacionamento” como um contato não classificado, relacionado ao cliente que o indicou
