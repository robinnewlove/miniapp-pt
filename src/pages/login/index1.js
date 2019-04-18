//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import Mixin                        from 'utils/mixin.util'
import Valid                        from 'utils/valid.util'
import InputMixin                   from 'mixins/input.mixin'
import Http                         from 'plugins/http.plugin'
import Auth                         from 'plugins/auth.plugin'
import Modal                        from 'plugins/modal.plugin'
import Router                       from 'plugins/router.plugin'
import System                       from 'plugins/system.plugin'
import DataMixin                    from './data.mixin'

Page(Mixin({
    mixins: [
        DataMixin,
        InputMixin,
    ],
    onLoad () {
        // 判断状态
        this.judgeUserStatus();
    },
    data: {
        useAuthorize: true,
    },
    // 判断登录状态
    judgeUserStatus () {
        Auth.getToken().then((res) => {
            let { OpenId, AccessToken } = res;
            if (!OpenId || !AccessToken)
                throw '未登录';
            this.setData({
                useAuthorize: true,
                isLoading: false
            });
        }).catch(() => {
            this.judgeUserAuthorize();
        })
    },
    // 判断用户绑定状态
    judgeUserAuthorize () {
        let code = '';
        Auth.login().then((res) => {
            code = res;
            return System.getSystemInfo();
        }).then((res) => {
            console.log(res);
            let { environment } = res;
            let url = environment === 'wxwork'
                ? Http.API.Do_qyUserLogin
                : Http.API.Do_wxUserLogin;
            return Http(url, { code }, { useAuth: false });
        }).then((res) => {
            return Auth.updateToken(res);
        }).then(() => {
            this.setData({
                useAuthorize: true,
                isLoading: false
            });
        }).catch((err) => {
            if (typeof err === 'object' && err.Status === 301) {
                Auth.updateToken(err.Data);
                return this.setData({isLoading: false});
            }
            Modal.toast(err);
        })
    },
    // 授权并登录
    handleSubmit (e){
        let { useAuthorize } = this.data;
        if (useAuthorize && Valid.check(this.data.formData))
            return null;
        let { userInfo } = e.detail;
        this.userLogin(userInfo);
    },
    // 用户登录
    userLogin (userInfo) {
        let { useAuthorize } = this.data;
        Auth.getToken().then((res) => {
            if (!useAuthorize)
                return { ...res, ...userInfo};
            let { OpenId, QyUserId, UnionId } = res;
            let data = Valid.input(this.data.formData);
            return Http(Http.API.Do_userAuthorize, {
                ...data,
                OpenId,
                QyUserId,
                UnionId,
            }, { useAuth: false });
        }).then((res) => {
            this.judgeJumpPage({
                ...res,
                ...userInfo,
            })
        }).catch((err) => {
            Modal.toast(err);
            Auth.logout();
        });
    },
    // 跳转
    judgeJumpPage (data) {
        console.log(data);
        let { IsCityPatrol, UserLeve } = data;
        let Level = '';
        let url = '';
        if (UserLeve === 1) {
            url = 'level_index';
        } else if (UserLeve === 2) {
            Level = 'city';
            url = 'city_home_index';
        } else if (UserLeve === 1) {
            Level = 'region';
            url = 'region_home_index';
        } else if (UserLeve === 3) {
            Level = 'root';
            url = 'root_home_index';
        }
        delete data.AccessToken
        console.log(url);
        Auth.updateToken({
            ...data,
            Level,
        }).then(() => {
            Router.root(url, {}, true);
        });
    },
    // 退出账号
    handleSubmit4 () {
        Auth.logout();
        Modal.toast('退出成功');
    },
}));
