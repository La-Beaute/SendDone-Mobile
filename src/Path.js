/**
 * 
 * @param {string[]} args 
 */
function join(...args) {
  let ret = '';
  for (let item of args) {
    ret += (ret.length === 0 || ret[ret.length - 1] === '/' ? '' : '/') + item;
  }
  return normalize(ret);
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

/**
 * @param {string} path
 */
function normalize(path) {
  let items = path.split('/');
  let ret = '/';
  for (let item of items) {
    if (item !== '.')
      ret += (ret.length === 0 || ret[ret.length - 1] === '/' ? '' : '/') + item;
  }
  return ret;
}
export default { join, basename, normalize };