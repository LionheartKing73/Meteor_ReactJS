Feature: 01 - Carregamento da tela de perguntas lúdicas

  Eu como corretor
  Quero acessar o questionário lúdico do Carro Fácil
  Para iniciar a venda do produto Carro Fácil

  Background:
    Given estou na tela de perfil resumido do cliente que tenha a propensao de comprar o Carro Fácil
    When eu clicar no botão "Iniciar Cotação"

  @watch
  Scenario: Carregamento das perguntas da tela de questionário lúdico
    Then será exibida a tela para preenchimento do questionário lúdico do cliente com as seguintes perguntas na tela: "Você tem veículo ?"

  @watch
  Scenario: Carregamento das argumentações inicias da tela de questionário lúdico
    Then será exibida a tela para preenchimento do questionário lúdico do cliente com as seguintes argumentações na tela: "Porto Seguro Carro Fácil é um carro por assinatura | Carro novo todo ano | Carro particular desvaloriza e dá muito mais trabalho para vender | IPVA, documentação, seguro e custos de manutenção, a Porto cuida para você! | Carro Reserva por tempo indeterminado | Fazemos a manutenção preventiva para você. Buscamos e levamos o carro na sua casa | Benefícios e Assistência 24h Porto Seguro para o veículo | Serviços para a casa (chaveiro, encanador, eletricista) | Descontos em estacionamentos conveniados | Motorista da vez | Helpdesk para o computador | Cuidado para o PET (Cachorro e Gato)"
