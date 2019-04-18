
export default {
    data: {
        optionsHiddenData: {
            Status: {
                label: '状态',
                value: '',
            },
            AreaID: {
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
            Reset: {
                mold: 'reset',
            },
        },
    }
}
