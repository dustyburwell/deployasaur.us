var travis = module.exports = {};

var pending = [];

travis.notify = function (req, res, next) {
  if (pending.length) {
    pending[0].next();

    for (var i = pending.length - 1; i >= 1; i--) {
      pending[i].res.send("");
    };
  }

  pending = [];
  next();
};

travis.deploy = function (req, res, next) {
  res.locals.app = "adunkman";
  res.locals.key = "818193c0a8edd289d284a155b0e112ca";
  res.locals.branch = "master";

  res.writeHead(200);

  pending.push({
    res: res,
    next: next
  });
};

var keepalive = function () {
  for (var i = pending.length - 1; i >= 0; i--) {
    pending[i].res.write(" ");
  };

  setTimeout(keepalive, 20000);
};

keepalive();