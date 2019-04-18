import './index.json'
import './index.wxml'
import './index.scss'

import Mixin                        from 'utils/mixin.component.util'
import Valid                        from 'utils/valid.util'
import Http                         from 'plugins/http.plugin'
import Router                       from 'plugins/router.plugin'
import OptionsMixin                 from 'mixins/options.mixin'
import DataMixin                    from './data.mixin'
import {
    getRingChart,
    getBarChart,
}                                   from 'utils/chart.util'

const ringChart = getRingChart();
const barChart = getBarChart();

Component(Mixin({
    mixins: [
        DataMixin,
        OptionsMixin,
    ],
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {

    },
    data: {
        // 这里是一些组件内部数据
        tableData: {},
        totalCounterNum: '',
        totalStoreNum: '',
        ringOpts: {
            onInit: ringChart.init,
        },
        barOpts: {
            onInit: barChart.init,
        },
    },
    pageLifetimes: {
        show () {
            // 获取首页用户基础数据
            this.reqPlanAdIndex();
            // 获取超管查看巡店、门店统计明细
            // this.reqStaticsTikDetailAd();
        },
    },
    methods: {
        // 搜索选项改变之后的回调
        optionsChangeCallback (event) {
            let { type, item } = event;
            // 获取首页用户基础数据
            this.reqPlanAdIndex();
            // 获取超管查看巡店、门店统计明细
            // this.reqStaticsTikDetailAd();
        },
        // 获取超管首页搜索数据 (列表)
        reqPlanAdIndex () {
            let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
            data = Valid.filterNull(data);
            Http(Http.API.Req_planAdIndex, data).then((res) => {
                let tableData = res || [];
                this.setData({ tableData });
                // 更新饼图图表数据
                this.updateChartData(tableData);
            }).toast();
        },
        // 更新饼图图表数据
        updateChartData (data) {
            let ringData = [];
            let barData = [];
            let totalCounterNum = 0;
            let totalStoreNum = 0;
            data.forEach((item) => {
                let {
                    AreaName,
                    StoreNum,
                    PassNum,
                    CounterNum,
                } = item;
                if (CounterNum) totalCounterNum += CounterNum;
                if (StoreNum) totalStoreNum += StoreNum;
                ringData.push({
                    name: AreaName,
                    percent: CounterNum || 0,
                    a: '1',
                });
                barData.push({
                    State: AreaName,
                    Label: '门店数量',
                    Num: StoreNum
                },{
                    State: AreaName,
                    Label: '通过数量',
                    Num: PassNum
                })
            });
            setTimeout(() => {
                ringChart.update(ringData);
                barChart.update(barData);
            }, 800);
            this.setData({
                totalCounterNum,
                totalStoreNum,
            })
        },
        // 获取超管查看巡店、门店统计明细
        reqStaticsTikDetailAd () {
            let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
            data = Valid.filterNull(data);
            Http(Http.API.Req_statistikDetailAd, data).then(() => {

            }).toast();
        },
        // 图表查看更多
        handleJumpChart (event) {
            let {
                type,
            } = event.currentTarget.dataset;
            if (type === 'counter') {
                Router.push('root_chart_index', {
                    type,
                    title: '查看城市柜台米数图表',
                });
            } else if (type === 'store') {
                Router.push('root_chart_index', {
                    type,
                    title: '查看城市巡店图表',
                });
            }
        }
    },
}));
