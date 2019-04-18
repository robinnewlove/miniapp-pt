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
import Http                         from 'plugins/http.plugin'
import Modal                        from 'plugins/modal.plugin'
import Router                       from 'plugins/router.plugin'
import DataMixin                    from './data.mixin'

Page(Mixin({
    mixins: [
        DataMixin,
        StoreApiMixin,
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
        // this.reqStoreTypes();
        // 获取门店品牌
        // this.reqStoreBrands();
        // 获取所有产品品牌
        this.reqProductBrands();
        // 获取当前用户门店
        // this.reqStoresByUser();
        // 获取巡店详情
        this.reqStoresPlanById();
        // 获取门店详情
        this.reqStoreById();
    },
    // 初始化数据
    initData () {
        let {title, type, disabled} = this.data.params$;
        title = title || '新建巡店信息';
        wx.setNavigationBarTitle({title});
        this.setData({[`formData.More.status`]: !!disabled});
    },
    // 提交审核
    handleSubmit () {
        if (Valid.check(this.data.formData))
            return null;
        let data = Valid.input(this.data.formData, this.data.formHiddenData);
        let { StorePlanID } = this.data.params$;
        StorePlanID && (data.Id = StorePlanID);
        Http(Http.API.Do_createPatrolStorePlan, data).then((res) => {
            if (res) {
                Modal.toast('提交成功');
                Router.pop();
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
            StoreID,
        } = params$;
        if (typeof StoreID === 'undefined')
            return null;
        Http(Http.API.Req_storeById, {
            data: [StoreID],
        }).then((res) => {
            let data = res[0] || {};
            let {
                ProductBrandJson,
                Name,
                Id,
            } = data;
            if (ProductBrandJson)
                data.ProductBases = JSON.parse(ProductBrandJson);
            data.StoreName = Name;
            data.StoreID = Id;
            Valid.assignment(this, data, formData);
            Valid.assignment(this, data, formHiddenData, 'formHiddenData');
            this.setData({
                'formData.Photo.children.Img1.value': '',
                'formData.Photo.children.Img2.value': '',
                'formData.Photo.children.Img3.value': '',
                'formData.OtherExplain.value': '',
            })
        }).toast();
    },
    // 获取巡店详情
    reqStoresPlanById () {
        let {
            formData,
            params$,
            formHiddenData,
        } = this.data;
        let {
            StorePlanID,
        } = params$;
        if (typeof StorePlanID === 'undefined')
            return null;
        Http(Http.API.Req_storesPlanByID, {
            data: [StorePlanID],
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
            StorePlanID,
        } = this.data.params$;
        if (status === '3')
            return Router.push('supplement_index', {
                Id: StorePlanID,
                Status: status,
                from: 'patrol_info_index'
            });
        this.doAuditStorePlan(StorePlanID, status);
    },
    // 审核
    doAuditStorePlan (ID, Status) {
        Http(Http.API.Do_auditStorePlan, {
            ID,
            Status,
        }).then((res) => {
            res && Router.pop();
        }).toast();
    },
}));
