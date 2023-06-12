String.prototype.mymatch = function (re) {
  if (re.global) {
    var result = []
    var m
    while (m = re.exec(this)) {
      result.push(m[0])
    }
    return result
  }
  return re.exec(this)
}
String.prototype.mymatchAll = function (re) {
  if (re instanceof RegExp) {
    if (!re.global)
      throw new TypeError('  String.prototype.mymatchAll called with a non-global RegExp argumentat String.mymatchAll <anonymous> ')
  }
  if (typeof re == 'string') {
    re = new RegExp(re + 'g')
  }
  var m
  var result = []
  while (m = re.exec(this)) {
    result.push(m)
  }
  return result
}
String.prototype.myreplace = function (re, replace) {
  if (re instanceof RegExp) {
    if (re.global)
      re.lastIndex = 0
  }
  var result = ''
  var m
  var lasidx = 0
  while (m = re.exec(this)) {

    result += this.slice(lasidx, m.index)
    if (typeof replace == 'function') {

      result += replace(...m, m.index, m.input)
    }
    else {
      var rep = this.myreplace(/\$[1-9]\&/, (_, idx) => {
        if (idx == '&') {
          return m[0]
        }
        else {
          return m[idx]
        }
      })
      result += rep
    }
    lasidx = re.lastIndex
    if (!m.global) {
      lasidx = m.index + m[0]
      break
    }
  }
  result += this.slice(lasidx)
  return result
}

String.prototype.mysearch = function (re) {
  if (typeof re == 'string') {
    return this.indexOf(re)
  }
  else {
    if (re.exec(this)) {
      return re.exec(this).index
    }
    return -1

  }
}

RegExp.prototype.mytest = function (str) {
  if (this.exec(str)) {
    return true
  }
  return false

}



String.prototype.mysplit = function (re) {
  if (typeof re == 'string') {
    var result = []
    var fsidx = 0
    var end = this.indexOf(re)
    while (end != -1) {


      result.push(this.slice(fsidx, end))
      fsidx = end + this.length
      end = this.indexOf(re, fsidx)

    }
    result.push(this.slice(fsidx))
  }
  else {
    var result = []
    re.lastIndex = 0
    var m
    var lasidx = 0
    if (!re.global) {
      re = new RegExp(re.source, 'g' + re.flags)
    }
    while (m = re.exec(this)) {
      result.push(this.slice(lasidx, m.index))
      result.push(...m.slice(1))
      lasidx = re.lastIndex
    }
    result.push(this.slice(lasidx))
    return result

  }

}
// class Vector {

//   constructor(x, y) {
//     this.x = x
//     this.y = y


//   }
//   plus(vector) {

//     var x1 = this.x + vector.x
//     var y1 = this.y + vector.y

//     return new vector.constructor(x1, y1)
//   }
//   minus(vector) {
//     var x1 = this.x - vector.x
//     var y1 = this.y - vector.y
//     return new vector.constructor(x1, y1)
//   }
//   get length() {
//     return Math.sqrt(this.x ** 2 + this.y ** 2)
//   }
// }


// class Complex {

//   constructor(real, imag) {
//     this.real = real
//     this.imag = imag
//   }
//   plus(a) {
//     var x1 = this.real + a.real
//     var y1 = this.imag + a.imag
//     return new Complex(x1, y1)
//   }
//   minus(a) {
//     var x1 = this.real - a.real
//     var y1 = this.imag - a.imag
//     return new Complex(x1, y1)
//   }
//   mul(a) {
//     var x1 = this.real * a.real - this.imag * a.imag
//     var y1 = this.real * a.imag + this.imag * a.real
//     return new Complex(x1, y1)
//   }
//   div(a) {
//     var h = new Complex(a.real, -a.imag)
//     var u = this.mul(h)
//     var d = a.mul(h)
//     var x = u.real / d.real
//     var y = u.imag / d.real
//     return new Complex(x, y)

