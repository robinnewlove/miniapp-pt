
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
            AreaName: {
                text: '大区'
            },
            CityName: {
                text: '城市'
            },
            Name: {
                text: '门店名称'
            },
            StoreTypeName: {
                text: '门店类型'
            },
            StoreBrandName: {
                text: '品牌名称'
            },
            ApplyUserName: {
                text: '创建人'
            },
            StoreStatus: {
                text: '状态',
                mold: 'status',
            },
            PlanNum: {
                text: '已巡店次数'
            },
            IsPatrol: {
                text: '巡店开关',
                key: 'IsPatrol',
                mold: 'switch',
            },
            IsReport: {
                text: '季报开关',
                key: 'IsReport',
                mold: 'switch',
            },
            IsFee : {
                text: '营销支持',
                key: 'IsFee ',
                mold: 'switch',
            },
            HANDLE: {
                text: '操作',
                key: 'HANDLE',
                mold: 'HANDLE',
                buttons: {
                    see: {
                        label: '查看'
                    },
                    update: {
                        label: '修改'
                    },
                    examine: {
                        label: '审核'
                    },
                    examined: {
                        label: '已审核'
                    },
                    IsDele: {
                        label: '删除'
                    },
                }
            },
        },

    }
}
