global.Utils = {};

//---------------------------------------------------------------------
// Calculates a persons age based on its birthday
//---------------------------------------------------------------------
Utils.getAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

//---------------------------------------------------------------------
// Calculates diffence in minutes between passed date and current date/time
//---------------------------------------------------------------------
Utils.getDiffsMins = (timeToExpire) => {
  const today = new Date();
  const diffMs = (timeToExpire - today);
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

  return diffMins;
};

