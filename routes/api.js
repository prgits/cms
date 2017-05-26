module.exports = function (app, passport) {
  // Test server is working (GET http://localhost:3001/api)
  app.get("/api", function (req, res) {
    res.json({message: "Hi, welcome to the server api!@@"});
  });
//  Logout api.  For illustration purpose we show how to check if the request is from an authorized user by
//  verifying the jwt token included in the request header.  The same approach can be used to restrict access
//  to other (more intersting) API calls.

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
    }, {"id": 5, "color": "test", "sprocketCount": 2, "owner": "Thinhnv"},
      {"id": 6, "color": "Don't Know", "sprocketCount": 6, "owner": "Nguyen Viet Thinh"}];
    setTimeout(function () {
      res.json(data)
    }, 5000);
  });

  app.get('/api/loadInfo', function (req, res) {
    res.json({
      message: 'This came from the api server',
      time: Date.now()
    });
  });

  app.get('/api/loadAuth', function (req, res) {
    // const user = {
    //     name: req.body.name
    // };
    // req.session.user = user;
    console.log(Promise.resolve(req.session.user || null));
    res.json(null);
  });

  app.post('/api/login', function (req, res) {
    const user = {
      name: req.body.name
    };
    req.session.user = user;
    return res.json(Promise.resolve(user));
  });

  app.get('/api/logout', function (req, res) {
    res.json(new Promise((resolve) => {
      req.session.destroy(() => {
        req.session = null;
        return resolve(null);
      });
    }))
  });
  // Comment
  // This should be well-guarded secret on the server (in a file or database).
//     var JWT_SECRET = "JWT Rocks!";

// JWT based login service.
//     app.post("/api/login", function(req, res) {
//         console.log("Requesting /api/login ...");
//
//         const credentials = req.body;
//
//         // In real world credentials should be authenticated against database.
//         // For our purpose it's hard-coded:
//         if (credentials.user === "admin" && credentials.password === "password") {
//             // Once authenticated, the user profiles is signed and the jwt token is returned as response to the client.
//             // It's expected the jwt token will be included in the subsequent client requests.
//             const profile = { user: credentials.user, role: "ADMIN" };
//             const jwtToken = jwt.sign(profile, JWT_SECRET, { expiresIn: 5 * 60 }); // expires in 300 seconds (5 min)
//             res.status(200).json({
//                 id_token: jwtToken
//             });
//
//             alertClients("info", `User '${credentials.user}' just logged in`);
//         } else {
//             res.status(401).json({ message: "Invalid user/password" });
//
//             alertClients("error", `User '${credentials.user}' just failed to login`);
//         }
//     });

// Alerts all clents via socket io.
//     function alertClients(type, msg) {
//         console.log("SocketIO alerting clients: ", msg);
//         io.sockets.emit("alert", { message: msg, time: new Date(), type });
//     }

  /**
   * Util function to extract jwt token from the authorization header
   */
  // function extractToken(req) {
  //     if (
  //       req.headers.authorization &&
  //       req.headers.authorization.split(" ")[0] === "Bearer"
  //     ) {
  //         return req.headers.authorization.split(" ")[1];
  //     }
  //     return null;
  // }

};