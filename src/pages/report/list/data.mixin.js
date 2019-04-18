
export default {
    data: {
        optionsHiddenData: {
            AreaID: {
                value: '',
            },
            Status: {
                label: '状态',
                value: '',
            },
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
                key: 'StoreName',
            },
            StoreBrandName: {
                text: '品牌名称',
                key: 'StoreBrandName',
            },
            Year: {
                text: '上次季报上传时间',
                key: 'Year',
            },
            Quarter: {
                text: '季度',
                key: 'Quarter',
            },
            Timeliness: {
                text: '及时性',
                key: 'Timeliness',
            },
            Accuracy: {
                text: '准确性',
                key: 'Accuracy',
            },
            Integrity: {
                text: '完整性',
                key: 'Integrity',
            },
        },

    }
}
