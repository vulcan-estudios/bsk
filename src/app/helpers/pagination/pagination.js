const template = _.template(require('./templates/main.html'));

module.exports = {

    render: function (element, conf) {

        let $element = $(element);

        conf = _({
            baseUrl: '/',
            pages: 5,
            current: 1,
            perPage: 10,
            maxItems: 10,
            extraParams: '',
            alwaysVisible: false
        }).extend(conf);

        if(conf.pages <= 1 && !conf.alwaysVisible) {
            return;
        }

        conf.current    = parseInt(conf.current);
        conf.maxItems   = conf.maxItems < 10 ? 10 : conf.maxItems;
        conf.url        = conf.baseUrl + '?' +  (conf.extraParams ? App.Filter.get(conf.extraParams, ['ltrim', 'suffix'], '&') : '') + 'page={{page}}&per_page='+conf.perPage;
        conf.prevUrl    = conf.url.replace('{{page}}', (conf.current - 1));
        conf.nextUrl    = conf.url.replace('{{page}}', (conf.current + 1));
        conf.items      = '';

        const current   = '<li class="current">' + conf.current + '</li>';
        const ellipsis  = '<li class="ellipsis" aria-hidden="true"></li>';
        const link      = (url, i) => '<li><a href="' + url + '" data-pushstate data-perpage="' + conf.perPage + '">' + i + '</a></li>';

        // The number of items in within the maximun number allowed in the row.
        if (conf.pages <= conf.maxItems) {
            for (let i = 1; i <= conf.pages; i++) {
                const url   = conf.url.replace('{{page}}', i);
                conf.items += conf.current === i ? current : link(url, i);
            }
        } else {

            /**
             pages      = 22
             maxItems   = 10
             current    = 3
             1 2 [3] 4 5 (6 7 8 9 10 11 12 13 14 15 16 17 18) 19 20 21 22
             */
            if (conf.current < conf.maxItems - 3) {

                const breakpoint1 = conf.current + 3;
                const breakpoint2 = conf.pages - Math.floor(conf.maxItems / 2) + conf.current - 2;

                for (let i = 1; i <= conf.pages; i++) {

                    const url = conf.url.replace('{{page}}', i);

                    if (i < breakpoint1) {
                        conf.items += conf.current === i ? current : link(url, i);
                    } else if (i === breakpoint1) {
                        conf.items += ellipsis;
                        i = breakpoint2;
                    } else {
                        conf.items += link(url, i);
                    }
                }
            }

            /*
             1 2 3 4 5 (6 7 8 9 10) 11 [12] 13 (14 15 16 17 18) 19 20 21 22
             */
            else if (conf.current >= conf.maxItems - 3 && conf.current <= conf.pages - conf.maxItems + 5) {

                conf.items += link(conf.url.replace('{{page}}', 1), 1);
                conf.items += link(conf.url.replace('{{page}}', 2), 2);

                conf.items += ellipsis;

                conf.items += link(conf.url.replace('{{page}}', (conf.current - 1)), conf.current - 1);
                conf.items += current;
                conf.items += link(conf.url.replace('{{page}}', (conf.current + 1)), conf.current + 1);

                conf.items += ellipsis;

                conf.items += link(conf.url.replace('{{page}}', (conf.pages - 2)), conf.pages - 2);
                conf.items += link(conf.url.replace('{{page}}', (conf.pages - 1)), conf.pages - 1);
            }

            /*
             pages = 22
             maxItems = 10
             current = 18
             1 2 (3 4 5 6 7 8 9 10 11 12 13 14 15) 16 17 [18] 19 20 21 22
             */
            else {
                const breakpoint1 = Math.ceil(conf.maxItems / 2) - (conf.pages - conf.current) + 2;
                const breakpoint2 = conf.current - 3;

                for (let i = 1; i <= conf.pages; i++) {

                    const url = conf.url.replace('{{page}}', i);

                    if (i < breakpoint1) {
                        conf.items += link(url, i);
                    } else if (i === breakpoint1) {
                        conf.items += ellipsis;
                        i = breakpoint2;
                    } else {
                        conf.items += conf.current === i ? current : link(url, i);
                    }
                }
            }
        }

        const html = template(conf);

        $element.html(html);
    }

};
