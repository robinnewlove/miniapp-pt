//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import Mixin                        from 'utils/mixin.util'
import Valid                        from 'utils/valid.util'
import Http                         from 'plugins/http.plugin'
import OptionsMixin                 from 'mixins/options.mixin'
import AddressApiMixin              from 'mixins/address.api.mixin'
import UserMixin                    from 'mixins/user.mixin'
import DataMixin                    from './data.mixin'

Page(Mixin({
    mixins: [
        AddressApiMixin,
        OptionsMixin,
        DataMixin,
        UserMixin,
    ],
    data: {
        tableData: [],
    },
    onLoad () {
        // 获取用户信息并且初始化数据
        this.userGet().then(this.initData.bind(this));
        // 获取巡店员列表
        this.reqPatrolStaff();
    },
    // 初始化数据
    initData ({Level}) {
        if (Level === 'root')
            return this.reqDistrictsAreas();
        let { tableHeadData } = this.data;
        delete tableHeadData.AreaName;
        this.setData({ tableHeadData });
    },
    // 搜索选项改变之后的回调
    optionsChangeCallback (event) {
        let { type, item } = event;
        this.reqPatrolStaff();
    },
    // 获取巡店员列表
    reqPatrolStaff () {
        let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
        data = Valid.filterNull(data);
        Http(Http.API.Req_patrolStaff, data).then((res) => {
            let tableData = res || [];
            this.setData({
                tableData,
            })
        }).toast();
    }
}));
