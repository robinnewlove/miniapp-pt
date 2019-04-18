
export default {
    data: {
        menu$: {
            root: [
                {
                    icon: 'fbxx',
                    text: '发布消息',
                    url: 'root_news_index',
                },
                {
                    icon: 'ckxdy',
                    text: '查看巡店员',
                    url: 'staff_list_index',
                },
                {
                    icon: 'ckxdsj',
                    text: '查看巡店数据',
                    url: 'patrol_list_index',
                },
                {
                    icon: 'ckmdsj',
                    text: '查看门店数据',
                    url: 'store_list_index',
                },
                {
                    icon: 'ckjdbg',
                    text: '查看季度报告',
                    url: 'report_list_index',
                },
            ],
            region: [
                {
                    icon: 'mdgl',
                    text: '门店管理',
                    url: 'store_list_index',
                },
                {
                    icon: 'xjmd',
                    text: '城市级巡店员',
                    url: 'staff_list_index',
                },
            ],
            city: [
                {
                    icon: 'mdgl',
                    text: '门店管理',
                    url: 'store_list_index',
                },
                {
                    icon: 'xjmd',
                    text: '新建门店',
                    url: 'store_info_index',
                },
                {
                    icon: 'xzxdb',
                    text: '下载巡店表',
                },
                {
                    icon: 'xzjdbg',
                    text: '下载季度报告',
                },
            ],
        },
        userList: [],
    },
}
