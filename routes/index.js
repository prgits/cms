var jwt = require("jsonwebtoken");
var Bbs = require('../persister/bbs');

module.exports = function (app, passport) {

  app.get("/api/", function(req, res) {
    res.json({ message: "Hi, welcome to the server api!" });
  });

// This should be well-guarded secret on the server (in a file or database).
  var JWT_SECRET = "JWT Rocks!";

// JWT based login service.
  app.post("/api/login", function(req, res) {
    console.log("Requesting /api/login ...");

    const credentials = req.body;

    // In real world credentials should be authenticated against database.
    // For our purpose it's hard-coded:
    if (credentials.user === "admin" && credentials.password === "password") {
      // Once authenticated, the user profiles is signed and the jwt token is returned as response to the client.
      // It's expected the jwt token will be included in the subsequent client requests.
      const profile = { user: credentials.user, role: "ADMIN" };
      const jwtToken = jwt.sign(profile, JWT_SECRET, { expiresIn: 5 * 60 }); // expires in 300 seconds (5 min)
      res.status(200).json({
        id_token: jwtToken
      });

      alertClients("info", `User '${credentials.user}' just logged in`);
    } else {
      res.status(401).json({ message: "Invalid user/password" });

      alertClients("error", `User '${credentials.user}' just failed to login`);
    }
  });

// Alerts all clents via socket io.
  function alertClients(type, msg) {
    console.log("SocketIO alerting clients: ", msg);
    io.sockets.emit("alert", { message: msg, time: new Date(), type });
  }

  /**
   * Util function to extract jwt token from the authorization header
   */
  function extractToken(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    return null;
  }

//  Logout api.  For illustration purpose we show how to check if the request is from an authorized user by
//  verifying the jwt token included in the request header.  The same approach can be used to restrict access
//  to other (more intersting) API calls.
  app.post("/api/logout", function(req, res) {
    console.log("Requesting /api/logout ...");

    var jwtToken = extractToken(req);
    try {
      var profile = jwt.verify(jwtToken, JWT_SECRET);
      res.status(200).json({ message: `User ${profile.user} logged out` });

      alertClients("info", `User '${profile.user}' just logged out`);
    } catch (err) {
      console.log("jwt verify error", err);
      res.status(500).json({ message: "Invalid jwt token" });

      alertClients("error", `JWT verify error`);
    }
  });

    app.get('/api/v1/cars', function (req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        res.send([
            {
                id: 1,
                name: 'Honda Accord Crosstour',
                year: '2010',
                model: 'Accord Crosstour',
                make: 'Honda',
                media: 'http://media.ed.edmunds-media.com/honda/accord-crosstour/2010/oem/2010_honda_accord-crosstour_4dr-hatchback_ex-l_fq_oem_4_500.jpg',
                price: '$16,811'

            },
            {
                id: 2,
                name: 'Mercedes-Benz AMG GT Coupe',
                year: '2016',
                model: 'AMG',
                make: 'Mercedes Benz',
                media: 'http://media.ed.edmunds-media.com/mercedes-benz/amg-gt/2016/oem/2016_mercedes-benz_amg-gt_coupe_s_fq_oem_1_717.jpg',
                price: '$138,157'

            },
            {
                id: 3,
                name: 'BMW X6 SUV',
                year: '2016',
                model: 'X6',
                make: 'BMW',
                media: 'http://media.ed.edmunds-media.com/bmw/x6/2016/oem/2016_bmw_x6_4dr-suv_xdrive50i_fq_oem_1_717.jpg',
                price: '$68,999'
            },
            {
                id: 4,
                name: 'Ford Edge SUV',
                year: '2016',
                model: 'Edge',
                make: 'Ford',
                media: 'http://media.ed.edmunds-media.com/ford/edge/2016/oem/2016_ford_edge_4dr-suv_sport_fq_oem_6_717.jpg',
                price: '$36,275'
            },
            {
                id: 5,
                name: 'Dodge Viper Coupe',
                year: '2017',
                model: 'Viper',
                make: 'Dodge',
                media: 'http://media.ed.edmunds-media.com/dodge/viper/2017/oem/2017_dodge_viper_coupe_acr_fq_oem_3_717.jpg',
                price: '$123,890'
            }
        ]);
    });

    app.get('/api/connect-async', function (req, res) {
        // res.header('Access-Control-Allow-Origin', '*');
        var data = [{"id": 1, "color": "Red", "sprocketCount": 7, "owner": "John"}, {
            "id": 2,
            "color": "Taupe",
            "sprocketCount": 1,
            "owner": "George"
        }, {"id": 3, "color": "Green", "sprocketCount": 8, "owner": "Ringo"}, {
            "id": 4,
            "color": "Blue",
            "sprocketCount": 2,
            "owner": "Paul"
        }, {"id": 5, "color": "test", "sprocketCount": 2, "owner": "Thinhnv"}];
        setTimeout(function () {
            res.send(data)
        }, 3000);
    });

    app.get('/api/widget/load/param1/param2', function (req, res) {
        // res.header('Access-Control-Allow-Origin', '*');
        var data = [{"id": 1, "color": "Red", "sprocketCount": 7, "owner": "John"}, {
            "id": 2,
            "color": "Taupe",
            "sprocketCount": 1,
            "owner": "George"
        }, {"id": 3, "color": "Green", "sprocketCount": 8, "owner": "Ringo"}, {
            "id": 4,
            "color": "Blue",
            "sprocketCount": 2,
            "owner": "Paul"
        }, {"id": 5, "color": "test", "sprocketCount": 2, "owner": "Thinhnv"}];
        setTimeout(function () {
            res.send(data)
        }, 3000);
    });

    app.get('/api/loadInfo', function (req, res) {
        res.send({
            message: 'This came from the api server',
            time: Date.now()
        });
    });

    app.get('/api/loadAuth', function (req, res) {
        const user = {
            name: req.body.name
        };
        req.session.user = user;
        res.send(req.session.user || null);
    });

    // app.post('/api/login', function (req, res) {
    //     const credentials = req.body;
    //     if (credentials.userName === 'admin@example.com' && credentials.password === 'password') {
    //         res.json({
    //             userName: credentials.userName,
    //             role: 'ADMIN'
    //         });
    //     } else {
    //         // just demonstration of server-side validation
    //         res.status('401').send({
    //             message: 'Invalid user/password',
    //             // userName - the same field name as used in form on client side
    //             validationErrors: {
    //                 userName: 'Aha, server-side validation error',
    //                 password: 'Use another password'
    //             }
    //         });
    //     }
    // });

    /* GET home page. */
    app.get('/', isAuthenticated, function (req, res) {
        res.redirect('/readme');
    });

    // app.post('/login', passport.authenticate('login', {
    //     successRedirect: '/readme',
    //     failureRedirect: '/login',
    //     failureFlash: true
    // }));

    // app.get('/login', function (req, res) {
    //     res.render('template/login', {message: req.flash('message')});
    // });

    // app.get('/logout', function (req, res) {
    //     req.logout();
    //     res.redirect('/');
    // });


    app.get('/signup', function (req, res) {
        res.render('template/signup', {message: req.flash('message')});
    });

    /* Handle Registration POST */
    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/login',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    app.get('/readme', isAuthenticated, function (req, res) {
        res.render('template/readme', {});
    });
    app.get('/dashboard', isAuthenticated, function (req, res) {
        res.render('template/index', {});
    });
    app.get('/flot', isAuthenticated, function (req, res) {
        res.render('template/flot', {});
    });
    app.get('/morris', isAuthenticated, function (req, res) {
        res.render('template/morris', {});
    });
    app.get('/tables', isAuthenticated, function (req, res) {
        res.render('template/tables', {});
    });
    app.get('/forms', isAuthenticated, function (req, res) {
        res.render('template/forms', {});
    });
    app.get('/panelswells', isAuthenticated, function (req, res) {
        res.render('template/panelswells', {});
    });
    app.get('/buttons', isAuthenticated, function (req, res) {
        res.render('template/buttons', {});
    });
    app.get('/notifications', isAuthenticated, function (req, res) {
        res.render('template/notifications', {});
    });
    app.get('/typography', isAuthenticated, function (req, res) {
        res.render('template/typography', {});
    });
    app.get('/icons', isAuthenticated, function (req, res) {
        res.render('template/icons', {});
    });
    app.get('/grid', isAuthenticated, function (req, res) {
        res.render('template/grid', {});
    });
    app.get('/blank', isAuthenticated, function (req, res) {
        res.render('template/blank', {});
    });

    app.get('/bbs', isAuthenticated, function (req, res) {
        res.render('template/bbs', {});
    });

    app.get('/bbs/list', isAuthenticated, function (req, res) {
        Bbs.find({},
            function (err, bbs) {
                // In case of any error, return using the done method
                if (err)
                    return done(err);
                // Username does not exist, log error & redirect back
                res.send(bbs);
            }
        );
    });

    app.post('/bbs/create', isAuthenticated, function (req, res) {

        var newBbs = new Bbs();
        // set the user's local credentials
        newBbs.content = req.param('content');
        newBbs.vote = 0;
        newBbs.username = req.user.username;

        // save the user
        newBbs.save(function (err) {
            if (err) {
                console.log('Error in Saving bbs: ' + err);
                res.send({"result": false});
            }
            res.send({"result": true});
        });
    });

    app.post('/bbs/delete', isAuthenticated, function (req, res) {
        // set the user's local credentials
        var id = req.param('id');
        Bbs.findByIdAndRemove(id, function (err) {
            if (err) {
                console.log('Error in Saving bbs: ' + err);
                res.send({"result": false});
            }


            res.send({"result": true});
        })


    });
    app.post('/bbs/update', isAuthenticated, function (req, res) {
        // set the user's local credentials
        var id = req.param('id');

        Bbs.findById(id, function (err, bbs) {
            if (err) {
                console.log('Error in Saving bbs: ' + err);
                res.send({"result": false});
            }
            bbs.vote += 1;
            bbs.save(function () {
                res.send({"result": true});
            })

        })
    });
}
// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}



