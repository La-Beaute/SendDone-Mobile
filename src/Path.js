/**
 * 
 * @param {string[]} args 
 */
function join(args) {
  let ret = '';
  for (let item of args) {
    ret += '/' + item;
  }
  return ret;
}

export default { join };