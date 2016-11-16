function askFoo () {
  return new Promise(function (resolve, reject) {
    resolve('foo');
  });
}

function run (generator) {
  var it = generator();
  function go(result, error) {
    var promise;
    if (error) {
      it.throw(error);
    }
    promise = it.next(result);
    if (promise.done === false) {
      promise.value.then(function (data) {
        go(data);
      }, function (error) {
        go(undefined, data);
      });
    }
  }
  go();
}

run(function* () {
  // improve: errors?
  var foo = yield askFoo();
  console.log(foo);
});

