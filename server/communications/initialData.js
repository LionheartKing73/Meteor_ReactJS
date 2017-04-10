import React, {
  Component,
} from 'react';
import Communications from '../../lib/collections/communications';

const userId = (Meteor.users.findOne() || {})._id;

//------------------------------------------------------------------------------------
// Creates fake data for the Communications collection
//------------------------------------------------------------------------------------
Meteor.methods({

  /**
   * @memberOf Communications
   * @name createFake
   * @summary Inserts initial fake data for the collection
   */
  'communications.createFake': function () {
    Communications.insert({
      _id: 'DpnNZuR7QuGingp2N',
      title: 'Teste 1',
      mediaUrl: 'http://media.gettyimages.com/photos/woman-using-smart-phone-seaside-picture-id511066583?s=170667a',
      brokerId: 'WDsLyf5HMJTHJ4WKM',
    },
    );

    Communications.insert({
      _id: '6qiWbGPBbYxDBJR3C',
      title: 'Teste 2',
      mediaUrl: 'http://media.gettyimages.com/photos/multiple-exposure-picture-id533492857?s=170667a',
      brokerId: 'WDsLyf5HMJTHJ4WKM',
    });

    Communications.insert({
      _id: 'dQRnWCwRxaZjwNKM4',
      title: 'Teste 3',
      mediaUrl: 'http://media.gettyimages.com/photos/festival-goers-picture-id144085525?s=170667a',
      brokerId: 'WDsLyf5HMJTHJ4WKM',
    });
  },

});

if (!Communications.findOne()) {
  Meteor.call('communications.createFake');
}
