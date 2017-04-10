Feature: Carregamento da tela “Produtos de Checkout”

  Eu como corretor
  Quero visualizar a tela de “Produtos de Checkout”
  Para iniciar o fluxo de venda de outro produto

Scenario: Carregar informações da página “Produtos de Checkout”
Given estou na tela de “Produtos de Checkout” do Carro Fácil
When a página carregar
Then deve ser apresentados o seguinte texto do produto Alarme Mais:
Solução completa para a proteção do imóvel: câmera, sensor de presença, leitor biométrico.
Auto monitoramento: maior controle da casa através do celular.
Aplicativo multifuncional: ativar/desativar alarmes, ascender/apagar luzes, interação com câmera e acionamento da Central 24h.
Leitor biométrico: ativar/desativar o alarme e controle de pessoas autorizadas no imóvel.
Seguro residencial gratuito incluso: cobertura contra incêndio, roubo e furto e RC Familiar.
Interatividade: monitoramento e interação em tempo real com quem estiver na residência.
Serviço de gravação em nuvem: armazenamento de até 72hs de gravação.
Acesso em tempo real da gravação pelo computador, tablets ou smartphone, 24h por dia.
Serviço de manutenção: um técnico vai até o imóvel para realizar serviços de manutenção no equipamento de alarme.
Sensores de presença e câmeras são instalados em pontos vulneráveis de forma estratégica.
And os botões “Iniciar Cotação” e “Classificar” devem ser apresentados
