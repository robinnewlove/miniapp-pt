//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import Mixin                        from 'utils/mixin.util'

Page(Mixin({
    mixins: [

    ],
    data: {
        currentLevel: 'region',
    },
    onShow() {

    },
    onLoad () {

    },
    onReady () {

    },
    // 导航条切换
    handleMenu (event = {}) {
        let {
            detail
        } = event;
        switch (detail.icon) {
            // 门店管理
            case 'mdgl':

                break;
            // 查看巡店员
            case 'xjmd':

                break;
            // 下载巡店表
            case 'xzxdb':

                break;
            // 下载季度报告
            case 'xzjdbg':

                break;
        }
    }
}));
