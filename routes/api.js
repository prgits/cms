module.exports = function (app, passport) {
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
        }, {"id": 5, "color": "test", "sprocketCount": 2, "owner": "Thinhnv"},
            {"id": 6, "color": "Don't Know", "sprocketCount": 6, "owner": "NVT"}];
        setTimeout(function () {
            res.send(data)
        }, 5000);
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

    app.post('/api/login', function (req, res) {
        const credentials = req.body;
        if (credentials.userName === 'admin@example.com' && credentials.password === 'password') {
            res.json({
                userName: credentials.userName,
                role: 'ADMIN'
            });
        } else {
            // just demonstration of server-side validation
            res.status('401').send({
                message: 'Invalid user/password',
                // userName - the same field name as used in form on client side
                validationErrors: {
                    userName: 'Aha, server-side validation error',
                    password: 'Use another password'
                }
            });
        }
    });
};