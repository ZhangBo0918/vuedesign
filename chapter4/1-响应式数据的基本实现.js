/**
 * 初步使用proxy实现
*/
const bucket = new Set()

const data = { text: 'hello world' }
function effect() {
  data.text = 'hello everyone'
}
const obj = new Proxy(data, {
  get(target, key) {
    console.log('get----->', target, key);
    bucket.add(effect)
    return target[key]
  },
  set(target, key, newVal) {
    console.log('set----->', target, key, newVal);
    target[key] = newVal
    bucket.forEach(fn => fn())
    return true
  }
})

effect()
setTimeout(() => {
  obj.text = 'hello i need you'
}, 2000)