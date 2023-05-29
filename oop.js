
class Vector {

  constructor(x, y) {
    this.x = x
    this.y = y
  }
  plus(Vector) {
    var x1 = this.x + Vector.x
    var x2 = this.y + Vector.y
    return new Vector(x1, x2)
  }
  minus(Vector) {
    var x1 = this.x - Vector.x
    var x2 = this.y - Vector.y
    return new Vector(x1, x2)
  }
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
}


class Complex {

  constructor(x, y) {
    this.x = x
    this.y = y
  }
  plus(a) {
    var x1 = this.x + a.x
    var y1 = this.y + a.y
    return new Complex(x1, y1)
  }
  minus(a) {
    var x1 = this.x - a.x
    var y1 = this.y - a.y
    return new Complex(x1, y1)
  }
  mul(a) {
    var x1 = this.x * a.x - this.y * a.y
    var y1 = this.x * a.y - this.y * a.x
    return new Complex(x1, y1)
  }
  div(a) {
    var b = new Complex(c.x, -c.y)
    var c = this.mul(b)
    var d = a.mul(b)
    var x1 = up.x / down.x
    var y1 = up.y / down.x
    return new Complex(x1, y1)
  }


}


class Stack {
  constructor() {
    this.head = null
    this.len = 0
  }

  push(val) {
    var node = { val: val, next: null }
    if (this.head == null) {
      this.head = node
      this.len++
      return this
    }
    else {
      var p = this.head
      this.head = node
      node.next = p
      this.len++
      return this
    }

  }

  pop() {
    if (this.head != null) {
      var p = this.head
      this.head = this.head.next
      this.len--
      return p.val
    }
  }
  get size() {
    return this.len
  }
}



class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.len = 0
  }

  add(val) {
    var node = {
      val: val,
      next: null
    }
    if (this.head == null) {
      this.head = node
      this.tail = node
      this.len++
    }
    else {

      this.tail.next = node
      this.tail = node
      this.len++
    }
  }
  pop() {
    if (this.head == null) {
      return
    }
    var p = this.head
    this.head = this.head.next
    p.next = null
    if (this.head == null) {
      this.tail = null
    }
    this.len--
    return p.val
  }
  get size() {
    return this.len
  }


}


class LinkedList {

  constructor() {
    this.head = null
    this.tail = null
    this.len = 0
  }
  // 往链表的末尾增加一个元素
  append(val) {
    var node = { val: val, next: null }
    if (this.head == null) {
      this.head = node
      this.tail = node
      this.len++
      return this
    }
    else {
      this.tail.next = node
      this.tail = node
      this.len++
      return this
    }
  }
  // 往链表的头部增加一个元素
  prepend(val) {
    var node = { val: val, next: null }
    if (this.head == null) {
      this.head = node
      this.tail = node
      this.len++
      return this
    }
    else {
      var p = this.head
      node.next = this.head
      this.head = node
      this.len++
      return this
    }
  }
  // 返回链表第idx个元素
  at(idx) {
    var a = 0
    var p = this.head
    while (a < idx) {
      p = p.next
      a++
    }
    return p.val
  }
  get size() {
    return this.len
  }

}

class MyMap {


  constructor() {
    this.length = 0
    this.keys = []
    this.vals = []
  }

  set(key, val) {
    if (this.keys.includes(key)) {
      var a = this.keys.indexOf(key)
      this.vals[a] = val
      return this
    }
    else {
      this.keys.push(key)
      this.vals.push(val)
      this.length++
      return this
    }


  }
  get(key) {
    if (this.has(key)) {
      var a = this.keys.indexOf(key)
      return this.vals[a]
    }

  }
  has(key) {
    if (this.keys.includes(key)) {
      return true
    }
    return false

  }
  delete(key) {
    if (this.has(key)) {
      var a = this.keys.indexOf(key)
      this.keys.splice(a, 1)
      this.vals.splice(a, 1)
      this.length--
      return true
    }
    return false
  }
  get size() {
    return this.length

  }


}


class MySet {

  constructor() {
    this.arr = []
    this.len = 0

  }
  add(key) {
    if (this.has(key)) {
      return
    }
    else {
      this.arr.push(key)
      this.len++
      return this
    }
  }
  delete(key) {

    if (this.has(key)) {
      var a = this.arr.indexOf(key)
      this.arr.splice(a, 1)
      this.len--
      return this
    }

  }
  has(key) {
    if (this.arr.includes(key)) {
      return true
    }
    return false
  }


  get size() {
    return this.len
  }

}
