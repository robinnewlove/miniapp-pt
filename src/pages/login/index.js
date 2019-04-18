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
        this.judgeUserGrantAuthorization();
    },
    data: {
        useAuthorize: false,
        userAuthInfo: {},
        userInfo: {},
        useGrantAuth: '',
    },

    // 判断用户是否已授权
    judgeUserGrantAuthorization () {
        Auth.logout().then(() => {
            return Auth.getUserInfo();
        }).then((res) => {
            console.log(res);
            this.setData({
                userInfo: res.userInfo,
                useGrantAuth: false,
            });
            this.beforeUserLogin();
        }).catch((err) => {
            this.setData({
                isLoading: false,
                useAuthorize: false,
                useGrantAuth: true,
            });
        });
    },

    // 授权获取到用户信息
    handleUserInfo (event) {
        let { userInfo } = event.detail;
        if (!userInfo) return null;
        this.setData({
            userInfo,
            useGrantAuth: false,
            isLoading: true,
        });
        this.beforeUserLogin();
    },

    // 未登录
    beforeUserLogin () {
        this.judgeUserAuthorize().then((res) => {
            this.setData({
                userAuthInfo: res,
                useAuthorize: false,
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
            if (typeof err === 'object' && err.Status === 302) {
                return this.beforeUserLogin();
            }
            Modal.toast(err);
        });
    },
    // 判断用户绑定状态
    judgeUserAuthorize () {
        let code = '';
        let userData = '';
        return Auth.login().then((res) => {
            code = res;
            return Auth.getUserInfo()
        }).then((res) => {
            userData = res;
            // 判断是微信 or 企业微信
            return System.getSystemInfo();
        }).then((res) => {
            console.log(res);
            let { environment } = res;
            let url = environment === 'wxwork'
                ? Http.API.Do_qyUserLogin
                : Http.API.Do_wxUserLogin;
            console.log('userData', userData)
            let { encryptedData, iv } = userData;
            // 调用对应的登录
            // console.log(encryptedData)
            // console.log(iv)
            // console.log(code)
            // return null;
            return Http(url, {
                code,
                encryptedData,
                iv,
            }, {
                useAuth: false,
                loading: false,
            });
        });
    },
    // 授权并登录
    handleSubmit (){
        let { useAuthorize, userInfo } = this.data;
        if (useAuthorize && Valid.check(this.data.formData))
            return null;
        this.userLogin(userInfo);
    },
    // 用户登录
    userLogin (userInfo) {
        let {
            useAuthorize,
            userAuthInfo,
        } = this.data;
        if (!useAuthorize) {
            return this.reqChangeUser({
                ...userAuthInfo,
                ...userInfo,
            });
        }
        this.doUserAuthorize(userAuthInfo, userInfo);
    },
    // 绑定帐号
    doUserAuthorize (res, userInfo) {
        let { OpenId, QyUserId, UnionId } = res;
        let data = Valid.input(this.data.formData);
        Http(Http.API.Do_userAuthorize, {
            ...data,
            OpenId,
            QyUserId,
            UnionId,
        }, { useAuth: false }).then((user) => {
            this.reqChangeUser({
                ...user,
                ...userInfo,
            })
        }).toast();
    },

    // 查询可以切换的用户
    reqChangeUser (data) {
        Auth.updateToken(data).then(() => {
            return Http(Http.API.Req_changeUser);
        }).then((res) => {
            let userList = res || [];
            this.judgeJumpPage(data, userList);
        }).toast();
    },

    // 跳转
    judgeJumpPage (data, userList) {
        let Level = '';
        let url = '';
        let params = {};
        let { UserLeve } = data;
        if (userList.length > 1) {
            url = 'level_index';
            params = { userList };
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
            url &&　Router.root(url, params, true);
        });
    },
    // 退出账号
    handleSubmit4 () {
        Auth.logout();
        Modal.toast('退出成功');
    },
}));
