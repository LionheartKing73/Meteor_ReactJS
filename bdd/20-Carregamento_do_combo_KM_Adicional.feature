Feature: Carregamento do combo “KM Adicional”

  Eu como corretor
  Quero visualizar as opções do combo de quilometragem adicional
  Para oferecer mais pacotes de quilometragem para o cliente

Scenario: Carregamento das opções do combo “KM Adicional” para contrato de 1 ano e pagamento à vista
Given estou na tela de Oferta Final do Carro Fácil
When eu selecionar “1 ano” para a opção tempo do contrato
And selecionar “À vista” para o campo “Quantidade de Parcelas”
Then o combo “KM Adicional” deve ser carregado com as seguintes informações:
+ 10.000 (R$ 9.999,00)
+ 20.000 (R$ 9.999,00)
+ 30.000 (R$ 9.999,00)

Scenario: Carregamento das opções do combo “KM Adicional” para contrato de 2 anos e pagamento à vista
Given estou na tela de Oferta Final do Carro Fácil
When eu selecionar “2 anos” para a opção tempo do contrato
And selecionar “À vista” para o campo “Quantidade de Parcelas”
Then o combo “KM Adicional” deve ser carregado com as seguintes informações:
+ 10.000 (R$ 9.999,00)
+ 20.000 (R$ 9.999,00)
+ 30.000 (R$ 9.999,00)

Scenario: Carregamento das opções do combo “KM Adicional” para contrato de 1 ano e pagamento em 12 vezes
Given estou na tela de Oferta Final do Carro Fácil
When eu selecionar “1 ano” para a opção tempo do contrato
And selecionar “12 vezes” para o campo “Quantidade de Parcelas”
Then o combo “KM Adicional” deve ser carregado com as seguintes informações:
+ 10.000 (R$ 9.999,00 na parcela)
+ 20.000 (R$ 9.999,00 na parcela)
+ 30.000 (R$ 9.999,00 na parcela)

Scenario: Carregamento das opções do combo “KM Adicional” para contrato de 2 anos e pagamento em 24 vezes
Given estou na tela de Oferta Final do Carro Fácil
When eu selecionar “2 anos” para a opção tempo do contrato
And selecionar “24 vezes” para o campo “Quantidade de Parcelas”
Then o combo “KM Adicional” deve ser carregado com as seguintes informações:
+ 10.000 (R$ 9.999,00 na parcela)
+ 20.000 (R$ 9.999,00 na parcela)
+ 30.000 (R$ 9.999,00 na parcela)
