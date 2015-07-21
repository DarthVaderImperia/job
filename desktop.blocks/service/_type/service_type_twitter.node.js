modules.define('twitter', function(provide) {

var vow = require('vow'),
    twitter = require('twit'),
    twitterText = require('twitter-text'),
    config = require('./service_type_twitter.config'),
    twit = new twitter(config);

    provide({
        get: function(query) {
            var dfd = vow.defer();

            twit.get('search/tweets', { q: query, count: 1000 }, function(err, res) {

                if(err || !res.statuses) {
                    console.error(err);
                    dfd.resolve([]);
                }
                if(res){
                    dfd.resolve(res.statuses.map(function(status) {
                        return {
                            userName: status.user.name,
                            userNick: status.user.screen_name,
                            postLink: 'https://twitter.com/' + status.user.screen_name,
                            createdAt: status.created_at,
                            retweet: status.retweet_count,
                            geo: status.user.geo_enabled ? "geo": "not_geo",
                            type: status.retweet_count > 0 ? "blue" : "red"
                        };
                    }));
                }
            });

            return dfd.promise();

        }
    });


});
