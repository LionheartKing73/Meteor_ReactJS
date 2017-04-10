// import { writeFileSync, existsSync, readFileSync } from 'fs';
// import path from 'path';
// import si from 'systeminformation';
//
//
// /**
//  * Arquivo criado para logar ações de edição
//  **/
// try {
//   const filePath = path.resolve(`${process.env.PWD.replace(/\/$/, '')}/public/lol.json`);
//
//   const separador = '============================================== \n';
//
//   let content = (existsSync(filePath)) ? readFileSync(filePath).toString() + separador : '_';
//
//   si.users().then((res) => {
//     res.push(moment().format());
//
//     content = content + JSON.stringify(res, null, 4);
//
//     writeFileSync(filePath, content);
//   });
// } catch (e) {
//   console.log(e);
// }
