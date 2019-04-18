//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import Mixin                        from 'utils/mixin.util'
import Valid                        from 'utils/valid.util'
import Http                         from 'plugins/http.plugin'
import File                         from 'plugins/file.plugin'
import Loading                      from 'plugins/loading.plugin'
import UserMixin                    from 'mixins/user.mixin'

Page(Mixin({
    mixins: [
        UserMixin,
    ],
    data: {
        currentLevel: 'city',
        optionsData: {},
        optionsHiddenData: {},
    },
    onLoad () {
        // 获取用户信息并且初始化数据
        this.userGet();
    },
    handleOption (event) {
        let {
            optionsData,
            optionsHiddenData,
        } = event.detail;
        this.setData({
            optionsData,
            optionsHiddenData,
        })
    },
    // 导航条切换
    handleMenu (event = {}) {
        let {
            detail
        } = event;
        switch (detail.icon) {
            // 门店管理
            case 'mdgl':

                break;
            // 查看巡店员
            case 'xjmd':

                break;
            // 下载巡店表
            case 'xzxdb':
                let data = Valid.input(this.data.optionsData, this.data.optionsHiddenData);
                data = Valid.filterNull(data);
                this.reqExportTableFile(Http.API.Req_exportStore, data);
                break;
            // 下载季度报告
            case 'xzjdbg':
                this.reqExportTableFile(Http.API.Req_exportReport);
                break;
        }
    },
    // 获取报告
    reqExportTableFile (url, data = {}) {
        let { UserLeve } = this.data.user$;
        data.Leve = UserLeve;
        return Http(url, data).then((res) => {
            Loading.show();
            if (!res) throw '没有文件';
            return File.downloadFile({url: res});
        }).then((res) => {
            let { statusCode, errMsg, tempFilePath} = res;
            if (statusCode !== 200) throw errMsg;
            return File.openDocument({
                filePath: tempFilePath,
                fileType: 'xlsx',
            });
        }).then((res) => {
            console.log(res)
        }).toast().finally(() => {
            Loading.hide();
        });
    },
}));
