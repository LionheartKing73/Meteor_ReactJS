global.SubsManager = new SubsManager();
global.__subsChache = {};

global.GlobalSubsManager = function(){
  const key = btoa(JSON.stringify(arguments));

  const existentSub = global.__subsChache[key];

  if(existentSub) return global.__subsChache[key];

  const sub = SubsManager.subscribe(...arguments);

  global.__subsChache[key] = sub;

  return sub;
};

