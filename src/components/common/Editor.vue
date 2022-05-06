<template>
    <div class="page">
        <div id="editor"></div>
    </div>
</template>

<script>
import wangEditor from 'wangeditor';
import { uploadImg } from '@/api/common';
import { Message } from 'element-ui';

export default {
    name: 'Editor',
    components: {},
    data() {
        return {
            editor: null,
            editorData: ''
        };
    },
    mounted() {
        this.initEditor();
    },
    methods: {
        initEditor() {
            const editor = new wangEditor(`#editor`);

            editor.config.placeholder = '发言请注意维护论坛环境';
            editor.config.focus = false;
            editor.config.menus = ['bold', 'italic', 'underline', 'link', 'quote', 'emoticon', 'image', 'code', 'undo', 'redo'];
            editor.config.height = 400;

            // 配置自定义 alert
            editor.config.customAlert = function(s, t) {
                switch (t) {
                    case 'success':
                        Message.success(s);
                        break;
                    case 'info':
                        Message.info(s);
                        break;
                    case 'warning':
                        Message.warning(s);
                        break;
                    case 'error':
                        Message.error(s);
                        break;
                    default:
                        Message.info(s);
                        break;
                }
            };

            // 调整z-index 否则会遮挡message提示
            editor.config.zIndex = 100;

            // 配置 图片上传 地址
            editor.config.uploadImgServer = 'common/upload_img';
            editor.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
            editor.config.uploadImgMaxLength = 1; // 一次最多上传 1 个图片
            editor.config.showLinkImg = false; // 隐藏上传网络图片的功能

            // 注意： 由于此处使用了wangEditor的自定义上传图片配置
            editor.config.customUploadImg = async function(resultFiles, insertImgFn) {
                // resultFiles 是 input 中选中的文件列表
                // insertImgFn 是获取图片 url 后，插入到编辑器的方法
                console.log(resultFiles);
                const result = await uploadImg(resultFiles[0]).then(res => res);
                console.log(result.data);
                insertImgFn(result.data);
            };

            // 配置 管理粘贴事件
            editor.config.pasteTextHandle = function(pasteStr) {
                // 自定义处理粘贴文本 目的是上传QQ截图图片
                // 后发现此功能该Editor已经自己实现 veryGood 嘿嘿
                return pasteStr;
            }

            // 配置 onchange 回调函数 将数据同步到vue中
            editor.config.onchange = newHtml => {
                this.editorData = newHtml;
            };

            editor.create();
            this.editor = editor;
        },
        getEditorData() {
            let data = this.editor.txt.html();
            return data;
        }
    },
    beforeDestroy() {
        // 调用销毁API对当前编辑器实例进行销毁
        this.editor.destroy();
        this.editor = null;
    }
};
</script>

<style scoped>
</style>
