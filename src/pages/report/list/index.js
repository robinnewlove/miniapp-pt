//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import Mixin                        from 'utils/mixin.util'
import Valid                        from 'utils/valid.util'
import Http                         from 'plugins/http.plugin'
import OptionsMixin                 from 'mixins/options.mixin'
import UserMixin                    from 'mixins/user.mixin'
import AddressApiMixin              from 'mixins/address.api.mixin'
import DataMixin                    from './data.mixin'

Page(Mixin({
    mixins: [
        AddressApiMixin,
        DataMixin,
        UserMixin,
        OptionsMixin,
    ],
    data: {
        tableData: [],
    },
    onLoad () {
        // 获取用户信息并且初始化数据
        this.userGet();
        // 获取报告
        this.reqStoreReportList();
        // 获取大区
        this.reqDistrictsAreas();
    },
    // 搜索选项改变之后的回调
    optionsChangeCallback () {
        this.reqStoreReportList();
    },
    // 获取下载列表
    reqExportTableFile () {
        let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
        data = Valid.filterNull(data);
        let { UserLeve } = this.data.user$;
        data.Leve = UserLeve;
        return Http(Http.API.Req_exportReport, data);
    },
    // 获取报告
    reqStoreReportList () {
        let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
        data = Valid.filterNull(data);
        Http(Http.API.Req_storeReportList, data).then((res) => {
            let tableData = res || [];
            this.setData({ tableData });
        }).toast();
    }
}));
