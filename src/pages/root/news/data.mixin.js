
export default {
    data: {
        formData: {
            Title: {
                label: '标题',
                value: '',
                type: 'text',
                mold: 'input',
                class: 'form-width',
                key: 'formData.Title',
                placeholder: '请输入',
                nonempty: true,
                max: 80,
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入标题',
                    },
                ],
            },
            Link: {
                label: 'URL',
                value: '',
                class: 'form-width',
                mold: 'input',
                type: 'text',
                key: 'formData.Link',
                placeholder: '请输入',
                max: 60,
                nonempty: false,
            },
            Content: {
                label: '内容',
                value: '',
                mold: 'textarea',
                type: 'text',
                class: 'form-width',
                key: 'formData.Content',
                placeholder: '请输入',
                nonempty: false,
            },
        }
    }
}
