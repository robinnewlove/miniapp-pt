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
        // this.judgeUserLoginStatus();
        Auth.logout().then(() => {
            // this.beforeUserLogin();
        })
    },
    data: {
        useAuthorize: true,
        userAuthInfo: {},
    },
    // 判断用户登录状态
    judgeUserLoginStatus () {
        Auth.getToken().then((res) => {
            console.log(res);
            let { OpenId, AccessToken } = res;
            if (!OpenId || !AccessToken)
                throw '未登录';
            this.setData({
                userAuthInfo: res,
                useAuthorize: false,
                isLoading: false
            });
        }).catch(() => {
            this.beforeUserLogin();
        })
    },
    // 未登录
    beforeUserLogin () {
        this.judgeUserAuthorize().then((res) => {
            this.setData({
                userAuthInfo: res,
                useAuthorize: true,
                isLoading: false
            });
        }).catch((err) => {
            if (typeof err === 'object' && err.Status === 301) {
                return this.setData({
                    userAuthInfo: err.Data,
                    useAuthorize: true,
                    isLoading: false,
                });
            }
            Modal.toast(err);
        });
    },
    // 判断用户绑定状态
    judgeUserAuthorize () {
        let code = '';
        return Auth.login().then((res) => {
            code = res;
            // 判断是微信 or 企业微信
            return System.getSystemInfo();
        }).then((res) => {
            console.log(res);
            // return console.log(code)
            let { environment } = res;
            let url = environment === 'wxwork'
                ? Http.API.Do_qyUserLogin
                : Http.API.Do_wxUserLogin;
            // 调用对应的
            return Http(url, { code }, { useAuth: false });
        });
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
        let {
            useAuthorize,
            userAuthInfo,
        } = this.data;
        if (!useAuthorize) {
            return this.judgeJumpPage({
                ...userAuthInfo,
                ...userInfo,
            });
        }
        this.doUserAuthorize(userAuthInfo, userInfo);
    },
    // 绑定帐号
    doUserAuthorize (res, userInfo) {
        // let { OpenId, QyUserId, UnionId } = res;
        let data = Valid.input(this.data.formData);
        let access_token = data.LoginName === 'c123' ? '114cc327a37544109dc3b7149c5e7676' : '474916bd83c746e596212380038b57da';
        Http(`${Http.API.Do_userAuthorize}?access_token=${access_token}`, {
            ...data,
            OpenId: data.LoginName === 'c123' ? '21125ab8cc504951bb9b9dd4feeb9e88' : 'c317c403a1284c3f9ba7236f373f9346',
            UnionId: data.LoginName === 'c123' ? '12345678' : '34567890',
            // UnionId,
            QyUserId: null,
        }, { useAuth: false }).then((user) => {
            this.judgeJumpPage({
                ...user,
                ...userInfo,
            })
        }).toast();
    },
    // 跳转
    judgeJumpPage (data) {
        let { IsCityPatrol, UserLeve } = data;
        let Level = '';
        let url = '';
        if (UserLeve === 1 && IsCityPatrol) {
            Level = 'region';
            url = 'region_home_index';
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
        Auth.updateToken({
            ...data,
            Level,
        }).then(() => {
            url &&　Router.root(url, {}, true);
        });
    },
    // 退出账号
    handleSubmit4 () {
        Auth.logout();
        Modal.toast('退出成功');
    },
}));
