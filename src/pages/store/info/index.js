//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import Mixin                        from 'utils/mixin.util'
import Valid                        from 'utils/valid.util'
import InputMixin                   from 'mixins/input.mixin'
import FormMixin                    from 'mixins/form.mixin'
import RouterMixin                  from 'mixins/router.mixin'
import StoreApiMixin                from 'mixins/store.api.mixin'
import AddressApiMixin              from 'mixins/address.api.mixin'
import Http                         from 'plugins/http.plugin'
import Modal                        from 'plugins/modal.plugin'
import Router                       from 'plugins/router.plugin'
import DataMixin                    from './data.mixin'

Page(Mixin({
    mixins: [
        DataMixin,
        StoreApiMixin,
        AddressApiMixin,
        InputMixin,
        FormMixin,
        RouterMixin,
    ],
    onLoad (options) {
        // 获取url参数
        this.routerGetParams(options);
        // 初始化数据
        this.initData();
        // 获取门店类型
        this.reqStoreTypes();
        // 获取门店品牌
        this.reqStoreBrands();
        // 获取所有产品品牌
        this.reqProductBrands();
        // 获取大区
        // this.reqDistrictsAreas({Data: 0}, 'formData.AreaName.options');
        // 获取门店详情
        this.reqStoreById();
    },
    // 初始化数据
    initData () {
        let title = this.data.params$.title || '新建门店信息';
        wx.setNavigationBarTitle({title});
    },
    // 表单输入回调
    formChangeCallback (event) {
        let { type, item, optItem } = event;
        if (type === 'select')
            this.addressFormChange(item, optItem);
    },
    // 提交审核
    handleSubmit () {
        if (Valid.check(this.data.formData))
            return null;
        let data = Valid.input(this.data.formData, this.data.formHiddenData);
        let { Id } = this.data.params$;
        Id && (data.Id = Id);
        Http(Http.API.Do_createStore, data).then((res) => {
            if (res) {
                Modal.toast('提交成功，等待大区主管审核通过');
                setTimeout(() => {
                    Router.push('store_list_index', { prompt: '提交成功，等待大区主管审核通过'}, true);
                }, 1200);
            }
        }).toast();
    },
    // 获取门店详情
    reqStoreById () {
        let {
            formData,
            params$,
            formHiddenData,
        } = this.data;
        let {
            Id,
        } = params$;
        if (typeof Id === 'undefined')
            return null;
        Http(Http.API.Req_storeById, {
            data: [Id],
        }).then((res) => {
            let data = res[0] || {};
            let {
                ProductBrandJson,
                AuditContent,
            } = data;
            if (ProductBrandJson)
                data.ProductBases = JSON.parse(ProductBrandJson);
            if (AuditContent)
                this.setData({AuditContent});
            Valid.assignment(this, data, formData);
            Valid.assignment(this, data, formHiddenData, 'formHiddenData');
        }).toast();
    },
    // 审核
    handleExamine (event) {
        let {
            status,
        } = event.currentTarget.dataset;
        let {
            Id,
        } = this.data.params$;
        if (status === '3')
        return Router.push('supplement_index', {
            Id,
            Status: status,
            from: 'store_info_index'
        });
        this.doAuditStore(Id, status);
    },
    // 审核
    doAuditStore (ID, Status) {
        Http(Http.API.Do_auditStore, {
            ID,
            Status,
        }).then((res) => {
            res && Router.pop();
        }).toast();
    },
}));

