Feature: Carregamento da tela “Oferta Final”

  Eu como corretor
  Quero acessar a tela de Oferta Final
  Para visualizar o preço do serviço e realizar a venda do produto Carro Fácil

Scenario: Preenchimento correto do bloco “Veículo desejado”
Given estou na tela de seleção de veículo do Carro Fácil
When eu preencher corretamente os campos presentes na tela
And clicar no botão “Seguir”
Then deverá ser carregada a tela de “Oferta Final” com os seguintes elementos:
Régua de ofertas com três opções de veículo, divididas em 3 abas:
Aba da esquerda: veículo mais barato que o veículo selecionado pelo cliente
Aba central: veículo selecionado pelo cliente
Aba da direita: veículo mais caro que o veículo selecionado pelo cliente
Em cada uma das abas deverá conter:
Do lado esquerdo
Canto superior esquerdo: Número da cotação
Canto superior direito: Botão “Alterar veículo” e botão “Ofertas do mês”
No centro: imagem do veículo e, ao lado, nome do modelo e valor da franquia
Em baixo: informações sobre
Motor
Potência
Câmbio
Combustível
Consumo (KM / Litro)
Direção
Botão “Ver mais itens de série”
Do lado direito
Na parte de cima:
Texto “Duração do contrato” e, abaixo do texto, as opções de escolha “1 ano” e “2 anos”
Combo box “Quantidade de parcelas” para a seleção da quantidade de parcelas em que o pagamento será realizado

No centro:
Combo box “KM Adicional” para seleção da quilometragem adicional desejada
Ícone para seleção de pagamento com Cartão Porto Seguro e, abaixo, o texto “Desconto na 1° parcela, Limitado a R$ 150,00”

Na parte de baixo:
Valor das parcelas a serem pagas
Botão “Vamos em frente?”
