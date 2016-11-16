var fs = require('fs');
    
function run (generator) {
  var it = generator(go);
  
  function go (err, result) {
    if (err) {
      it.next([null]);
    } else {
      it.next(result);
    }
  }
  go();  
}

run(function* (done) {
  var dirFiles = yield fs.readdir('NoNoNoNo', done); // No such dir
  var firstFile = dirFiles[0]; // TypeError: Cannot read property '0' of undefined
  console.log(firstFile);
});
