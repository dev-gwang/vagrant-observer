var fs          = require("fs");
spawn 		= require('child_process').spawn,
out 		= fs.openSync("./agent/output.log", 'a'),
err 		= fs.openSync("./agent/output.log", 'a')
var exec 	= require('child_process').exec;


child = spawn('/usr/local/bin/python3.8', [
                'agent/server.py'
            ],
            {
                stdio: [ 'ignore', out, err, 'pipe' ] // piping stdout and stderr to out.log
            }
);

child.on("error", e => console.log("p2 error:", e));
child.on("exit", (code, signal) => 
            console.info(signal)
);
