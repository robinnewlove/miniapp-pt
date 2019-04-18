import './index.json'
import './index.wxml'
import './index.scss'

import Mixin                        from 'utils/mixin.component.util'
import UserMixin                    from 'mixins/user.mixin'
import Router                       from 'plugins/router.plugin'

Component(Mixin({
    mixins: [
        UserMixin,
    ],
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        tableHeadData: {
            type: Object,
            value: {},
        },
        tableData: {
            type: Array,
            value: [],
        },
    },
    pageLifetimes: {
        show () {
            this.userGet();
        },
    },
    methods: {

        // 审核门店
        handleJump (event) {
            let {
                item,
                type,
            } = event.currentTarget.dataset;
            let {
                Id,
                StorePlanID,
                PlanNum,
            } = item;
            switch (type) {
                case 'examined':
                case 'see':
                    Router.push('store_info_index', {
                        Id,
                        type,
                        disabled: true,
                        title: '查看门店信息',
                    });
                    break;
                case 'update':
                    Router.push('store_info_index', {
                        Id,
                        type,
                        disabled: false,
                        title: '修改门店信息',
                    });
                    break;
                case 'examine':
                    Router.push('store_info_index', {
                        Id,
                        type,
                        disabled: true,
                        title: '审核门店信息',
                    });
                    break;
                case 'IsDele':
                    this.triggerEvent('switch', event.currentTarget.dataset);
                    break;
                case 'seePatrol':
                case 'examinedPatrol':
                    if (!PlanNum) return null;
                    Router.push('patrol_info_index', {
                        StorePlanID,
                        type: 'see',
                        disabled: true,
                        title: '查看巡店信息',
                    });
                    break;
            }
        },

        // 切换
        handleSwitch (event) {
            this.triggerEvent('switch', event.currentTarget.dataset)
        },
    }
}));
