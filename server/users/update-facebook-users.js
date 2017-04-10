import Uploads from '../../lib/collections/uploads';


Meteor.methods({
  updateFacebookUsersFullName(){
    Customers.find({}).forEach(u => {
        let fullName = u.name + ((u.surname) ? ` ${u.surname}` : '');
        fullName = fullName.replace(/ $/, '');

        Customers.update({
          _id: u._id,
        }, {
          $set: {
            fullName
          },
          $addToSet: { updatedFullName: new Date }
        });
      }
    );
  },

  updateUsersFromFacebookFullName(customers = []){
    customers.map(u => {
        $set = {
          facebookId,
          avatar: `https://graph.facebook.com/${facebookId}/picture?type=large`
        };
        Customers.update({ _id: u._id }, { $set });
      }
    );
  },

  getLastFbUploadFromUser(){
    return FacebookHTMLUploads.findOne({ 'aceleradoraFileData.userId': this.userId }, { sort: { uploadedAt: -1 } });
  }
});

const fbNameRegex = /\["((\w)*)","((\w)*)"],alternateName:"/mig;

FacebookHTMLUploads.on('stored', Meteor.bindEnvironment(function(fileObj, storeName) {
  // lidar apenas com arquivo HTML para cadastrar
  // avatar da pagina de amigos do facebook
  if(g(fileObj, 'aceleradoraFileData', 'internalFileType') !== 'fbHTML') return;

  let uploadFileWithFullPath = `${FACEBOOK_HTML_UPLOADS}/${fileObj.copies.facebookHTMLUploads.key}`;

  const uploadFileValue = fs.readFileSync(uploadFileWithFullPath, 'utf8');

  console.log(uploadFileValue.match(fbNameRegex))
}));
