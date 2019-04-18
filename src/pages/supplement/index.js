//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import Mixin                        from 'utils/mixin.util'
import Valid                        from 'utils/valid.util'
import Router                       from 'plugins/router.plugin'
import Http                         from 'plugins/http.plugin'
import Modal                        from 'plugins/modal.plugin'
import RouterMixin                  from 'mixins/router.mixin'
import FormMixin                    from 'mixins/form.mixin'
import DataMixin                    from './data.mixin'

Page(Mixin({
    mixins: [
        DataMixin,
        FormMixin,
        RouterMixin,
    ],
    onLoad (options) {
        this.routerGetParams(options)
    },
    // 提交审核
    handleSubmit () {
        if (Valid.check(this.data.formData))
            return null;
        let data = Valid.input(this.data.formData);
        let {
            Id,
            Status,
            from,
        } = this.data.params$;
        let API = from === 'patrol_info_index'
            ? Http.API.Do_auditStorePlan
            : Http.API.Do_auditStore;
        Http(API, {
            ID: Id,
            Status,
            ...data,
        }).then((res) => {
            Modal.toast('提交成功');
            Router.pop(2);
        }).toast();
    },
}));
