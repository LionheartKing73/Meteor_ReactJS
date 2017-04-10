Feature: Exibição do tempo de contrato disponível por veículo

  Eu como corretor
  Quero visualizar o tempo de contrato dos veículo
  Para informar ao cliente por quanto tempo ele pode permanecer com o veículo

Scenario: Exibição de contrato em veículos disponíveis para 1 e 2 anos
Given estou na tela de Seleção de Veículo do Carro Fácil
When eu escolher um veículo que pode ser contratado por 1 ou 2 anos
And avançar a tela
Then o campo “Duração do Contrato” deve vir com as opções “1 ano” e “2 anos”

Scenario: Exibição de contrato em veículos disponíveis para 1 ano
Given estou na tela de Seleção de Veículo do Carro Fácil
When eu escolher um veículo que pode ser contratado por apenas 1 ano
And avançar a tela
Then o campo “Duração do Contrato” deve vir com a opção “1 ano”

Scenario: Exibição de contrato em veículos disponíveis para 2 anos
Given estou na tela de Seleção de Veículo do Carro Fácil
When eu escolher um veículo que pode ser contratado apenas por 2 anos
And avançar a tela
Then o campo “Duração do Contrato” deve vir com a opção “2 anos”
