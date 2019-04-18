import './index.json'
import './index.wxml'
import './index.scss'

import Mixin                        from 'utils/mixin.component.util'
import OptionsMixin                 from 'mixins/options.mixin'
import AddressApiMixin              from 'mixins/address.api.mixin'
import Http                         from 'plugins/http.plugin'
import Router                       from 'plugins/router.plugin'
import Valid                        from 'utils/valid.util'
import DataMixin                    from './data.mixin'

Component(Mixin({
    mixins: [
        DataMixin,
        OptionsMixin,
        AddressApiMixin,
    ],
    properties: {

    },
    data: {
        storeData: [],
        reportData: [],
        linkageNoUse: ['one', 'two', 'three'],
    },
    pageLifetimes: {
        show () {
            // 获取报告
            this.reqStoreReportList();
            // 获取巡店业务列表
            this.reqStorePlanByUser();
        },
    },
    methods: {

        // 获取报告
        reqStoreReportList () {
            Http(Http.API.Req_storeReportList, {}).then((res) => {
                let reportData = res || [];
                this.setData({ reportData });
            }).toast();
        },

        // 搜索选项改变之后的回调
        optionsChangeCallback (event) {
            let { type, item, optItem } = event;
            if (type === 'select')
                this.addressOptionsChange(item, optItem);
            this.reqStorePlanByUser();
            let {
                optionsHiddenData,
                optionsData,
            } = this.data;
            this.triggerEvent('option', {
                optionsHiddenData,
                optionsData,
            });
        },
        // 获取巡店业务列表
        reqStorePlanByUser () {
            let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
            data = Valid.filterNull(data);
            Http(Http.API.Req_storesPlanByUser, data).then((res) => {
                let storeData = res || [];
                this.setData({ storeData })
            }).toast();
        },
        // Tab切换
        handleSwitch (event) {
            let {
                index
            } = event.currentTarget.dataset;
            let {
                tabData
            } = this.data;
            tabData.forEach((item, i) => {
                item.checked = index === i;
            });
            this.setData({
                tabData,
            })
        },
        // 开始巡店 修改
        handlePatrolJump (event) {
            let {
                item
            } = event.currentTarget.dataset;
            let {
                Status,
                StoreID,
                StorePlanID,
            } = item;
            switch (Status) {
                case 1:
                    break;
                case 0: // 初次巡店
                case 2:
                    Router.push('patrol_info_index', {
                        StoreID,
                        title: '新建巡店信息',
                        type: 'add',
                    });
                    break;
                case 3:
                    Router.push('patrol_info_index', {
                        StorePlanID,
                        title: '修改巡店信息',
                        type: 'update',
                    });
                    break;
            }
        },
    }
}));
