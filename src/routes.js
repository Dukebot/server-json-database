const DailyStats = require('./model/daily_stats');
const daily_stats = new DailyStats();

exports.set = function (app) {

    app.get('/', function (req, res) {
        res.send("Wellcome to the entry point!"); 
    });

    // Daily Stats
    {
        app.get('/daily_stats_template', function (req, res) {
            res.send(daily_stats.item_template);
        });
    
        app.get('/daily_stats/:day', function (req, res) {
            const day = req.params.day;
            res.send(daily_stats.get(day));
        });

        app.get('/daily_stats_averages/:date_from/:date_to', function (req, res) {
            console.log("daily_stats_averages params", req.params);
            
            let { date_from, date_to } = req.params;
            if (date_from == 'undefined') date_from = undefined;
            if (date_to == 'undefined') date_to = undefined;

            res.send(daily_stats.getAverages(date_from, date_to));
        });

        app.delete('/daily_stats/:day', function (req, res) {
            const day = req.params.day;
            const deleted = daily_stats.delete(day);
            res.send({ deleted });
        });
    
        app.route('/daily_stats')
            .get(function (req, res) {
                res.send(daily_stats.getAll());
            })
            .put(function (req, res) {
                const item_created = daily_stats.create(req.body.day);
                res.send({
                    created: true,
                    item: item_created
                });
            })
            .post(function (req, res) {
                console.log("req.body", req.body)
                const item_updated = daily_stats.update(req.body.data, req.body.day);
                res.send({
                    updated: true,
                    item: item_updated
                });
            });
    }
};