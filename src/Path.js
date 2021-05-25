/**
 * 
 * @param {string[]} args 
 */
function join(...args) {
  let ret = '';
  for (let item of args) {
    ret += (ret.length===0 || ret[ret.length - 1] === '/' ? '' : '/') + item;
  }
  return ret;
}

/**
 * 
 * @param {string} path 
 */
function basename(path) {
  let ret = '';
  ret = path.substr(path.lastIndexOf('/') + 1);
  return ret;
}

export default { join, basename };