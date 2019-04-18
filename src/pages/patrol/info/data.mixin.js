

export default {
    data: {
        AuditContent: '',
        formHiddenData: {
            StoreTypeID: {
                label: '门店类型ID',
                value: '',
            },
            StoreID: {
                label: '门店ID',
                value: '',
            },
            StroeBrandID: {
                label: '门店品牌ID',
                value: '',
            },
            // AreaID: {
            //     label: '大区ID',
            //     value: '',
            // },
            // ProviceID: {
            //     label: '省id',
            //     value: '',
            // },
            // CityID: {
            //     label: '城市id',
            //     value: '',
            // },
            // CountyID: {
            //     label: '县级（区域）ID',
            //     value: '',
            // },

            // 纬度
            Latitude: {
                value: '',
            },

            // 经度
            Longitude: {
                value: '',
            },

        },
        formData: {
            StoreTypeName: {
                label: '类型',
                value: '',
                key: 'formData.StoreTypeName',
                mold: 'select',
                placeholder: '请选择',
                disabled: true,
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
            StoreName: {
                label: '店名',
                value: '',
                key: 'formData.StoreName',
                mold: 'select',
                placeholder: '请选择',
                disabled: true,
                nonempty: true,
                rangeKey: 'Name',
                contactKey: 'formHiddenData.StoreID',
                contactRangeKey: 'Id',
                options: [],
                use: [
                    {
                        nonempty: true,
                        prompt: '请选择入店名',
                    },
                ],
            },
            StoreBrandName: {
                label: '品牌名称',
                value: '',
                key: 'formData.StoreBrandName',
                mold: 'select',
                placeholder: '请选择',
                disabled: true,
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
            Location: {
                label: '定位',
                value: '',
                key: 'formData.Location',
                mold: 'address',
                latitudeKey: 'formHiddenData.Latitude',
                longitudeKey: 'formHiddenData.Longitude',
                placeholder: '获取位置',
                nonempty: true,
                use: [
                    {
                        nonempty: true,
                        prompt: '请获取位置',
                    },
                ],
            },
            Sujin: {
                label: '素金',
                mold: 'inputGroup',
                nonempty: true,
                children: {
                    Gold_Gram: {
                        label: '计克黄金',
                        value: '',
                        key: 'formData.Sujin.children.Gold_Gram',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入计克黄金',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '计克黄金输入有误',
                            },
                        ],
                    },
                    Gold_Piece: {
                        label: '计件黄金',
                        value: '',
                        key: 'formData.Sujin.children.Gold_Piece',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入计件黄金',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '计件黄金输入有误',
                            },
                        ],
                    },
                    Gold_K: {
                        label: 'K金',
                        value: '',
                        key: 'formData.Sujin.children.Gold_K',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入K金',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: 'K金输入有误',
                            },
                        ],
                    },
                    Platinum_Gram: {
                        label: '计克铂金',
                        value: '',
                        key: 'formData.Sujin.children.Platinum_Gram',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入计克铂金',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '计克铂金输入有误',
                            },
                        ],
                    },
                    Platinum_Piece: {
                        label: '计件铂金',
                        value: '',
                        key: 'formData.Sujin.children.Platinum_Piece',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入计件铂金',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '计件铂金输入有误',
                            },
                        ],
                    },
                },
            },
            Xq: {
                label: '镶嵌',
                mold: 'inputGroup',
                nonempty: true,
                children: {
                    Inlay_Platinum: {
                        label: '铂金镶嵌',
                        value: '',
                        key: 'formData.Xq.children.Inlay_Platinum',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入铂金镶嵌',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '铂金镶嵌输入有误',
                            },
                        ],
                    },
                    Inlay_K: {
                        label: 'K金镶嵌',
                        value: '',
                        key: 'formData.Xq.children.Inlay_K',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入K金镶嵌',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: 'K金镶嵌输入有误',
                            },
                        ],
                    },
                    Inlay_Diamond: {
                        label: '彩钻镶嵌',
                        value: '',
                        key: 'formData.Xq.children.Inlay_Diamond',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入彩钻镶嵌',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '彩钻镶嵌输入有误',
                            },
                        ],
                    },
                    Inlay_Pearl: {
                        label: '珍珠镶嵌',
                        value: '',
                        key: 'formData.Xq.children.Inlay_Pearl',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入珍珠镶嵌',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '珍珠镶嵌输入有误',
                            },
                        ],
                    },
                    Inlay_ChoiPo: {
                        label: '彩宝镶嵌',
                        value: '',
                        key: 'formData.Xq.children.Inlay_ChoiPo',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入彩宝镶嵌',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '彩宝镶嵌输入有误',
                            },
                        ],
                    },
                    Inlay_JadeCui: {
                        label: '玉翠镶嵌',
                        value: '',
                        key: 'formData.Xq.children.Inlay_JadeCui',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入玉翠镶嵌',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '玉翠镶嵌输入有误',
                            },
                        ],
                    },
                },
            },
            Other: {
                label: '其他',
                mold: 'inputGroup',
                nonempty: true,
                children: {
                    BareDrill: {
                        label: '裸钻',
                        value: '',
                        key: 'formData.Other.children.BareDrill',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入裸钻',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '裸钻输入有误',
                            },
                        ],
                    },
                    PearlJade: {
                        label: '珍珠玉翠',
                        value: '',
                        key: 'formData.Other.children.PearlJade',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        nonempty: true,
                        use: [
                            {
                                nonempty: true,
                                prompt: '请输入珍珠玉翠',
                            },
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '珍珠玉翠输入有误',
                            },
                        ],
                    },
                },
            },
            Explain: {
                mold: 'explain',
                nonempty: false,
                prompt: '柜台米数中，陈列米数最小单位为0.1米；如遇到数量极少的产品并分散陈列在柜台中，1-4个用0.01标注，4个以上用0.02标注。',
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
                        rule: (value) => {
                            return value.length !== 0;
                        },
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
                label: '费用照片',
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
            More: {
                label: '更多选项',
                mold: 'optional-group',
                key: 'formData.More',
                class: 'form-width',
                nonempty: false,
                status: false,
                children: {
                    Kg_SuPlatinum: {
                        label: '素铂金（公斤）',
                        value: '',
                        key: 'formData.More.children.Kg_SuPlatinum',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        use: [
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '素铂金（公斤）输入有误',
                            },
                        ],
                    },
                    KG_Platinum: {
                        label: '铂金镶嵌（公斤）',
                        value: '',
                        key: 'formData.More.children.KG_Platinum',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        use: [
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '铂金镶嵌（公斤）输入有误',
                            },
                        ],
                    },
                    Beset_Platinum: {
                        label: '铂金镶嵌（镶嵌）',
                        value: '',
                        key: 'formData.More.children.Beset_Platinum',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        use: [
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '铂金镶嵌（镶嵌）输入有误',
                            },
                        ],
                    },
                    Stock_Platinum: {
                        label: '库存铂金首饰（公斤）',
                        value: '',
                        key: 'formData.More.children.Stock_Platinum',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        use: [
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '库存铂金首饰（公斤）输入有误',
                            },
                        ],
                    },
                    SaleRecovery: {
                        label: '销售者回收（公斤）',
                        value: '',
                        key: 'formData.More.children.SaleRecovery',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        use: [
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '销售者回收（公斤）输入有误',
                            },
                        ],
                    },
                    BackPlatinum: {
                        label: '返厂铂金旧料（公斤）',
                        value: '',
                        key: 'formData.More.children.BackPlatinum',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        use: [
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '返厂铂金旧料（公斤）输入有误',
                            },
                        ],
                    },
                },
                children2: {
                    Counter: {
                        label: '柜台数',
                        value: '',
                        key: 'formData.More.children2.Counter',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        use: [
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '柜台数输入有误',
                            },
                        ],
                    },
                    CounterPerson: {
                        label: '柜台人员数',
                        value: '',
                        key: 'formData.More.children2.CounterPerson',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        use: [
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '柜台人员数输入有误',
                            },
                        ],
                    },
                    SaleOther: {
                        label: '其他珍宝销售（金额）',
                        value: '',
                        key: 'formData.More.children2.SaleOther',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        use: [
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '其他珍宝销售（金额）输入有误',
                            },
                        ],
                    },
                    Gold: {
                        label: '黄金',
                        value: '',
                        key: 'formData.More.children2.Gold',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        use: [
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '黄金输入有误',
                            },
                        ],
                    },
                    MosaicWhole: {
                        label: '镶嵌整体',
                        value: '',
                        key: 'formData.More.children2.MosaicWhole',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        use: [
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '镶嵌整体输入有误',
                            },
                        ],
                    },
                    Element_K: {
                        label: '素18K金',
                        value: '',
                        key: 'formData.More.children2.Element_K',
                        mold: 'input',
                        type: 'digit',
                        placeholder: '请输入',
                        use: [
                            {
                                rule: (value) => {
                                    return !isNaN(+value);
                                },
                                prompt: '素18K金输入有误',
                            },
                        ],
                    },
                },
            },
        },
    }
}
