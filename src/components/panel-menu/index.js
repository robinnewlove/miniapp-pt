import './index.json'
import './index.wxml'
import './index.scss'

import Mixin                        from 'utils/mixin.component.util'
import Router                       from 'plugins/router.plugin'
import Http                         from 'plugins/http.plugin'
import Auth                         from 'plugins/auth.plugin'
import UserMixin                    from 'mixins/user.mixin'
import DataMixin                    from './data.mixin'

Component(Mixin({
    mixins: [
        UserMixin,
        DataMixin,
    ],
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        menuCurrent: {
            type: String,
            value: 'root',
        },
    },
    pageLifetimes: {
        show () {
            // 获取用户数据
            this.userGet();
            // 查询可以切换的用户
            this.reqChangeUser();
        },
    },
    methods: {
        // 查询可以切换的用户
        reqChangeUser () {
            Http(Http.API.Req_changeUser).then((res) => {
                let userList = res || [];
                this.setData({ userList });
            });
        },
        // 这里是一个自定义方法
        handleMenu (event) {
            let item = event.currentTarget.dataset.item || {};
            let {
                url,
                params,
            } = item;
            url && Router.push(url, params);
            this.triggerEvent('menu', item)
        },
        // 切换
        handleSwitch () {
            let {
                menuCurrent,
                userList,
            } = this.data;
            let url = menuCurrent === 'city'
                ? 'region_home_index'
                : 'city_home_index';
            let userLeve = menuCurrent === 'city'
                ? 1
                : 2;
            let Level = userLeve === 1 ? 'region' : 'city';
            let user = '';
            userList.forEach((item) => {
                if (item.UserLeve === userLeve) user = item;
            });
            if (!user) return null;
            let data = {
                Data: user.OpenId,
            };
            this.doCheckChangeUser(url, data, Level);
        },
        // 验证角色
        doCheckChangeUser (url, data, Level) {
            Http(Http.API.Do_checkChangeUser, data).then((res) => {
                return Auth.updateToken({
                    ...res,
                    Level
                });
            }).then(() => {
                Router.root(url, {}, true);
            }).toast();
        },
    }
}));
