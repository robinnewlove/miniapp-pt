

export default {
    data: {
        formData: {
            Content: {
                label: '审核不通过原因',
                value: '',
                class: 'form-width',
                key: 'formData.Content',
                mold: 'textarea',
                placeholder: '请输入',
                nonempty: true,
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入店名',
                    },
                ],
            },
        },
    },
}
