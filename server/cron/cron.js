if (Meteor.isServer) {
  // optionally set the collection's name that synced cron will use
  SyncedCron.config({
    collectionName: 'cronServices',
  });

  SyncedCron.add({
    name: 'Checking expired activities',
    schedule(parser) {
      // parser is a later.parse object
      return parser.text('every 1 mins');
    },
    job(intendedAt) {
      // console.log('job should be running at:' + intendedAt);

      // Removes all activities which time to expire has passed
      Meteor.call('activities.checkTimeToExpire');

      // Updates / removes all activities with current minutes to expire
      Meteor.call('activities.updateTimeToExpire', (err, res) => {
        if (err) console.log('Ops...', err.reason);
      });
    },
  });

  Meteor.startup(() => {
    // code to run on server at startup
    SyncedCron.start();

    // Stop jobs after 15 seconds
    // Meteor.setTimeout(function() { SyncedCron.stop(); }, 15 * 1000);
  });
}
