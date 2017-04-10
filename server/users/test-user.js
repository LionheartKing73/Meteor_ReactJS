const testerUser = {
  "_id" : "4dsAbhLSXgsNgA3tt",
  "createdAt" : new Date,
  "services" : {
    "password" : {
      "bcrypt" : "$2a$06$ehm5.ODBPLy4ZaEOpfX2ue3SW3Ne9Od6qt9vgkFQImjc9BTCStM7C"
    },
    "resume" : {
      "loginTokens" : [
        {
          "when" : new Date,
          "hashedToken" : "NumyvHj9kgsDNs7SKO5PCpywYfPTTP/u8iAf8C5J6i8="
        },
        {
          "when" : new Date,
          "hashedToken" : "Qg2VqWNqJg6ZHG/sImTXK3DiPaZbOuNY7exQlgMuv0M="
        }
      ]
    },
    "facebook" : {
      "accessToken" : "EAACIgW4RtDsBAD8kXqyvfzAZBeAZCzSn9rqL9LXZBw1KejS4Ir6VePUZCngE1rK51hYZB46xgE4ZBSZBzbsZB1DWB1v4cNpHuW8ZBNDqapyGrrGWzi5WuDf7WkZAp3TFMBALj3mTpPuxm2gVdjZC2gVStUScZAYwY7cdxqz8xX4Fq8Wk8wZDZD",
      "expiresAt" : 1494182977064,
      "id" : "106365369895995",
      "email" : "antonio.saiotti@sciensa.com",
      "name" : "Clovis Scilva",
      "first_name" : "Clovis",
      "last_name" : "Scilva",
      "link" : "https://www.facebook.com/app_scoped_user_id/106365369895995/",
      "gender" : "male",
      "locale" : "pt_BR",
      "age_range" : {
        "min" : 21
      }
    }
  },
  "emails" : [
    {
      "address" : "antonio.saiotti@sciensa.com",
      "verified" : false
    }
  ],
  "profile" : {
    "name" : "Clovis Scilva",
    "CPF" : "378.686.235-35",
    "telefone" : "(11) 9898-9898",
    "tipoPessoa" : "pf",
    "SUSEP" : "111111",
    "susepinha" : "111111"
  },
  "step": 1,
  "roles" : [
    "broker"
  ],
  "status" : {
    "online" : true,
    "lastLogin" : {
      "date" : new Date,
      "ipAddr" : "127.0.0.1",
      "userAgent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
    },
    "idle" : false
  },
  "registrationIsComplete" : true
};


Meteor.methods({
  /**
   * Generate user for tests with cucumber
   * @returns {{email: string, password: string}}
   */
  'test.createTesterUser'(){
    const email = "antonio.saiotti@sciensa.com";
    const password = email;
    const userId = "4dsAbhLSXgsNgA3tt";

    Meteor.users.remove(userId);
    Meteor.users.insert(testerUser);
    Accounts.setPassword(userId, email);

    return {
      email,
      password
    }
  }
});
