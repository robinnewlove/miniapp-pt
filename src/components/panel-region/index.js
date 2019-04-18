import './index.json'
import './index.wxml'
import './index.scss'

import Mixin                        from 'utils/mixin.component.util'
import Valid                        from 'utils/valid.util'
import Http                         from 'plugins/http.plugin'
import Router                       from 'plugins/router.plugin'
import OptionsMixin                 from 'mixins/options.mixin'
import AddressApiMixin              from 'mixins/address.api.mixin'
import UserMixin                    from 'mixins/user.mixin'
import DataMixin                    from './data.mixin'

Component(Mixin({
    mixins: [
        DataMixin,
        UserMixin,
        OptionsMixin,
        AddressApiMixin,
    ],
    properties: {

    },
    data: {
        storeData: [],
        linkageNoUse: ['one', 'two', 'three'],
    },
    pageLifetimes: {
        show () {
            // 获取省份
            // this.reqDistricts();
            // 获取巡店业务列表
            this.reqStorePlanByAreaUser();
        },
    },
    methods: {
        // 搜索选项改变之后的回调
        optionsChangeCallback (event) {
            let { type, item, optItem } = event;
            if (type === 'select')
                this.addressOptionsChange(item, optItem);
            this.reqStorePlanByAreaUser();
        },
        // 获取巡店业务列表
        reqStorePlanByAreaUser () {
            this.userGet().then((res) => {
                let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
                data = Valid.filterNull(data);
                data.Leve = res.UserLeve;
                return Http(Http.API.Req_storesPlanByAreaUser, data);
            }).then((res) => {
                let storeData = res || [];
                this.setData({
                    storeData,
                })
            }).toast();
        },
        // 审核巡店
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
                // 审核
                case 1:
                    Router.push('patrol_info_index', {
                        StorePlanID,
                        title: '审核巡店信息',
                        type: 'examine',
                        disabled: true,
                    });
                    break;
                case 2:
                case 3:
                    Router.push('patrol_info_index', {
                        StorePlanID,
                        title: '查看巡店信息',
                        type: 'see',
                        disabled: true,
                    });
                    break;
            }
        },
    }
}));

