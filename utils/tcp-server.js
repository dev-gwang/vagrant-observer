var fs          = require("fs");
// spawn 		= require('child_process').spawn;
out 		= fs.openSync("./agent/output.log", 'a'),
err 		= fs.openSync("./agent/output.log", 'a')
logging     = require("../utils/logger");
// var exec 	= require('child_process').exec;
// function on_child_stdout(data) {
//     console.log(data.toString());
//   };

var spawn = require('child_process').spawn, ls = spawn('/usr/local/bin/python3.8', [
    'agent/server.py'
]
);
 
ls.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
    logging.info("", data);
});
 
ls.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
});
 
ls.on('exit', function(code) {
    console.log('exit: ' + code);
});

// child = spawn('/usr/local/bin/python3.8', [
//                 'agent/server.py'
//             ],
//             {
//                 stdio: [ 'ignore', out, err, 'pipe' ] // piping stdout and stderr to out.log
//             }
// );

// child.on('stdout', on_child_stdout);
// child.on("error", e => console.log("p2 error:", e));
// child.on("exit", (code, signal) => 
//             console.info(signal)
// );
