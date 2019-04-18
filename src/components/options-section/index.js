import './index.json'
import './index.wxml'
import './index.scss'

import Mixin                        from 'utils/mixin.component.util'
import Modal                        from 'plugins/modal.plugin'
import LinkageDataMixin             from 'mixins/linkage.data.mixin'

Component(Mixin({
    mixins: [
        LinkageDataMixin,
    ],
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        optionsData: {
            type: Object,
            value: [],
        },
        linkageNoUse: {
            type: Array,
            value: [],
        }
    },
    data: {
        isShowLinkage: false,
    },
    lifetimes: {
        attached () {
            let {
                sourceData,
                linkageNoUse,
            } = this.data;
            linkageNoUse.forEach((key) => {
                sourceData.value.pop();
                delete sourceData.children[key];
            });
            this.setData({sourceData});
        },
    },
    methods: {
        handle (event) {
            let {
                detail,
                currentTarget,
            } = event;
            let {
                value
            } = detail;
            let {
                key,
                item,
            } = currentTarget.dataset;
            return {
                value,
                key,
                item,
            }
        },
        handleSelectChange (event) {
            let data = this.handle(event);
            this.triggerEvent('select', data);
        },
        handleInput (event) {
            let data = this.handle(event);
            this.triggerEvent('input', data);
        },
        handleInputClear (event) {
            let data = this.handle(event);
            this.triggerEvent('clear', data);
        },
        handleDown (event) {
            let data = this.handle(event);
            this.triggerEvent('down', data);
        },
        handleConfirm (event) {
            let data = this.handle(event);
            this.triggerEvent('confirm', data);
        },
        handleDate (event) {
            let data = this.handle(event);
            this.triggerEvent('date', data);
        },

        handleLinkage (event) {
            this.setData({
                isShowLinkage: true,
            });
            this.triggerEvent('pop', {hidePop: false});
        },
        handleLinkageCancel () {
            this.setData({
                isShowLinkage: false,
            });
            this.triggerEvent('pop', {hidePop: true});
        },
        handleLinkageError (err) {
            Modal.toast(err);
            this.setData({
                isShowLinkage: false,
            });
            this.triggerEvent('pop', {hidePop: true});
        },
        handleReset (event) {
            this.triggerEvent('reset', event);
        },
        handleLinkageSure (event) {
            let {
                value,
                result,
            } = event.detail;
            let {
                linkageNoUse
            } = this.data;
            // this.setData({
            //     ['sourceData.value']: value,
            // });
            this.triggerEvent('linkage', {
                result,
                linkageNoUse,
            });
            this.triggerEvent('pop', {hidePop: true});
            this.setData({
                isShowLinkage: false,
            });
        },
    }
}));
