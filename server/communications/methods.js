import 'isomorphic-fetch';

import { check, Match } from 'meteor/check';

import phantomjs from 'phantomjs-prebuilt';
import Future from 'fibers/future';
import upath from 'upath';
import validUrl from 'valid-url';

// Properties used for taking a screenshot of the Url
const options = {
  phantomPath: phantomjs.path,

  phantomConfig: {
    'ssl-protocol': 'ANY',
    'ignore-ssl-errors': 'true',
  },

  streamType: 'jpg',
  quality:	40,
  windowSize: { width: 524, height: 268 },
  shotSize: { width: 524, height: 268 },
};

Meteor.methods({

  /**
   * @memberOf Communications
   * @name insert
   * @summary Insert Social media into collection
   * @param {String} title - Title of the shared social media
   * @param {String} mediaUrl - URL of the shared social media
   */
  'communications.insert': function (title, mediaUrl) {
    console.log('title : ', title);
    console.log('mediaUrl : ', mediaUrl);

    console.log('this.userId : ', this.userId);

    check(mediaUrl, Match.Where(mediaUrl => validUrl.isUri(mediaUrl)));

    const saved = Communications.insert({ title, mediaUrl, brokerId: this.userId });
    console.log(`Saved: ${saved}`);
    return saved;
  },

  /**
   * @memberOf Communications
   * @name remove
   * @summary Deletes Social media from collection
   * @param {String} mediaUrl - Social media doc to be removed
   */
  'communications.remove': function (media) {
    return Communications.remove(media);
  },

  /**
   * @memberOf Communications
   * @name update
   * @summary Updates Social media into collection
   * @param {String} title - Title of the shared social media
   * @param {String} mediaUrl - URL of the shared social media
   */
  'communications.update': function (id, title, mediaUrl) {
    return Communications.update(id, { $set: { title, mediaUrl } });
  },

  /**
   * @memberOf Communications
   * @name saveMedia
   * @summary Take a screenshot of the Url and saves into disk
   * @param {communications} socialmedia - Social media doc to be saved
   */
  'communications.saveMedia': function (socialmedia) {
    const future = new Future();

    // Gets app path
    let appPath;
    if (process.env.NODE_ENV == 'production') {
      appPath = process.env.OLDPWD;
    } else {
      appPath = process.env.PWD;
    }

    // Gets image path to be saved (appPath/.screenshots/_id.jpg folder)
    const nomeArquivo = `${socialmedia.id}.jpg`;
    const imageFile = `${upath.toUnix(appPath)}/.screenshots/${nomeArquivo}`;

    console.log(`---------- appPath: ${appPath}`);
    console.log(`---------- imageFile: ${imageFile}`);

    //----------------------------------------------------------------------
    // Take a screenshot of the Url and saves into disk
    // To use webshot please install : meteor add bryanmorgan:webshot
    //----------------------------------------------------------------------
    webshot(socialmedia.mediaUrl, imageFile, options, (error) => {
      if (error != null) {
        future.return(error);
        console.log(`Erro no webshot: ${error}`);
      }

      const image = {
        title: socialmedia.title,
        mediaUrl: socialmedia.mediaUrl,
        nomeArquivo };

      console.log(`socialmedia : ${JSON.stringify(socialmedia)}`);
      console.log(`nomeArquivo : ${nomeArquivo}`);

      future.return(image);
    });

    return future.wait();
  },

});
