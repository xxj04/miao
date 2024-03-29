var xxj04 = {
  predicate: (predicate) => {
    // 如果predicate是函数
    if (typeof (predicate) == 'function') {
      return predicate
    }
    // 如果predicate是数组
    if (Array.isArray(predicate)) {
      var key = predicate[0]
      var value = predicate[1]
      return obj => obj[key] == value
    }
    // 如果predicate是对象
    if (typeof (predicate) == 'object') {
      // 目标是返回一个函数
      return obj => {
        // 判断obj是否在predicate里面
        for (let key in obj) {
          var val1 = obj[key]
          var val2 = predicate[key]
          if (!(key in predicate)) {
            return false
          } else {
            if (!(val1 == val2)) {
              return false
            }
          }
        }
        for (let key in predicate) {
          var val1 = obj[key]
          var val2 = predicate[key]
          if (!(key in obj)) {
            return false
          } else {
            if (!(val1 == val2)) {
              return false
            }
          }
        }
        return true
      }
    }
    if (typeof (predicate) == 'string') {
      return obj => obj[predicate]
    }
  }
  ,
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
    path = xxj04.toPath(path)
    for (var key of path) {
      if (obj != undefined) {
        obj = obj[key]
      } else {
        return defaultValue
      }
    }
    return obj ?? defaultValue
  }
  ,

  isMath: function (object, source) {
    for (key of source) {
      if (typeof source[key] === 'object') {
        if (!xxj04.isMath(object[key], source[key])) {
          return false
        }
      }
      else {
        if (object[key] !== source[key]) {
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
    let result = 0
    iteratee = xxj04.iteratee(iteratee)

    for (var i = 0; i < array.length; i++) {
      result += iteratee(array[i]) * 1
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
    iteratee = xxj04.iteratee(iteratee)
    values.forEach((it) => {
      array.forEach((item, i) => {
        if (iteratee(it) == iteratee(item)) {
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
    return b


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
    return Array.from(new Set(array))


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
    return Array.from(b)
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
  unionBy: function (...arrays) {

    var itr = arrays.pop()
    var a = new Set()
    var b = []
    iteratee = xxj04.iteratee(itr)
    arrays.forEach((item) => {
      for (var i = 0; i < item.length; i++) {
        if (a.has(iteratee(item[i]))) {
          return
        }
        a.add(iteratee(item[i]))
        b.push(item[i])
      }

    })



    return b
  }
  ,
  unionWith: function (...array) {

    var comparator = array.pop()
    array = array.flat()
    var a = []
    for (var i = 0; i < array.length; i++) {
      var keep = true
      for (j = 0; j < a.length; j++) {
        if (comparator(array[i], a[j])) {
          keep = false
          break
        }
      }
      if (keep)
        a.push(array[i])
    }
    return a

  }
  ,
  uniq: function (array) {
    return Array.from(new Set(array))

  }
  ,
  uniqBy: function (array, iteratee = _.identity) {
    var a = new Set()
    var b = new Set()
    iteratee = xxj04.iteratee(iteratee)

    array.forEach((it) => {
      if (!(a.has(iteratee(it)))) {
        a.add(iteratee(it))
        b.add(it)
      }
    })

    return Array.from(b)
  }
  ,


  uniqWith: function (array, comparator) {
    var a = []
    for (var i = 0; i < array.length; i++) {
      var keep = true
      for (j = 0; j < a.length; j++) {
        if (comparator(array[i], a[j])) {
          keep = false
          break
        }
      }
      if (keep)
        a.push(array[i])
    }
    return a

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
  unzipWith: function (array, iteratee = _.identity) {
    iteratee = xxj04.iteratee(iteratee)
    var result = []
    var arr = array[0]
    var arr1 = array[1]
    for (it of arr) {
      for (itme of arr1) {
        result.push(iteratee(it, itme))
      }
    }
    return result
  }

  ,

  zipObject: function (props = [], values = []) {
    var result = {}
    for (var i = 0; i < props.length; i++) {
      result[props[i]] = values[i]
    }
    return result
  }

  ,
  zipObjectDeep: function (props = [], values = []) {


  }
  ,
  zipWith: function (arrays, iteratee = _.identity) {


  }
  ,
  toPath: function (pathString) {
    if (typeof pathString == 'string') {
      var result = pathString.split(/\.|   \[   |   \]   \.|   \]\[    |   \]/)
      if (result.at(-1) == '') {
        result.pop()
      }
      if (result.at(0) == '') {
        result.shift()
      }
      return result
    }
    return pathString
  }
  ,
  without: function (array, ...values) {
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < values.length; j++) {
        if (array[i] == values[j]) {
          array.splice(i, 1)
          i--

        }
      }
    }
    return array
  }
  ,
  xor: function (...arrays) {
    var result = []
    var dict = new Map()
    arrays = arrays.flat()
    for (var x of arrays) {
      if (dict.has(x)) {
        let val = dict.get(x) + 1

        dict.set(x, val)
      }
      else {
        dict.set(x, 1)
      }
    }
    for (var i of dict) {
      if (i[1] == 1) {
        result.push(i[0] * 1)
      }
    }

    return result
  }
  ,

  xorBy: function (arrays, iteratee = _.identity) {
    var arrays = [...arguments]
    var it = arrays.pop()
    iteratee = xxj04.iteratee(it)
    var result = []
    arrays = arrays.flat()
    for (var i of arrays) {
      var xx = 0
      for (var j of arrays) {
        if (iteratee(i) == iteratee(j)) {
          xx++

        }

      }
      if (xx == 1) {
        result.push(i)
      }
    }
    return result
  }

  ,




  xorWith: function (arrays, comparator) {
    var array = [...arguments]
    var comparator = array.pop()

    var result = []
    var arr = array.filter((it, idx) => idx != 0)
    array = array[0].concat(...arr)
    for (var i of array) {
      var xx = 0
      for (var j of array) {
        if (comparator(i, j)) {
          xx++

        }

      }
      if (xx == 1) {
        result.push(i)
      }
    }
    return result
  }
  ,
  countBy: function (collection, iteratee = _.identity) {
    iteratee = xxj04.iteratee(iteratee)
    var result = {}
    for (var x of collection) {
      if (result[iteratee(x)]) {
        result[iteratee(x)]++
      }
      else {
        result[iteratee(x)] = 1
      }
    }
    return result
  }

  ,


  forEach: function (collection, iteratee = _.identity) {
    iteratee = xxj04.iteratee(iteratee)
    if (Array.isArray(collection)) {

      for (var i = 0; i < collection.length; i++) {
        if (iteratee(collection[i])) {
          return iteratee(collection[i])
        }
      }
    }
    else {
      for (var k in collection) {
        if (iteratee(k, collection[k])) {
          return iteratee(k, collection[k])
        }
      }
    }
    return collection
  }
  ,



  forEachRight: function (collection, iteratee = _.identity) {
    iteratee = xxj04.iteratee(iteratee)

    for (var i = collection.length - 1; 0 <= i; i--) {
      if (iteratee(collection[i])) {
        return iteratee(collection[i])
      }
    }

    return collection
  }
  ,
  every: function (collection, predicate = _.identity) {
    predicate = xxj04.predicate(predicate)
    for (var x of collection) {
      if (!predicate(x)) {
        return false
      }
    }
    return true
  }

  ,
  filter: function (collection, predicate = _.identity) {
    predicate = xxj04.predicate(predicate)
    var result = []
    for (var x of collection) {
      if (predicate(x)) {
        result.push(x)
      }
    }
    return result
  }

  ,


  find: function (collection, predicate = _.identity, fromIndex = 0) {
    var result = []
    predicate = xxj04.predicate(predicate)
    for (var i = fromIndex; i < collection.length; i++) {
      if (predicate(predicate[i])) {
        result.push(predicate[i])
      }
    }
    if (result.length == 0) {
      return undefined
    }
    return result
  }

  ,

  findLast: function (collection, predicate = _.identity, fromIndex = collection.length - 1) {
    for (var i = fromIndex; 0 <= i; i--) {
      if (predicate(collection[i])) {
        return collection[i]
      }
    }

    return undefined

  }

  ,

  flatMap: function (collection, iteratee = _.identity) {

    var result = []
    iteratee = xxj04.iteratee(iteratee)
    for (var j of collection) {
      result.push(iteratee(j))
    }
    return xxj04.flattenDeep(result)
  }
  ,

  flatMapDeep: function (collection, iteratee = _.identity) {
    var result = []
    iteratee = xxj04.iteratee(iteratee)
    for (var j of collection) {
      result.push(iteratee(j))
    }
    return xxj04.flattenDeep(result)
  }

  ,


  flatMapDepth: function (collection, iteratee = _.identity, depth = 1) {
    var result = []
    iteratee = xxj04.iteratee(iteratee)
    for (var j of collection) {
      result.push(iteratee(j))
    }
    return xxj04.flattenDepth(result, depth)
  }
  ,


  groupBy: function (collection, iteratee = _.identity) {
    var result = {}
    iteratee = xxj04.iteratee(iteratee)
    for (var x of collection) {
      if (result[iteratee(x)]) {
        result[iteratee(x)].push(x)
      }
      else {
        result[iteratee(x)] = [x]
      }
    }
    return result
  }
  ,

  includes: function (collection, value, fromIndex = 0) {

    if (typeof collection == 'string' || Array.isArray(collection)) {
      if (fromIndex >= 0) {

        for (var i = fromIndex; i < collection.length; i++) {
          if (collection[i] == value) {
            return true
          }
        }
      }
      else {
        for (var i = fromIndex + collection.length; i >= 0; i--) {
          if (collection[i] == value) {
            return true
          }
        }
      }
    }
    else {
      for (var x in collection) {
        if (collection[x] === value) {
          return true
        }
      }
    }
    return false
  }

  ,

  invokeMap: function (collection, path, args) {
    path = xxj04.iteratee(path)
    var result = []
    for (var x of collection) {
      result.push(path(x, args))
    }
    return result
  }

  ,



  keyBy: function (collection, iteratee = _.identity) {
    iteratee = xxj04.iteratee(iteratee)
    var result = {}
    for (var x of collection) {
      result[iteratee(x)] = x
    }
    return result
  }

  ,


  map: function (collection, iteratee = _.identity) {
    iteratee = xxj04.iteratee(iteratee)
    var result = []
    if (Array.isArray(collection)) {

      for (var i = 0; i < collection.length; i++) {
        result.push(iteratee(collection[i], i, collection))
      }
    }
    else {

      for (var x in collection) {
        result.push(iteratee(collection[x], x, collection))
      }
    }


    return result
  }

  ,


  partition: function (collection, predicate = _.identity) {
    predicate = xxj04.predicate(predicate)
    var truelist = []
    var falselist = []
    for (let x of collection) {
      if (predicate(x)) {
        truelist.push(x)
        continue
      }
      falselist.push(x)
    }

    return [truelist, falselist]
  }

  ,

  reduce: function (collection, iteratee = _.identity, accumulator = 0) {
    iteratee = xxj04.iteratee(iteratee)

    var result = accumulator

    if (Array.isArray(collection)) {

      for (var i = 0; i < collection.length; i++) {
        result = iteratee(result, collection[i], i, collection)
      }
    }
    else {

      for (var x in collection) {
        result = (iteratee(result, collection[x], x))
      }
    }


    return result
  }
  ,
  reduceRight(collection, iteratee = _.identity, accumulator = 0) {
    iteratee = xxj04.iteratee(iteratee)
    var result = accumulator
    for (var i = collection.length - 1; 0 <= i; i--) {
      result = iteratee(result, collection[i], i, collection)
    }
    return result

  }
  ,
  reject: function (collection, predicate = _.identity) {
    predicate = xxj04.predicate(predicate)
    var result = []
    for (let x of collection) {
      if (!predicate(x)) {
        result.push(x)
      }
    }
    return result
  }
  ,


  sample: function (collection) {
    var idx = Math.floor(Math.random() * collection.length)
    return collection[idx]
  }
  ,

  sampleSize: function (collection, n = 1) {
    var result = []
    var idx
    if (n > collection.length) {
      n = collection.length
    }
    while (n) {
      idx = Math.floor(Math.random() * collection.length)

      result.push(collection[idx])
      n--
    }
    return result
  }


  ,

  shuffle: function (collection) {
    var result = []
    var idx
    var c = collection.map(it => it)
    while (c.length) {
      idx = Math.floor(Math.random() * c.length)
      result.push(c[idx])
      c.splice(idx, 1)
    }
    return result
  }
  ,

  size: function (collection) {
    return xxj04.reduce(collection, it => it + 1)
  }

  ,


  some: function (collection, predicate = _.identity) {
    predicate = xxj04.predicate(predicate)
    for (var x of collection) {
      if (predicate(x)) {
        return true
      }
    }
    return false
  }
  ,
  sortBy: function (collection, iteratees = [_.identity]) {
    iteratee = xxj04.iteratee(iteratees)
    for (var i = 0; i < collection.length; i++) {
      for (var j = collection.length; i < j; j--) {
        if (iteratee(collection[i]) > iteratee(collection[j])) {
          xxj04.swap(collection, i, j)
        }
      }
    }
    return collection
  }
  ,
  curry: function (fun) {
    return function curriedFn(...args) {

      if (args.length < fun.length) {
        return function () {
          return curriedFn(...args.concat(Array.from(arguments)))
        }
      }
      return fun(...args)
    }


  }
  ,
  castArray: function (value) {
    if (Array.isArray(value)) {
      return value
    }
    return [value]
  }
  ,
  clone: function (value) {

  }

  ,



  conformsTo: function (object, source) {
    predicate = xxj04.predicate(source)
    

    var val = true
    if (!predicate(object)) {
      val = false
    }
    return val
  }
  ,
  eq: function (value, other) {
    if (Array.isArray(value) && Array.isArray(other)) {
      for (var i of value) {
        for (var j of other) {
          if (i != j) {
            return false
          }
        }
      }
    }
    if (typeof value != typeof other) {
      return false
    }
    return true
  }

  ,
  ceil: function (number, precision = 0) {
    if (precision == 0) {
      number = Math.floor(number) + 1
    }
    if (precision > 0) {
      number = number.toFixed(precision) * 1 + 1 / (10 ** precision)
    }
    if (precision < 0) {
      number = Math.floor((number / (10 ** Math.abs(precision)) + 1)) * (10 ** Math.abs(precision))
    }
    return number


  }



  ,

  floor: function (number, precision = 0) {
    return Math.floor(number * Math.pow(10, precision)) / Math.pow(10, precision);
  }
  ,
























































  parseJSON: function (str) {
    var i = 0

    return value()
    function value() {
      var a = str[i]
      if (a == '{') {
        return parseobj()
      }
      if (a == '[') {
        return parsearr()
      }
      if (a == '"') {
        return parsestr()
      }
      if (a == 't') {
        var token = str.slice(i, i + 4)
        if (token == 'true') {
          i += 4
          return true
        }
        else {
          return new SyntaxError(`错误在${i}`)
        }
      }
      if (a == 'f') {
        var token = str.slice(i, i + 5)
        if (token == 'false') {
          i += 5
          return false
        }
        else {
          return new SyntaxError(`错误在${i}`)
        }
      }
      if (a == 'n') {
        var token = str.slice(i, i + 4)
        i += 4
        if (token == 'null') {
          return null
        }
        else {
          return new SyntaxError(`错误在${i}`)
        }
      }

      return parsenum()
    }


    function parsenum() {
      var start = i
      while (str[i] <= '9' && str[i] >= '0') {
        i++
      }
      return Number(str.slice(start, i))
    }

    function parseobj() {
      let result = {}
      i++
      去空白()
      // 判断是否是  }  如果是返回
      if (str[i] == '}') {
        i++
        return result
      }

      while (i < str.length) {
        // 调用获取key
        let key = parsestr()
        去空白()
        i++
        去空白()
        let val = value()
        result[key] = val
        if (str[i] == ',') {
          i++
          continue
        }
        if (str[i] == '}') {
          i++
          break
        }
      }
      return result
    }

    function parsearr() {
      let result = []
      i++
      if (str[i] == ']') {
        i++
        return result
      }
      while (i < str.length) {
        let val = value()
        result.push(val)
        if (str[i] == ',') {
          i++
          continue
        }
        if (str[i] == ']') {
          i++
          break
        }
      }
      return result
    }

    function parsestr() {
      i++
      let start = i
      while (str[i] != '"' && i < str.length) {
        i++
      }
      if (str[i] != '"') {
        return new SyntaxError(`错误在${start}`)
      }
      let end = i
      i++
      return str.slice(start, end)
    }

    function 去空白() {
      while (str[i] == ' ' || str[i] == '\n' || str[i] == '\t' || str[i] == '\r') {
        i++
      }
      return
    }
  }
}