//   }


// }


// class Stack {
//   constructor() {
//     this.head = null
//     this.len = 0
//   }

//   push(val) {
//     var node = { val: val, next: null }
//     if (this.head == null) {
//       this.head = node
//       this.len++
//       return this
//     }
//     else {
//       var p = this.head
//       this.head = node
//       node.next = p
//       this.len++
//       return this
//     }

//   }

//   pop() {
//     if (this.head != null) {
//       var p = this.head
//       this.head = this.head.next
//       this.len--
//       return p.val
//     }
//   }
//   get size() {
//     return this.len
//   }
// }



// class Queue {
//   constructor() {
//     this.head = null
//     this.tail = null
//     this.len = 0
//   }

//   add(val) {
//     var node = {
//       val: val,
//       next: null
//     }
//     if (this.head == null) {
//       this.head = node
//       this.tail = node
//       this.len++
//     }
//     else {

//       this.tail.next = node
//       this.tail = node
//       this.len++
//     }
//   }
//   pop() {
//     if (this.head == null) {
//       return
//     }
//     var p = this.head
//     this.head = this.head.next
//     p.next = null
//     if (this.head == null) {
//       this.tail = null
//     }
//     this.len--
//     return p.val
//   }
//   get size() {
//     return this.len
//   }


// }


// class LinkedList {

//   constructor() {
//     this.head = null
//     this.tail = null
//     this.len = 0
//   }
//   // 往链表的末尾增加一个元素
//   append(val) {
//     var node = { val: val, next: null }
//     if (this.head == null) {
//       this.head = node
//       this.tail = node
//       this.len++
//       return this
//     }
//     else {
//       this.tail.next = node
//       this.tail = node
//       this.len++
//       return this
//     }
//   }
//   // 往链表的头部增加一个元素
//   prepend(val) {
//     var node = { val: val, next: null }
//     if (this.head == null) {
//       this.head = node
//       this.tail = node
//       this.len++
//       return this
//     }
//     else {
//       var p = this.head
//       node.next = this.head
//       this.head = node
//       this.len++
//       return this
//     }
//   }
//   // 返回链表第idx个元素
//   at(idx) {
//     var a = 0
//     var p = this.head
//     while (a < idx) {
//       p = p.next
//       a++
//     }
//     return p.val
//   }
//   get size() {
//     return this.len
//   }

// }

// class MyMap {


//   constructor() {
//     this.length = 0
//     this.keys = []
//     this.vals = []
//   }

//   set(key, val) {
//     if (this.keys.includes(key)) {
//       var a = this.keys.indexOf(key)
//       this.vals[a] = val
//       return this
//     }
//     else {
//       this.keys.push(key)
//       this.vals.push(val)
//       this.length++
//       return this
//     }


//   }
//   get(key) {
//     if (this.has(key)) {
//       var a = this.keys.indexOf(key)
//       return this.vals[a]
//     }

//   }
//   has(key) {
//     if (this.keys.includes(key)) {
//       return true
//     }
//     return false

//   }
//   delete(key) {
//     if (this.has(key)) {
//       var a = this.keys.indexOf(key)
//       this.keys.splice(a, 1)
//       this.vals.splice(a, 1)
//       this.length--
//       return true
//     }
//     return false
//   }
//   get size() {
//     return this.length

//   }


// }


// class MySet {

//   constructor() {
//     this.arr = []
//     this.len = 0

//   }
//   add(key) {
//     if (this.has(key)) {
//       return
//     }
//     else {
//       this.arr.push(key)
//       this.len++
//       return this
//     }
//   }
//   delete(key) {

//     if (this.has(key)) {
//       var a = this.arr.indexOf(key)
//       this.arr.splice(a, 1)
//       this.len--
//       return this
//     }

//   }
//   has(key) {
//     if (this.arr.includes(key)) {
//       return true
//     }
//     return false
//   }


//   get size() {
//     return this.len
//   }

// }




