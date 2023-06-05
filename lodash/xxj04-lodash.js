var user_name = {
  chunk: function (ary, size) {
    var b = []
    for (var i = 0; i < ary.length; i += size) {
      b.push(ary.slice(i, i + size))
    }
    return b

  }
  ,
  compact: function (ary) {
    var b = []
    for (var i = 0; i < ary.length; i++) {
      if (ary[i]) {
        b.push(ary[i])
      }
    }
    return b
  }
  ,
  concat: function (ary, ...arr) {

    var b = [...arguments]
    var aa = []
    for (var i = 0; i < b.length; i++) {
      aa.push(...b[i])
    }
    return aa
  }

  ,
  difference: function (arr1, arr2) {
    if (arr2 == null) {
      return arr1
    }
    for (var i = 0; i < arr2.length; i++) {
      for (j = 0; j < arr1.length; j++) {
        if (arr2[i] == arr1[j]) {
          arr1.splice(j, 1)
        }
      }
    }
    return arr1
  }
  ,
  differenceBy: function (arr, arrays, iteratee = _.identity) {
    var b = new Set
    arr.forEach((it) => {
      b.add(...(arrays).filter((item) => {
        if (typeof (iteratee) == 'function' && iteratee(item) != iteratee(it)) {
          return iteratee(it)
        }
        if (it[iteratee] != null && it[iteratee] != item[iteratee]) {
          return it[iteratee]
        }
      }))
    })
    var b = [...b]
    if (b.includes(undefined)) {
      b.splice(b.indexOf(undefined), 1)
    }
    return b

  }
  ,
  differenceWith: function (arr, arrays, comparator) {
    var b = new Set
    arr.forEach((it) => {
      b.add(...(arrays).filter((item) => {
        if (comparator(it, item)) {
          return it
        }
      }))
    })

    return b
  }
  ,

  drop: function (array, n) {
    if (n == null) {
      n = 1
    }
    if (n == 0) {
      return array
    }
    return array.splice(n)


  }
  ,

  dropRight: function (array, n) {
    if (n == null) {
      n = 1
    }
    var a = array.length - n
    if (a < 0) {
      return []
    }
    return array.length = a
  }

  ,
  fill: function (array, value, start = 0, end = array.length) {

    for (var i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }

  ,
  findIndex: function (array, predicate = _.identity, fromIndex = 0) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == predicate(fromIndex)) {
        return i
      }
    }
    return -1
  }
  ,
  findLastIndex: function (array, [predicate = _.identity], [fromIndex = array.length - 1]) {
    for (var i = array.length - 1; 0 <= i; i--) {
      if (array[i] == predicate(fromIndex)) {
        return i
      }
    }
    return -1
  }

  ,
  head: function (array) {
    return array[0]
  }
  ,
  flatten: function (array) {
    var b = []
    array.map((item) => {
      b = b.concat(item)
    })
    return b
  }

  ,
  flattenDeep: function (array) {
    var a = []
    array.forEach((it) => {
      if (Array.isArray(it)) {
        a = a.concat(flattenDeep(it))
      }
      else {
        a.push(it)
      }
      return a

    })
  }
  ,


  flattenDepth: function (array, depth = 1) {
    var a = []
    if (depth == 0) {

      return array
    }
    for (var i = 0; i < array.length; i++) {

      if (Array.isArray(array[i])) {
        depth--
        a = a.concat(flattenDepth(array[i], depth))
      }
      else {
        a.push(array[i])
      }
    }
    return a
  }
  ,
  fromPairs: function (pairs) {
    var a = Object.fromEntries(pairs)
    return a
  }
  ,
  indexOf: function (array, value, fromIndex = 0) {
    if (fromIndex < 0) {
      for (var i = array.length; 0 <= i; i--) {
        if (array[i] == value) {
          return i
        }
      }
    }

    for (var i = fromIndex; i < array.length; i++) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  }
  ,
  initial: function (array) {
    if (array.length == 0) {
      return []
    }
    array.length = array.length - 1
    return array
  }
  ,
  intersection: function (arr, ...arrays) {
    var b = new Set

    arrays.forEach((it) => {
      b.add(...(arr).filter((item) => {
        return it.includes(item)
      }))
    })
    return [...b]


  }
  ,
  intersectionBy: function (arr, arrays, iteratee = _.identity) {
    var b = new Set
    arr.forEach((it) => {
      b.add(...(arrays).filter((item) => {
        if (iteratee(item) == iteratee(it)) {
          return iteratee(it)
        }
        if (it[iteratee] != null && it[iteratee] == item[iteratee]) {
          return it[iteratee]
        }
        return
      }))
    })
    return [...b]

  }

  ,
  intersectionWith: function (arr, arrays, comparator) {
    var b = new Set()
    arr.forEach((it) => {
      b.add(...(arrays).filter((item) => {
        if (comparator(it, item)) {
          return it
        }
      }))
    })
    return [...b]
  }


  ,
  join: function (array, separator = ',') {
    var b = ''
    array.forEach((it) => {
      b += it + separator
    })
    return b.slice(0, b.length - 1)

  }

  ,

  last: function (array) {
    return array[array.length - 1]
  }

  ,
  lastIndexOf: function (array, value, fromIndex = array.length - 1) {
    for (var i = fromIndex; 0 <= i; i--) {
      if (array == value) {
        return i
      }
    }
    return i
  }
  ,

  nth: function (array, n = 0) {
    if (n >= 0) {
      return array[n]
    }
    return array.at(n)
  }

  ,
  pullAll: function (array, ...values) {
    values.forEach((it) => {
      array.forEach((item, i) => {
        if (it == item) {
          array.slice(i, 1)
        }
      })

    })


    return array
  }

  ,
  pull: function (array, values) {
    remove(array, values.map((it) => (it)))
    return array
  }
  ,

  pullAllBy: function (array, values, iteratee = _.identity) {
    values.forEach((it) => {
      array.forEach((item, i) => {
        if (typeof (iteratee) == 'function' && iteratee(it) == iteratee(item)) {
          array.slice(i, 1)
        }
        else (it[iteratee] == item[iteratee]) {
          array.slice(i, 1)
        }
      })
    })
    return array
  }

  ,

  pullAllWith: function (array, values, comparator) {
    values.forEach((it) => {
      array.forEach((item, i) => {
        if (comparator(it, item)) {
          array.splice(item, i)
        }
      })
    })
    return array
  }
  ,

  pullAt: function (array, ...indexes) {
    var a = []
    indexes.forEach((it, j) => {
      a.push(...array.filter((item, i) => {
        return it == i
      }))
    })
    a.forEach((it) => {
      array.splice(array.indexOf(it), 1)
    })

    return a
  }
  ,
  remove: function (array, predicate = _.identity) {
    var b = []
    array.forEach((it, i) => {
      if (typeof (predicate) == 'function' && predicate(it)) {
        b.push(array[i])
        array.splice(i, 1)
      }
      else {
        b.push(predicate.filter((item) => {
          return item != array
        }))
        array.forEach((it1) => {
          predicate.forEach((item1) => {
            if (it1 == item1) {
              array.splice(i, 1)
            }
          })
        })
      }
    })
    return b
  }
  ,
  reverse: function (array) {
    var j = array.length - 1
    for (var i = 0; i <= array.length >> 1; i++) {
      this.swap(array, i, j)
      j--
    }
  },
  swap: function (array, i, j) {
    let a = array[i]
    array[i] = array[j]
    array[j] = a
  }
}



