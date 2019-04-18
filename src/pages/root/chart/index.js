//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import Mixin                        from 'utils/mixin.util'
import Valid                        from 'utils/valid.util'
import DateUtil                     from 'utils/date.util'
import Http                         from 'plugins/http.plugin'
import RouterMixin                  from 'mixins/router.mixin'
import OptionsMixin                 from 'mixins/options.mixin'
import AddressApiMixin              from 'mixins/address.api.mixin'
import DataMixin                    from './data.mixin'
import {
    getLineChart,
}                                   from 'utils/chart.util'

let counterChart = null;
let storeChart = null;
let patrolChart = null;

Page(Mixin({
    mixins: [
        DataMixin,
        OptionsMixin,
        RouterMixin,
        AddressApiMixin,
    ],
    data: {
        counterOpts: {
            onInit: '',
        },
        storeOpts: {
            onInit: '',
        },
        patrolOpts: {
            onInit: '',
        },
        linkageNoUse: ['four','five'],
        hidePop: true,
    },
    onLoad (options) {
        // 获取参数
        this.routerGetParams(options);
        // 初始化数据
        this.initData();
        // 获取图标数据
        this.reqStaticsTikDetailAd();
        // 获取大区
        this.reqDistrictsAreas();
    },
    handlePop (event) {
        let hidePop = event.detail.hidePop;
        this.setData({hidePop})
    },
    // 初始化数据
    initData () {
        let { type, title } = this.data.params$;
        title = title || '查看城市巡店图表';
        wx.setNavigationBarTitle({title});
        let date = DateUtil.getSixMonth();
        let data = {};
        if (type === 'counter') {
            counterChart = getLineChart([], date.sixArr);
            data['counterOpts.onInit'] = counterChart.init;
        } else if (type === 'store'){
            storeChart = getLineChart([], date.sixArr);
            patrolChart = getLineChart([], date.sixArr);
            data['storeOpts.onInit'] = storeChart.init;
            data['patrolOpts.onInit'] = patrolChart.init;
        }
        this.setData(data);
    },
    // 搜索选项改变之后的回调
    optionsChangeCallback (event) {
        let { type, item, optItem } = event;
        if (type === 'select')
            this.addressOptionsChange(item, optItem);
        this.reqStaticsTikDetailAd();
    },
    // 获取超管查看巡店、门店统计明细
    reqStaticsTikDetailAd () {
        let date = DateUtil.getSixMonth();
        let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
        data = Valid.filterNull(data);
        Http(Http.API.Req_statistikDetailAd, {
            ...data,
            ...date,
        }).then((res) => {
            // 更新饼图图表数据
            this.updateChartData(res);
        }).toast();
    },
    // 更新饼图图表数据
    updateChartData (data) {
        let counterData = [];
        let storeData = [];
        let patrolData = [];
        data.forEach((item) => {
            let {
                Month,
                CityName,
                CounterNum,
                Stores,
                PlanNum,
            } = item;
            counterData.push({
                year: Month,
                type: CityName,
                value: CounterNum,
            });
            storeData.push({
                year: Month,
                type: CityName,
                value: Stores,
            });
            patrolData.push({
                year: Month,
                type: CityName,
                value: PlanNum,
            });
        });
        setTimeout(() => {
            counterChart && counterChart.update(counterData);
            storeChart && storeChart.update(storeData);
            patrolChart && patrolChart.update(patrolData);
        }, 800);
    },
}));

const data1 = [
    { "year": '2018-10', "type": "United States", "value": 99 },
    { "year": '2018-10', "type": "Florida", "value": 44 },
    { "year": '2018-10', "type": "xx", "value": 66 },
    { "year": '2018-11', "type": "United States", "value": 15 },
    { "year": '2018-11', "type": "Florida", "value": 33 },
    { "year": '2018-11', "type": "xx", "value": 77 },
    { "year": '2018-12', "type": "United States", "value": 10 },
    { "year": '2018-12', "type": "Florida", "value": 4.8 },
    { "year": '2018-12', "type": "xx", "value": 66 },
    { "year": '2019-01', "type": "United States", "value": 80 },
    { "year": '2019-01', "type": "Florida", "value": 90 },
    { "year": '2019-01', "type": "xx", "value": 100 },
    { "year": '2019-02', "type": "United States", "value": 60 },
    { "year": '2019-02', "type": "Florida", "value": 70 },
    { "year": '2019-02', "type": "xx", "value": 60 },
    { "year": '2019-03', "type": "United States", "value": 100 },
    { "year": '2019-03', "type": "Florida", "value": 50 },
    { "year": '2019-03', "type": "xx", "value": 30 },
];

const data2 = [
    { "year": '2018-10', "type": "United States", "value": 11 },
    { "year": '2018-10', "type": "Florida", "value": 22 },
    { "year": '2018-10', "type": "xx", "value": 33 },
    { "year": '2018-11', "type": "United States", "value": 44 },
    { "year": '2018-11', "type": "Florida", "value": 55 },
    { "year": '2018-11', "type": "xx", "value": 66 },
    { "year": '2018-12', "type": "United States", "value": 77 },
    { "year": '2018-12', "type": "Florida", "value": 4.8 },
    { "year": '2018-12', "type": "xx", "value": 77 },
    { "year": '2019-01', "type": "United States", "value": 55 },
    { "year": '2019-01', "type": "Florida", "value": 66 },
    { "year": '2019-01', "type": "xx", "value": 444 },
    { "year": '2019-02', "type": "United States", "value": 66 },
    { "year": '2019-02', "type": "Florida", "value": 55 },
    { "year": '2019-02', "type": "xx", "value": 33 },
    { "year": '2019-03', "type": "United States", "value": 22 },
    { "year": '2019-03', "type": "Florida", "value": 11 },
    { "year": '2019-03', "type": "xx", "value": 33 },
];

const data3 = [
    { "year": '2018-10', "type": "United States", "value": 55 },
    { "year": '2018-10', "type": "Florida", "value": 23 },
    { "year": '2018-10', "type": "xx", "value": 66 },
    { "year": '2018-11', "type": "United States", "value": 15 },
    { "year": '2018-11', "type": "Florida", "value": 44 },
    { "year": '2018-11', "type": "xx", "value": 66 },
    { "year": '2018-12', "type": "United States", "value": 10 },
    { "year": '2018-12', "type": "Florida", "value": 4.8 },
    { "year": '2018-12', "type": "xx", "value": 66 },
    { "year": '2019-01', "type": "United States", "value": 80 },
    { "year": '2019-01', "type": "Florida", "value": 90 },
    { "year": '2019-01', "type": "xx", "value": 100 },
    { "year": '2019-02', "type": "United States", "value": 60 },
    { "year": '2019-02', "type": "Florida", "value": 70 },
    { "year": '2019-02', "type": "xx", "value": 60 },
    { "year": '2019-03', "type": "United States", "value": 100 },
    { "year": '2019-03', "type": "Florida", "value": 50 },
    { "year": '2019-03', "type": "xx", "value": 30 },
];
