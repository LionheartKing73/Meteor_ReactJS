Feature: Alteração de veículo

  Eu como corretor
  Quero alterar o veículo desejado pelo cliente
  Para oferecer mais opções de compra e aumentar as chances de venda

Scenario: Clique do botão “Alterar veículo”
Given estou na tela de Oferta Final do Carro Fácil
When clicar no botão “Alterar veículo”
Then deverá ser exibido um quadro com o título “Escolha um veículo” contendo todas as marcas e modelos disponíveis
And um botão “Seguir” para confirmar a troca do veículo
And um botão “Cancelar” para cancelar a troca do veículo

Scenario: Confirmação de alteração de veículo
Given estou na tela de Oferta Final do Carro Fácil
When clicar no botão “Alterar veículo”
And o quadro para escolha de novo veículo for aberto
And eu escolher a marca do novo veículo
And escolher o modelo do novo veículo
And clicar no botão “OK”
Then a tela deverá ser carregada novamente com o veículo escolhido
And a aba da esquerda deverá apresentar um veículo de valor menor ou igual ao veículo selecionado
And a aba da direita deverá apresentar um veículo de valor maior ou igual ao veículo selecionado

Scenario: Cancelamento da Alteração de veículo
Given estou na tela de Oferta Final do Carro Fácil
When clicar no botão “Alterar veículo”
And o quadro para escolha de modelo for aberto
And eu clicar no botão “Cancelar”
Then a tela de alteração de veículo deve ser fechada sem que ocorra nenhuma alteração na tela de oferta final

Scenario: Alteração de veículo sem seleção da marca
Given estou na tela de Oferta Final do Carro Fácil
When clicar no botão “Alterar veículo”
And o quadro para escolha de novo veículo for aberto
And eu não escolher a marca do novo veículo
And clicar no botão “OK”
Then deve ser exibida uma mensagem “Escolha a marca do novo veículo”

Scenario: Alteração de veículo sem seleção de modelo
Given estou na tela de Oferta Final do Carro Fácil
When clicar no botão “Alterar veículo”
And o quadro para escolha de novo veículo for aberto
And eu escolher a marca do novo veículo
And não escolher o modelo
And clicar no botão “OK”
Then deve ser exibida uma mensagem “Escolha o modelo do novo veículo”
