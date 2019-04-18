//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import Mixin                        from 'utils/mixin.util'
import Auth                         from 'plugins/auth.plugin'
import Router                       from 'plugins/router.plugin'
import Http                         from 'plugins/http.plugin'
import RouterMixin                  from 'mixins/router.mixin'

Page(Mixin({
    mixins: [
        RouterMixin,
    ],
    onLoad (options) {
        // 获取参数
        this.routerGetParams(options);
    },
    handleJump (event) {
        let {
            level,
            url,
        } = event.currentTarget.dataset;
        let {
            userList
        } = this.data.params$;
        let userLeve = level === 'city'
            ? 2
            : 1;
        let user = '';
        userList.forEach((item) => {
            if (item.UserLeve === userLeve) user = item;
        });
        if (!user) return null;
        let data = {
            Data: user.OpenId,
        };
        this.doCheckChangeUser(url, data, level);
    },
    // 验证角色
    doCheckChangeUser (url, data, level) {
        Http(Http.API.Do_checkChangeUser, data).then((res) => {
            return Auth.updateToken({
                ...res,
                Level: level,
            });
        }).then(() => {
            Router.root(url, {}, true);
        }).toast();
    },
}));
