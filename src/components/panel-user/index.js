import './index.json'
import './index.wxml'
import './index.scss'

import Mixin                        from 'utils/mixin.component.util'
import Valid                        from 'utils/valid.util'
import Http                         from 'plugins/http.plugin'
import UserMixin                    from 'mixins/user.mixin'
import Modal                        from 'plugins/modal.plugin'
import Router                       from 'plugins/router.plugin'
import DataMixin                    from './data.mixin'

Component(Mixin({
    mixins: [
        DataMixin,
        UserMixin,
    ],
    properties: {
        interval: {
            type: Number,
            value: 3000,
        },
        autoPlay: {
            type: Boolean,
            value: true,
        },
        vertical: {
            type: Boolean,
            value: true,
        },
        circular: {
            type: Boolean,
            value: true,
        },
        userCurrent: {
            type: String,
            value: 'root',
        },
    },
    pageLifetimes: {
        show () {
            // 获取用户数据并且初始化数据
            this.userGet().then((res) => {console.log(res)});
            // 初始化数据
            this.initData();
            // 获取页面数据
            this.reqStoresPlanIndex();
        },
    },
    methods: {
        // 初始化数据
        initData () {
            let { userCurrent } = this.data;
            if (userCurrent === 'root') return null;
            let { usPlanData } = this.data;
            delete usPlanData.CityPatroler;
            delete usPlanData.AreaAd;
            delete usPlanData.Stores;
            this.setData({usPlanData});
        },
        // 2.6	获取当前用户巡店页面基础数据（城市巡店员和大区管理员）
        reqStoresPlanIndex () {
            let {
                userCurrent,
                usPlanData,
            } = this.data;
            let API = userCurrent === 'root'
                ? Http.API.Req_storesPlanAdIndex
                : Http.API.Req_storesPlanIndex;
            let Data = userCurrent === 'region';
            Http(API, { Data }).then((res) => {
                let {
                    Notices,
                    UsPlan,
                    AreaAd,
                    CityPatroler,
                } = res;
                let noticeData = Notices || [];
                let data = {
                    ...UsPlan,
                    AreaAd,
                    CityPatroler,
                };
                UsPlan && Valid.assignment(this, data, usPlanData, 'usPlanData');
                this.setData({ noticeData });
            }).toast();
        },
        handleNotice (event) {
            let {
                item
            } = event.currentTarget.dataset;
            let {
                Title,
                Content,
                Link,
            } = item;
            let options = {};
            if (Content) {
                options.title = Title;
                options.content = Content;
            } else {
                options.content = Title;
            }
            Modal.confirm(options).then((res) => {
                if (res.confirm && Link) {
                    Router.push('web_index', {title: Title, src: Link});
                }
            })

        }
    }
}));
