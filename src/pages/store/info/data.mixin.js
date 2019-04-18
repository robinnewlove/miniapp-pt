

export default {
    data: {
        AuditContent: '',
        formHiddenData: {
            StoreTypeID: {
                label: '门店类型ID',
                value: '',
            },
            StroeBrandID: {
                label: '门店品牌ID',
                value: '',
            },
            AreaID: {
                label: '大区ID',
                value: '',
            },
            ProviceID: {
                label: '省id',
                value: '',
            },
            CityID: {
                label: '城市id',
                value: '',
            },
            CountyID: {
                label: '县级（区域）ID',
                value: '',
            },
        },
        formData: {
            Name: {
                label: '店名',
                value: '',
                key: 'formData.Name',
                mold: 'input',
                placeholder: '请输入',
                nonempty: true,
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入店名',
                    },
                ],
            },
            StoreTypeName: {
                label: '类型',
                value: '',
                key: 'formData.StoreTypeName',
                mold: 'select',
                placeholder: '请选择',
                nonempty: true,
                rangeKey: 'Name',
                contactKey: 'formHiddenData.StoreTypeID',
                contactRangeKey: 'ID',
                options: [],
                use: [
                    {
                        nonempty: true,
                        prompt: '请选择类型',
                    },
                ],
            },
            StoreBrandName: {
                label: '品牌名称',
                value: '',
                key: 'formData.StoreBrandName',
                mold: 'select',
                placeholder: '请选择',
                nonempty: true,
                rangeKey: 'Name',
                contactKey: 'formHiddenData.StroeBrandID',
                contactRangeKey: 'ID',
                options: [],
                use: [
                    {
                        nonempty: true,
                        prompt: '请选择品牌名称',
                    },
                ],
            },
            Null: {},
            AreaName: {
                label: '大区',
                value: '',
                mold: 'linkage',
                placeholder: '请选择',
                key: 'formData.AreaName',
                rangeKey: 'Name',
                contactKey: 'formHiddenData.AreaID',
                contactRangeKey: 'Code',
                options: [],
                use: [
                    {
                        nonempty: true,
                        prompt: '请选择大区',
                    },
                ],
            },
            ProviceName: {
                label: '省份',
                value: '',
                mold: 'linkage',
                placeholder: '请选择',
                key: 'formData.ProviceName',
                rangeKey: 'Name',
                contactKey: 'formHiddenData.ProviceID',
                contactRangeKey: 'Code',
                options: [],
                use: [
                    {
                        nonempty: true,
                        prompt: '请选择省份',
                    },
                ],
            },
            CityName: {
                label: '城市',
                value: '',
                mold: 'linkage',
                placeholder: '请选择',
                key: 'formData.CityName',
                rangeKey: 'Name',
                contactKey: 'formHiddenData.CityID',
                contactRangeKey: 'Code',
                options: [],
                use: [
                    {
                        nonempty: true,
                        prompt: '请选择城市',
                    },
                ],
            },
            CountyName: {
                label: '区域',
                value: '',
                mold: 'linkage',
                placeholder: '请选择',
                key: 'formData.CountyName',
                rangeKey: 'Name',
                contactKey: 'formHiddenData.CountyID',
                contactRangeKey: 'Code',
                options: [],
                use: [
                    {
                        nonempty: true,
                        prompt: '请选择区域',
                    },
                ],
            },
            Address: {
                label: '详细地址',
                value: '',
                key: 'formData.Address',
                mold: 'input',
                class: 'form-width',
                placeholder: '请输入',
                nonempty: true,
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入详细地址',
                    },
                ],
            },
            ProductBases:  {
                label: '产品品牌',
                value: [],
                class: 'form-width',
                mold: 'checkboxGroup',
                nonempty: true,
                checkbox: [],
                use: [
                    {
                        nonempty: true,
                        prompt: '请选择产品品牌',
                    },
                ]
            },
            OtherExplain: {
                label: '其他特别说明',
                value: '',
                key: 'formData.OtherExplain',
                mold: 'input',
                class: 'form-width',
                placeholder: '请输入',
                nonempty: false,
            },
            Photo: {
                label: '门店照片',
                mold: 'uploadGroup',
                class: 'form-width50',
                placeholder: '请上传',
                nonempty: false,
                children: {
                    Img1: {
                        label: '近景',
                        value: '',
                    },
                    Img2: {
                        label: '中景',
                        value: '',
                    },
                    Img3: {
                        label: '远景',
                        value: '',
                    },
                },
            },
            Explain2: {
                mold: 'explain',
                class: 'form-width50',
                prompt: '近景为柜台内陈列或POSM细节；中景为铂金销售区域或铂金专区；远景为整个门店的形象。',
            },
        },
    },
}
