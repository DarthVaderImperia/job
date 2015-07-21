({
    block: 'page',
    title: 'Yandex test job',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: 'find them all' }},
        { elem: 'css', url: '_index.css' }
    ],
    scripts: [{ elem: 'js', url: '_index.js' }],
    content: {
        block: 'yatest',
        //mods: { autorefresh: true },
        js: {
            url: '/search/'
            //refreshInterval: 10000
        },
        content: [
            {
                elem: 'header',
                content: [
                    {
                        elem: 'logo',
                        content: [
                            {
                                block: 'icon',
                                mods: { type: 'yatest' }
                            },
                            'Yandex test job'
                        ]
                    },
                    {
                        block: 'form',
                        content: [
                            {
                                elem: 'search',
                                content: [
                                    {
                                        block: 'input',
                                        mods: { theme: 'islands', size: 'm', 'has-clear' : true },
                                        name: 'query',
                                        val: '#b_',
                                        placeholder: 'try me, baby!'
                                    },
                                    {
                                        block: 'button',
                                        mods: { theme: 'islands', size: 'm', type: 'submit' },
                                        text: 'Найти'
                                    },
                                    {
                                        block: 'spin',
                                        mods: { theme: 'islands', size : 's' }
                                    }
                                ]
                            },
                            {
                                elem: 'filter',
                                content: ['twitter'].map(function(service) {
                                    return {
                                        block: 'checkbox',
                                        mods: {
                                            theme: 'islands',
                                            size: 'l',
                                            checked: service === 'twitter'
                                        },
                                        name: service,
                                        text: service
                                    };
                                })
                            }
                        ]
                    }
                ]
            },
            {
                elem: 'content',
                content: [
                    {
                        block: 'table',
                        content:[
                            {
                                block: 'thead',
                                js: {url: '/sort'},
                                content:{
                                    block: 'head-row',
                                    content:[
                                        {
                                            block: 'head-cell',
                                            content:'Имя пользователя',
                                            mods: {type: 'none'},
                                            js: {
                                                sort: 'userName'
                                            },                                            
                                        },
                                        {
                                            block: 'head-cell',
                                            content:'Ссылка',
                                            mods: {type: 'none'},
                                            js: {
                                                sort: 'userNick'
                                            },
                                        },
                                        {
                                            block: 'head-cell',
                                            content:'Дата публикации',
                                            js: {
                                                sort: 'createdAt'
                                            },
                                        },
                                        {
                                            block: 'head-cell',
                                            content: "Ретвиты",
                                            mods: {type: 'none'},
                                            js: {
                                                sort: 'retweet'
                                            },
                                        },
                                        {
                                            block: 'head-cell',
                                            content: 'Геолокация',
                                            mods: {type: 'none'},
                                            js: {
                                                sort: 'geo'
                                            },
                                        }
                                    ]
                                }
                            },
                            {
                                block: 'tbody',
                                content:[
                                    {
                                        block: 'row',
                                        content:[
                                            {
                                                block: 'cell',
                                                content: "Name"
                                            },
                                            {
                                                block: 'cell',
                                                content:
                                                {
                                                    block: 'link',
                                                    mods: { theme: 'islands' },
                                                    mix: { block: 'cell', elem: 'row' },
                                                    url: "http://twitter.com",
                                                    content: ["user", ' @', "nick"]
                                                }
                                            },
                                            {
                                                block: 'cell',
                                                content: "Date"
                                            },
                                            {
                                                block: 'cell',
                                                content: "0",
                                                mods:{type:'red'}
                                            },
                                            {
                                                block: 'cell',
                                                content: "",
                                                mods:{type:'geo'}
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
})
