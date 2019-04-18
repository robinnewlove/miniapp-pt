import './index.json'
import './index.wxml'
import './index.scss'

Component({
    properties: {
        sourceData: {
            type: Object,
            value: {},
        },
    },
    data: {
        pickerArr: [],
    },
    lifetimes: {
        attached () {
            // 初始化数据
            this.initData();
        },
    },
    methods: {
        // 初始化数据
        initData () {
            let {
                children
            } = this.data.sourceData;
            let pickerArr = [];
            for (let k in children) {
                let picker = children[k];
                pickerArr.push(picker);
            }
            this.setData({pickerArr});
            this.updateData();
        },
        // 更新数据
        updateData (index = 0) {
            let {
                pickerArr,
                sourceData,
            } = this.data;
            let {
                value
            } = sourceData;
            let loop;
            let pickerData;
            if (index !== 0 && index < value.length) {
                pickerData = pickerArr[index - 1].options[value[index - 1]];
            }
            (loop = (arr, data) => {
                let picker = arr[index];
                if (!picker) return;
                let {
                    key,
                    source
                } = picker;
                source(data).then((options) => {
                    this.setData({
                        [key]: options
                    });
                    index++;
                    loop(arr, options[value[index - 1]]);
                }).catch((err) => {
                    this.triggerEvent('error', err);
                })
            })(pickerArr, pickerData);
        },
        bindChange (event) {
            let {
                value
            } = event.detail;
            let index = -1;
            let oldValue = this.data.sourceData.value;
            for (let i = 0; i < oldValue.length; i++) {
                if (oldValue[i] !== value[i] && index === -1){
                    index = i;
                }
            }
            if (index === -1) return null;
            for (let i = 0; i < value.length; i++) {
                if (i > index) value[i] = 0;
            }
            this.setData({
                [`sourceData.value`]: value,
            });
            index++;
            this.updateData(index);
        },
        handleCancel (event) {
            this.triggerEvent('cancel', event);
        },
        handleSure (event) {
            setTimeout(() => {
                let {
                    sourceData,
                    pickerArr,
                } = this.data;
                let { value } = sourceData;
                let result = [];
                pickerArr.forEach((picker, index) => {
                    let { options } = picker;
                    result.push(options[value[index]]);
                });
                this.triggerEvent('sure', {
                    result,
                    value,
                });
            }, 500)
        },
        bindNull (e) {},
    }
});
