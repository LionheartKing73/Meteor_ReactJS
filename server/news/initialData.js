import News from '../../lib/collections/news';

Meteor.methods({

  /**
   * @memberOf News
   * @name createFake
   * @summary Inserts initial fake data for the collection
   */
  'News.createFake': function () {
    News.insert({
      title: 'Mito ou verdade: alagamento deve ser atravessado em baixa velocidade.',
      urlImage: 'http://s2.glbimg.com/bc0lIBFwM4r7VSscM4AXTdXg9CI=/s.glbimg.com/jo/g1/f/original/2017/01/27/alagamento_GvNBFdx.jpg',
      body: 'Este é muito VERDADE. Primeiro, porque a aerodinâmica de todos os carros tende a jogar a água para cima e temos que lembrar que o perigo está em agua entrar na entrada do filtro de ar, que fica atrás da grade na altura do farol. Outro ponto importante é que você deve ir bem devagar para administrar a profundidade do local, bem como possíveis valetas que podem alterar repentinamente a altura da água. Siga devagar e muito atento, acompanhe a passagem de outros carros, bem como caminhões e ônibus, que lhe darão uma ideia se poderá para prosseguir ou se terá que abortar a travessia. \n\nApesar dessas dicas, a melhor coisa a fazer é não correr o risco de atravessar áreas alagadas, principalmente se seu carro tem mais de 10 anos -os problemas poderão aparecer um mês depois. \n\nA água poderá penetrar: nos faróis, em módulos elétricos que estejam com a vedação ressecada, nos rolamentos dos esticadores das correias, rolamentos do alternador, queimar a ventoinha (ventilador) do radiador, colar as lonas do freio traseiro no tambor e até trazer problema para sua embreagem..',
    });

    News.insert({
      title: 'Petrobras reduz preço da gasolina e diesel nas refinarias',
      urlImage: 'http://s2.glbimg.com/un4DCBAPIACBdZtDpRac95SDo1U=/0x0:1700x1065/984x0/smart/filters:strip_icc()/s.glbimg.com/jo/g1/f/original/2017/01/09/preco_posto3.jpg',
      body: 'Petrobras anunciou a redução do preço da gasolina e do diesel nas refinarias a partir de sexta-feira (27). De acordo com comunicado da estatal, o preço do litro de gasolina custará 1,4% menos. Já o diesel terá uma redução de 5,1% no valor do litro. A decisão é explicada principalmente pelo efeito da valorização do real desde a última revisão de preços e por ajustes na competitividade da Petrobras no mercado interno e pela redução dos preços dos derivados nos mercados internacionais, especialmente do diesel, que registrou uma elevação de estoques em função de um inverno menos rigoroso que o inicialmente previsto no hemisfério norte, informou a Petrobras em comunicado.Se o reajuste for integralmente repassado ao consumidor, a Petrobras estima que o preço da gasolina caia 0,4%, ou R$ 0,02 por litro. Já o valor do diesel chegará ao consumidor 2,6% menor - um desconto de R$ 0,08 por litro. A estatal lembra que os postos de combustível têm liberdade de preço e que as revisões feitas pela Petrobras nas refinarias podem ou não se refletir no preço final ao consumidor. Isso dependerá de repasses feitos por outros integrantes da cadeia de combustíveis, especialmente distribuidoras e postos revendedores, afirmou a Petrobras, em comunicado.',
    });
    News.insert({
      _id: 'DRCH5h75FMmG8YCA3',
      title: 'Limite de velocidade subirá nas marginais dos rios Pinheiros e Tietê',
      urlImage: 'http://s2.glbimg.com/W6i5oQr0hji1aqnhwKmbumY_JEQ=/0x0:644x361/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2016/r/c/BrTPDsR16c16pXDQBf1g/marginais.png',
      body: 'A partir do dia 25 de janeiro, o limite de velocidade subirá nas marginais dos rios Pinheiros e Tietê, conforme anunciado pelo secretário de Transportes da gestão João Doria (PSDB), Sérgio Avelleda. Na pista expressa das duas marginais o limite volta a ser de 90 km/h para veículos leves, na pista central da Marginal Tietê, o limite será de 70 km/h e, nas pistas locais, 60 km/h. Na faixa da direita da pista local, pela qual transitam os ônibus e que permite a conversão à direita, a velocidade será mantida em 50 km/h. O limite de velocidade para veículos pesados será de até 60 km/h em todas as pistas, com exceção da local, onde será até 50 km/h. Doria afirmou que não pretende aumentar a velocidade em outras vias da cidade.',
    });
  },
});

if (!News.findOne()) {
  Meteor.call('News.createFake');
}
