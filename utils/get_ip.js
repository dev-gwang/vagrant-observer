
var calc = {};
calc.get_ip = function(req){
    const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
    return ip;
}
 
module.exports = calc;