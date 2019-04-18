
export default {
    data: {
        optionsHiddenData: {
            AreaID: {
                value: '',
            }
        },
        optionsData: {
            AreaName: {
                label: '大区',
                value: '',
                mold: 'select',
                key: 'optionsData.AreaName',
                rangeKey: 'Name',
                contactKey: 'optionsHiddenData.AreaID',
                contactRangeKey: 'Code',
                options: []
            },
            Date: {
                label: '时间',
                mold: 'date',
                children: {
                    BeginDate: {
                        value: '',
                        key: 'optionsData.Date.children.BeginDate',
                        label: '开始时间',
                    },
                    EndDate: {
                        value: '',
                        class: 'last-child',
                        key: 'optionsData.Date.children.EndDate',
                        label: '结束时间',
                    },
                },
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
            Down: {
                label: '下载明细表',
                value: '',
                mold: 'down',
                class: 'down-box',
            },
        },
        tableHeadData: {
            StoreName: {
                text: '门店名称',
            },
            StoreBrandName: {
                text: '品牌名称',
            },
            LastPlanTime: {
                text: '上次巡店时间',
            },
            PatrolName: {
                text: '巡店人',
            },
            PlanNum: {
                text: '状态',
            },
            HANDLE: {
                text: '操作',
                mold: 'HANDLE',
                buttons: {
                    seePatrol: {
                        label: '查看'
                    },
                }
            },
        },

    }
}
