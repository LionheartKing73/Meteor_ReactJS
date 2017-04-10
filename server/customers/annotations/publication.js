Meteor.publish(

  'annotations.all', () => (Annotations.find({})),

);
