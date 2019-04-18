//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import Mixin                        from 'utils/mixin.util'
import Valid                        from 'utils/valid.util'
import Http                         from 'plugins/http.plugin'
import Modal                        from 'plugins/modal.plugin'
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
        linkageNoUse: ['one', 'two', 'three'],
    },
    onLoad () {
        this.userGet().then(this.initData.bind(this));
    },
    onShow () {
        // 获取门店列表数据
        this.reqStoreList();
    },
    // 初始化数据
    initData ({Level}) {
        let {
            optionsData,
            tableHeadData,
        } = this.data;
        if (Level === 'city') {
            delete optionsData.Down;
            delete optionsData.ProviceName;
            delete optionsData.CityName;
            delete tableHeadData.AreaName;
            delete tableHeadData.CityName;
            delete tableHeadData.IsPatrol;
            delete tableHeadData.IsReport;
            delete tableHeadData.IsFee;
        } else if (Level === 'region') {
            delete optionsData.Down;
            delete tableHeadData.AreaName;
            delete tableHeadData.IsPatrol;
            delete tableHeadData.IsReport;
            delete tableHeadData.IsFee;
            // 获取省份
            // this.reqDistricts();
        } else if (Level === 'root') {
            delete tableHeadData.PlanNum;
            delete tableHeadData.StoreStatus;
            // 获取省份
            // this.reqDistricts();
        }
        this.setData({ optionsData, tableHeadData});
    },
    // 获取下载列表
    reqExportTableFile () {
        let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
        data = Valid.filterNull(data);
        let { UserLeve } = this.data.user$;
        data.Leve = UserLeve;
        return Http(Http.API.Req_exportStore, data);
    },
    // 搜索选项改变之后的回调
    optionsChangeCallback (event) {
        let { type, item, optItem } = event;
        if (type === 'select')
            this.addressOptionsChange(item, optItem);
        this.reqStoreList();
    },
    // 获取列表
    reqStoreList () {
        let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
        data = Valid.filterNull(data);
        this.userGet().then((res) => {
            console.log(res);
            let {
                Level
            } = res;
            let api = Level === 'city'
                ? Http.API.Req_storeList
                : Http.API.Req_storesByUser;
            return Http(api, data);
        }).then((res) => {
            let tableData = res || [];
            this.setData({
                tableData,
            })
        }).toast();
    },
    // 开关
    handleSwitch (event) {
        let {
            item,
            type,
            index,
        } = event.detail;
        let {
            tableData,
        } = this.data;
        let boolean = !item[type];
        let {
            IsPatrol,
            IsReport,
            IsFee,
            IsDele,
        } = item;
        let data = {
            ID: item.Id,
            IsPatrol,
            IsReport,
            IsFee,
            IsDele,
            [type]: boolean,
        };
        if (type === 'IsDele') {
            return Modal.confirm('确认删除该门店？').then((res) => {
                if (res.confirm)
                    this.doSetStore(data, () => {
                        tableData.splice(index, 1);
                        this.setData({ tableData });
                    })
            });
        }
        this.doSetStore(data, () => {
            item[type] = boolean;
            tableData[index] = item;
            this.setData({
                tableData
            });
        });
    },
    // 超管设置门店
    doSetStore (data, callback) {
        Http(Http.API.Do_setStore, data).then(() => {
            callback && callback();
        }).toast();
    },
}));
