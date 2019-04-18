//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import Mixin                        from 'utils/mixin.util'
import Valid                        from 'utils/valid.util'
import Http                         from 'plugins/http.plugin'
import Modal                        from 'plugins/modal.plugin'
import Router                       from 'plugins/router.plugin'
import InputMixin                   from 'mixins/input.mixin'
import FormMixin                    from 'mixins/form.mixin'
import DataMixin                    from './data.mixin'

Page(Mixin({
    mixins: [
        FormMixin,
        DataMixin,
        InputMixin,
    ],
    handleSubmit (e){
        if (Valid.check(this.data.formData))
            return null;
        let data = Valid.input(this.data.formData);
        Http(Http.API.Do_createNotice, data).then((res) => {
            if (res) {
                Modal.toast('发布成功');
                Router.pop();
            }
        }).toast();
    },
}));
