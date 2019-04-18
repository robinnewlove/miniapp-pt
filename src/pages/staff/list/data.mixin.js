
export default {
    data: {
        optionsHiddenData: {
            AreaID: {
                value: '',
            },
        },
        optionsData: {
            AreaName: {
                label: '大区',
                value: '',
                key: 'optionsData.AreaName',
                mold: 'select',
                rangeKey: 'Name',
                contactKey: 'optionsHiddenData.AreaID',
                contactRangeKey: 'Code',
                options: []
            },
            Name: {
                label: '搜索',
                value: '',
                key: 'optionsData.Name',
                mold: 'search',
                placeholder: '请输入门店名称关键词',
            },
            Reset: {
                mold: 'reset',
            },
        },
        tableHeadData: {
            Name: {
                text: '巡店员',
            },
            AreaName: {
                text: '大区',
            },
            CityName: {
                text: '城市',
            },
            Stores: {
                text: '负责门店',
            },
            PlanNum: {
                text: '本月巡店',
            },
            Kpi: {
                text: 'KPI',
            },
            PassNum : {
                text: '完成度',
            },
            PrimeGold: {
                text: '素金合计（米）',
            },
            InlayGold: {
                text: '镶嵌合计（米）',
            },
            OtherGold: {
                text: '其他合计（米）',
            },
        },

    }
}
