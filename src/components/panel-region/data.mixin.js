
export default {
    data: {
        optionsHiddenData: {
            Status: {
                label: '状态',
                value: '',
            },
            ProviceID: {
                value: '',
            },
            CityID: {
                value: '',
            }
        },
        optionsData: {
            StatusName: {
                label: '状态',
                value: '',
                key: 'optionsData.StatusName',
                mold: 'select',
                rangeKey: 'Name',
                contactKey: 'optionsHiddenData.Status',
                contactRangeKey: 'Id',
                options: [
                    { Name: '全部', Id: '' },
                    { Name: '待审核', Id: '1' },
                    { Name: '已通过', Id: '2' },
                    { Name: '未通过', Id: '3' },
                ]
            },
            CityName: {
                label: '城市',
                value: '',
                mold: 'linkage',
                key: 'optionsData.CityName',
                rangeKey: 'Name',
                contactKey: 'optionsHiddenData.CityID',
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
        },
    }
}
