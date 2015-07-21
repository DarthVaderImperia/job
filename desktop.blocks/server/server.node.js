modules.require(['twitter'], function(twitter) {

var fs = require('fs'),
    PATH = require('path'),
    VM = require('vm'),
    express = require('express'),
    app = express(),
    url = require('url'),
    querystring = require('querystring'),
    Vow = require('vow'),
    pathToBundle = PATH.join('.', 'desktop.bundles', 'index');

app.use(express.static(pathToBundle));

var bemtreeTemplate = fs.readFileSync(PATH.join(pathToBundle, 'index.bemtree.js'), 'utf-8');
var BEMHTML = require(PATH.join('../../' + pathToBundle, 'index.bemhtml.js')).BEMHTML;

var context = VM.createContext({
    console: console,
    Vow: Vow
});

VM.runInContext(bemtreeTemplate, context);
var BEMTREE = context.BEMTREE;
var dataEntries = [];

app.get('/sort', function(req, res){
    switch(req.query.order){
        case 'up':
            dataEntries.sort(function(a, b) {
                return b[req.query.sort].valueOf() > a[req.query.sort].valueOf() ? 1 : -1;
            });
            break;
        case 'down':
            dataEntries.sort(function(a, b) {
                return b[req.query.sort].valueOf() < a[req.query.sort].valueOf() ? 1 : -1;
            });
            break;
    }
    
    // Формируем BEMJSON из ответов с помощью BEMTREE шаблонов
    BEMTREE.apply(dataEntries.map(function(dataEntry) {
        return {
            block: 'row',
            data: dataEntry,
        };
    }))
    .then(function(bemjson) {
        res.end(BEMHTML.apply(bemjson));
    });
});

app.get('/search', function(req, res) {

    var searchObj = url.parse(req.url, true).query,
        queryString = querystring.escape(searchObj.query),
        servicesEnabled = [];

    searchObj.twitter && servicesEnabled.push(twitter.get(queryString));

    Vow.all(servicesEnabled)
        .then(function(results) {

            // Склеиваем результаты поиска в один массив,
            // понадобится при добавлении сервисов
            Object.keys(results).map(function(idx) {
                dataEntries = dataEntries.concat(results[idx]);
            });

            // Формируем BEMJSON из ответов с помощью BEMTREE шаблонов
            BEMTREE.apply(dataEntries.map(function(dataEntry) {
                return {
                    block: 'row',
                    data: dataEntry,
                };
            }))
            .then(function(bemjson) {
                res.end(BEMHTML.apply(bemjson));
            });

        })
        .fail(function() {
            console.error(arguments);
        });
    });

    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });

});
