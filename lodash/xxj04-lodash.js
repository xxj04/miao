var xxj04 = {
  iteratee: function (predicate) {
    var func = predicate
    if (typeof func === 'string') {
      func = xxj04.property(predicate)
    }
    else if (Array.isArray(predicate)) {
      func = xxj04.matchesProperty(predicate)
    }
    else if (typeof predicate === 'object') {

      func = xxj04.matches(predicate)
    }
    return func
  }
  ,
  property: function (path) {
    return function (object) {
      return xxj04.get(object, path)
    }
  }
  ,
  matchesProperty: function (path, srcValue) {
    return function (object) {
      return xxj04.isMath(object[path], srcValue)
    }
  }
  ,
  matches: function (source) {
    return function (object) {
      return xxj04.isMath(object, source)
    }
  }
  ,
  get: function (obj, path, defaultValue) {
    if (obj == undefined) {
      return defaultValue
    }
    if (path.length == 0) {
      return obj
    }
    return xxj04.get(obj[path[0]], path.slice(1))
  }
  ,

  isMath: function (object, source) {
    for (key of source) {
      if (typeof source[key] === 'object') {
        if (!xxj04.isMath(object[key], src[key])) {
          return false
        }
      }
      else {
        if (object[key] !== src[key]) {
          return false
        }
      }
    }
    return true
  }

  ,
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
      if (Array.isArray(b[i])) {
        aa.push(...b[i])

      }
      else {
        aa.push(b[i])
      }
    }
    return aa
  }

  ,
  difference: function (arr1, ...arr2) {
    var a = [...arr2]
    var b = []
    a.forEach((it) => {
      b = b.concat(it)
    })
    if (arr2 == null) {
      return arr1
    }
    for (var i = 0; i < b.length; i++) {
      for (j = 0; j < arr1.length; j++) {
        if (b[i] == arr1[j]) {
          arr1.splice(j, 1)
        }
      }
    }
    return arr1
  }
  ,
  differenceBy: function (arr, arrays, iteratee = _.identity) {

    var result = []

    for (var itme of arr) {
      var keep = true
      for (var val of arrays) {
        if (iteratee(itme) === iteratee(val)) {
          keep = false
          break
        }

      }
      if (keep) {
        result.push(itme)
      }
    }
    return result
  }
  ,
  differenceWith: function (arr, arrays, comparator) {

    var result = []

    for (var itme of arr) {
      var keep = true
      for (var val of arrays) {
        if (comparator(itme, val)) {
          keep = false
          break
        }

      }
      if (keep) {
        result.push(itme)
      }
    }
    return result
  }
  ,


  sumBy: function (array, iteratee = _.identity) {
    let result = []
    iteratee = xxj04.iteratee(iteratee)

    for (var i = 0; i < array.length; i++) {
      result += iteratee(array[i])
    }
    return result
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
    array.length = a
    return array
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
  findLastIndex: function (array, predicate = _.identity, [fromIndex = array.length - 1]) {
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
        a = a.concat(xxj04.flattenDeep(it))
      }
      else {
        a.push(it)
      }

    })
    return a

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
        a = a.concat(xxj04.flattenDepth(array[i], depth))
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
      fromIndex = fromIndex + array.length
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
    return Array.from(b)


  }
  ,
  intersectionBy: function (arr, arrays, iteratee = _.identity) {
    var b = []
    iteratee = xxj04.iteratee(iteratee)
    arrays.forEach((it) => {
      b.push(...(arr).filter((item) => {
        if (iteratee(item) == iteratee(it)) {
          return iteratee(it)
        }

        return
      }))
    })
    return b
  }

  ,
  intersectionWith: function (arr, arrays, comparator) {
    var b = []
    arr.forEach((it) => {
      b.push(...(arrays).filter((item) => {
        if (comparator(it, item)) {
          return it
        }
      }))
    })

    return b
  }


  ,
  join: function (array, a = ',') {
    var b = ''
    array.forEach((it) => {
      b += it + '' + a
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
      if (array[i] == value) {
        return i
      }
    }
    return -1
  }
  ,

  nth: function (array, n = 0) {
    if (n >= 0) {
      return array[n]
    }
    return array.at(n)
  }

  ,
  pullAll: function (array, values) {
    values.forEach((it) => {
      array.forEach((item, i) => {
        if (it == item) {
          array.splice(i, 1)
        }
      })

    })


    return array
  }

  ,
  pull: function (array, ...values) {
    xxj04.remove(array, values.map((it) => (it)))
    return array
  }
  ,

  pullAllBy: function (array, values, iteratee = _.identity) {
    values.forEach((it) => {
      array.forEach((item, i) => {
        if (typeof (iteratee) == 'function' && iteratee(it) == iteratee(item)) {
          array.splice(i, 1)
        }
        if (it[iteratee] == item[iteratee]) {
          array.splice(i, 1)
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
          array.splice(i, 1)
        }
      })
    })
    return array
  }
  ,

  pullAt: function (array, indexes) {
    var a = []
    indexes.forEach((it) => {
      a.push(...array.filter((item, i) => {
        if (it == i) {
          return item
        }
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

    for (var i = 0; i < array.length; i++) {
      if (typeof (predicate) == 'function' && predicate(array[i])) {
        b.push(array[i])
        array.splice(i, 1)
      }
      else {
        for (var j = 0; j < predicate.length; j++) {
          if (array[i] == predicate[j]) {
            b.push(array[i])
            array.splice(i, 1)
          }
        }
      }

    }
    return array


  }
  ,
  reverse: function (array) {
    var j = array.length - 1
    for (var i = 0; i <= array.length >> 1; i++) {
      this.swap(array, i, j)
      j--
    }
    return array
  },
  swap: function (array, i, j) {
    let a = array[i]
    array[i] = array[j]
    array[j] = a
  }
  ,

  slice: function (array, start = 0, end = array.length) {
    array.filter((it, i) => {
      return end > i && i >= start
    })
  }
  ,
  sortedIndex: function (array, value) {
    var left = 0
    var right = array.length - 1
    while (left <= right) {
      var mid = Math.floor((left + right) / 2)
      if (array[mid] >= value) {
        right = mid - 1
      }
      else if (array[mid] < value) {
        left = mid + 1
      }
      else {
        return mid
      }
    }
    return right + 1

  }
  ,
  sortedIndexBy: function (array, value, iteratee = _.identity) {
    for (var i = 0; i < array.length; i++) {
      if (typeof (iteratee) == 'function') {
        if (iteratee(array[array.length - 1]) < iteratee(value)) {
          return array.length
        }
        if (iteratee(array[0]) >= iteratee(value)) {
          return 0
        }
        if (iteratee(array[i]) <= iteratee(value) && iteratee(array[i + 1]) > iteratee(value)) {
          return i
        }


      }
      if (value[iteratee] != null) {

        if ((array[array.length - 1][iteratee]) < (value[iteratee])) {
          return array.length
        }
        if ((array[0][iteratee]) >= (value[iteratee])) {
          return 0
        }
        if ((array[i][iteratee][iteratee]) <= (value[iteratee]) && (array[i + 1][iteratee]) > (value[iteratee])) {
          return i
        }


      }
    }


  }

  ,
  sortedIndexOf: function (array, value) {
    var left = 0
    var right = array.length - 1

    while (left <= right) {
      var mid = (left + right) >> 1

      if (array[mid] >= value) {
        if (right == 0) {
          return 0
        }
        right = mid - 1
      }
      else if (array[mid] < value) {
        left = mid + 1
      }
      else {
        return mid
      }
    }
    return right + 1
  }
  ,

  sortedLastIndex: function (array, value) {
    var left = 0
    var right = array.length - 1

    while (left <= right) {
      var mid = (left + right) >> 1

      if (array[mid] > value) {
        if (right == 0) {
          return 0
        }
        right = mid - 1
      }
      else if (array[mid] <= value) {
        left = mid + 1
      }
      else {
        return mid
      }
    }
    return right + 1
  }
  ,

  sortedLastIndexBy: function (array, value, iteratee = _.identity) {
    for (var i = 0; i < array.length; i++) {
      if (typeof (iteratee) == 'function') {
        if (iteratee(array[array.length - 1]) < iteratee(value)) {
          return array.length
        }
        if (iteratee(array[0]) == iteratee(value)) {
          return 1
        }
        if (iteratee(array[i]) <= iteratee(value) && iteratee(array[i + 1]) > iteratee(value)) {
          return i + 1
        }


      }
      if (value[iteratee] != null) {

        if ((array[array.length - 1][iteratee]) < (value[iteratee])) {
          return array.length
        }
        if ((array[0][iteratee]) == (value[iteratee])) {
          return 1
        }
        if ((array[i][iteratee][iteratee]) <= (value[iteratee]) && (array[i + 1][iteratee]) > (value[iteratee])) {
          return i + 1
        }


      }
    }
  }
  ,
  sortedLastIndexOf: function (array, value) {
    var left = 0
    var right = array.length - 1

    while (left <= right) {
      var mid = (left + right) >> 1

      if (array[mid] > value) {
        if (right == 0) {
          return 0
        }
        right = mid - 1
      }
      else if (array[mid] <= value) {
        left = mid + 1
      }
      else {
        return mid
      }
    }
    return right
  }
  ,


  sortedUniq: function (array) {
    var a = new Set()
    array.forEach((it) => {
      a.add(it)
    })
    return [...a]

  }


  ,

  sortedUniqBy: function (array, iteratee) {
    var a = new Set()
    var b = new Set()
    array.forEach((it) => {
      if (a.has(iteratee(it))) {
        return
      } else {
        a.add(iteratee(it))
        b.add(it)
      }
    })
    return [...b]
  }
  ,

  tail: function (array) {
    var a = array.filter((_, i) => {
      return i != 0
    })
    return a
  }

  ,
  take: function (array, n = 1) {
    var a = array.filter((_, i) => {
      return i + 1 <= n
    })
    return a
  }

  ,
  takeRight: function (array, n = 1) {
    if (n > array.length) {
      return array
    }
    for (var i = array.length - 1; 0 <= i; i--) {
      n--
      if (n == 0) {
        array = array.slice(i)
        return array
      }
    }
  }
  ,
  union: function (...arrays) {
    var a = new Set()
    arrays = xxj04.flattenDeep(arrays)
    arrays.forEach((item) => {
      a.add(item)
    })
    return [...a]
  }
  ,
  unionBy: function (arrays, iteratee = _.identity) {
    var a = new Set()
    var b = new Set()
    arrays = [...arguments]
    if (typeof (iteratee) == 'function') {
      arrays.forEach((item) => {
        for (var i = 0; i < item.length; i++) {
          if (a.has(iteratee(item[i]))) {
            return
          } else {
            a.add(iteratee(item[i]))
            b.add(item[i])
          }
        }

      })
    }

    else {
      arrays.forEach((item) => {

        for (var i = 0; i < item.length; i++) {
          if (a.has(item[i][iteratee])) {
            return
          } else {
            a.add(item[i][iteratee])
            b.add(item[i])
          }
        }
      })
    }

    return [...b]
  }
  ,
  unionWith: function (arrays, comparator) {
    var array = [...arguments]
    var comparator = arrays.pop()
    var arrays = []
    var arr = []
    array.forEach((it) => {
      arrays = arrays.concat(it)
    })
    for (var i = 0; i < arrays.length; i++) {
      if (!(comparator(arrays[i], arrays[i + 1]))) {
        arr.push(arrays[i])
        arr.push(arrays[i + 1])
      }
    }

  }
  ,
  uniq: function (array) {
    a = new Set()
    array.forEach(it => {
      a.add(it)
    })
    return a
  }
  ,
  uniqBy: function (array, iteratee = _.identity) {
    var a = new Set()
    var b = new Set()
    if (typeof (iteratee) == 'function') {
      array.forEach((it) => {
        if (!(a.has(iteratee(it)))) {
          a.add(it[iteratee])
          b.add(it)
        }
      })
    }
    array.forEach((it) => {
      if (!(it[iteratee])) {
        a.add(it[iteratee])
        b.add(it)
      }
    })
    return [...b]
  }
  ,


  uniqWith: function (array, [comparator]) {
    var a = []
    var b = array.shift()
    var c = array.shift()
    if (array.length == 0) {
      return array
    }
    if (!comparator(b, c)) {
      a.push(c)
    }


  }
  ,
  zip: function (arrays) {
    var array = [...arguments]


    if (array[0].length == 0) {
      return []
    }
    var a = []
    var b = []
    array.forEach((it) => {
      b.push(it.shift())
    })
    a.push(b)

    a = a.concat(xxj04.zip(...array))
    return a
  }
  ,
  unzip: function (array) {
    if (array[0].length == 0) {
      return []
    }
    var a = []
    var b = []
    array.forEach((it) => {
      b.push(it.shift())
    })
    a.push(b)

    a = a.concat(xxj04.unzip(array))
    return a
  }

  ,
  unzipWith: function (array, [iteratee = _.identity]) {
    var a = array.pop()
    var aa = []
    array.forEach((it) => {
      a.forEach((item) => {
        aa.push(iteratee(it, item))
      })
    })
    return aa
  }

  ,


  without: function (array, ...values) {
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < values.length; j++) {
        if (it == item) {
          array.splice(i, 1)
          i--

        }
      }
    }
    return array
  }
  ,
  xor: function (...arrays) {
    var a = arrays.pop()
    arrays = xxj04.flattenDeep(arrays)
    var b = {}
    var c = []
    for (var i = 0; i < arrays.length; i++) {
      for (var j = 0; j < a.length; j++) {
        if (a[j] in b) {
          b[a[j]]++
        }
        if (arrays[i] in b) {
          b[arrays[i]]++
        }
        if (!(arrays[i] in b)) {
          b[arrays[i]] = 1
        }
        if (!(a[j] in b)) {
          b[a[j]] = 1
        }
        i++
      }
    }
    for (k in b) {
      if (b[k] == 1) {
        c.push(b[k])
      }
    }
    return c
  }
}

