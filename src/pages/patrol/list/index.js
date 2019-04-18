//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import Mixin                        from 'utils/mixin.util'
import Valid                        from 'utils/valid.util'
import Http                         from 'plugins/http.plugin'
import UserMixin                    from 'mixins/user.mixin'
import AddressApiMixin              from 'mixins/address.api.mixin'
import OptionsMixin                 from 'mixins/options.mixin'
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
        // 获取巡店列表
        this.reqStorePlanByUser();
        // 获取大区
        this.reqDistrictsAreas();
    },
    // 初始化数据
    initData ({Level}) {
        let { optionsData } = this.data;
    },
    // 获取下载列表
    reqExportTableFile () {
        let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
        data = Valid.filterNull(data);
        let { UserLeve } = this.data.user$;
        data.Leve = UserLeve;
        return Http(Http.API.Req_exportPlan, data);
    },
    // 搜索选项改变之后的回调
    optionsChangeCallback (event) {
        let { type, item } = event;
        this.reqStorePlanByUser();
    },
    // 获取巡店列表
    reqStorePlanByUser () {
        this.userGet().then((res) => {
            let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
            data = Valid.filterNull(data);
            data.Leve = res.UserLeve;
            return Http(Http.API.Req_storesPlanByUser, data);
        }).then((res) => {
            let tableData = res || [];
            this.setData({
                tableData,
            });
        }).toast();
    },
}));
