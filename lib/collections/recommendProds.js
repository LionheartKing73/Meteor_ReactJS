const _RecommendProds = new Mongo.Collection('recommendProds');
export default _RecommendProds;
global.RecommendProds = _RecommendProds;
