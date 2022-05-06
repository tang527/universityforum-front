<template>
    <div>
        <Top id="top" />
        <ul class="aside_float_bar">
            <li class="el-icon-my-msg">
                <a href="#post"></a>
            </li>
            <li class="el-icon-my-top">
                <a href="#" @click="toTop"></a>
            </li>
        </ul>
        <div></div>
        <div id="wrapper">
            <el-main>
                <el-card id="header" v-if="pageNum == 1">
                    <!-- 此处是发帖人的内容 -->
                    <el-row :gutter="50">
                        <el-col :span="3" class="com-col">
                            <span class="user-name">{{ article.artUserName }}</span>
                            <el-divider></el-divider>
                            <div class="avatar">
                                <!-- todo 他人空间 -->
                                <a href="#" target="_blank">
                                    <img :src="defaultImg" v-real-img="article.artUserAvatar" />
                                </a>
                            </div>
                        </el-col>
                        <el-divider class="divider-vertical" direction="vertical"></el-divider>
                        <el-col :span="9" class="com-col">
                            <h2>
                                <span id="title">{{ article.artTitle }}</span>
                            </h2>
                            <i class="el-icon-position subtitle">发表于 {{ article.artCreated }}</i>
                            <div v-html="article.artContent"></div>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card class="comment-card" v-for="(comment, index) in comments" :key="index">
                    <!-- 此处是回复者的内容 -->
                    <el-row :gutter="50">
                        <el-col :span="3" class="com-col">
                            <span class="user-name">{{ comment.comUserName }}</span>
                            <el-divider></el-divider>
                            <div class="avatar">
                                <!-- todo 他人空间 -->
                                <a href="#" target="_blank">
                                    <img :src="defaultImg" v-real-img="comment.comUserAvatar" />
                                </a>
                            </div>
                        </el-col>
                        <el-divider class="divider-vertical" direction="vertical"></el-divider>
                        <el-col :span="19">
                            <i class="el-icon-position subtitle">发表于 {{ comment.comCreated }}</i>
                            <div class="post_content" v-html="comment.comContent"></div>
                            <!-- 其他人的回复 -->
                            <div class="reply_area">
                                <!-- 使用float时会使元素脱离文档流 所以此处的两个float div是顺序相反的 并且需要父级元素清除浮动 -->
                                <div class="reply_area_tail clearfix">
                                    <div class="reply_area_tail_btn">
                                        <el-button v-if="!comment.fold" class="tail_info" type="text" @click="fold(comment)">收起回复</el-button>
                                        <el-button v-else class="tail_info" type="text" @click="unfold(comment)"
                                            >回复<span v-if="comment.comMultiRespVOList != 0">({{ comment.comMultiRespVOList.length }})</span></el-button
                                        >
                                    </div>
                                    <div class="reply_area_tail_core">
                                        <span class="tail_info"
                                            ><i class="el-icon-warning-outline" /><el-button @click="reportComment(comment)" type="text">举报</el-button
                                            ><span class="tail_info">{{ comment.comCreated }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="reply_area_wrapper" v-show="!comment.fold">
                                    <div class="reply_area_content">
                                        <ul>
                                            <!-- 此处传入的comment.multiSize 最大为5 若不足5则显示为实际长度 -->
                                            <li v-for="(multiCom, index) in comment.comMultiRespVOList.slice(0, comment.multiSize)" :key="index">
                                                <img class="reply_area_user_avatar" :src="defaultImg" v-real-img="multiCom.multiUserAvatar" />
                                                <div class="reply_area_details" >
                                                    <a class="reply_user_name" href="#" target="_blank">{{ multiCom.multiUserName }}</a>
                                                    :&nbsp;
                                                    <span v-if="multiCom.multiRepliedUserId && multiCom.multiType == 1"
                                                        >回复
                                                        <a class="reply_user_name" href="#" target="_blank"> {{ multiCom.multiRepliedUserName }} </a> ：</span
                                                    >
                                                    <span>{{ multiCom.multiContent }}</span>
                                                    <div class="reply_area_tip">
                                                        <el-button @click="reportMulti(multiCom)" class="report_multi_btn" type="text">举报</el-button>
                                                        {{ multiCom.multiComTime }}
                                                        <el-button @click="showTextAreaToUser(comment, multiCom)" type="text">回复</el-button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="reply_area_more clearfix">
                                        <div class="reply_area_more_tip" v-if="comment.comMultiRespVOList.length > 5 && comment.multiSize <= 5">
                                            <span>还有{{ comment.comMultiRespVOList.length - comment.multiSize }} 条回复，</span>
                                            <el-button type="text" @click="showMoreMulti(comment)">点击查看</el-button>
                                        </div>
                                        <div class="reply_area_post">
                                            <b-button size="is-small" type="is-primary" outlined @click="showTextArea(comment)">我来说一句</b-button>
                                        </div>
                                    </div>
                                    <div v-if="comment.showInput" class="reply_area_text_input clearfix">
                                        <el-input type="textarea" placeholder="请输入内容" v-model="multiComment.multiContent" maxlength="30" show-word-limit>
                                        </el-input>
                                        <el-button
                                            @click="postComMulti(comment)"
                                            class="reply_area_post_btn"
                                            type="primary"
                                            size="mini"
                                            icon="el-icon-position"
                                        ></el-button>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card v-if="pages >= 1" class="comment-card pagination">
                    <el-pagination
                        :total="total"
                        :current-page.sync="pageNum"
                        @current-change="changePageNum"
                        :page-size="pageSize"
                        background
                        layout="total, prev, pager, next, jumper"
                    ></el-pagination>
                </el-card>
                <el-divider v-if="!hasComments">啊哦，还没有人评论哦</el-divider>
            </el-main>
        </div>
        <div id="post">
            <div id="post_comment">
                <div class="post_comment_area">
                    <Editor ref="editor" />
                    <b-button class="post_comment_btn" type="is-primary" outlined @click="postComment">发表</b-button>
                </div>
            </div>
        </div>
        <el-dialog :close-on-click-modal=false title="论坛举报" :visible.sync="reportDialogVisible">
            <div class="report_dialog_wrapper">
                <div class="report_dialog_area">
                    <span class="report_tip">请选择举报类型</span>
                    <el-radio-group v-model="report.reportType">
                      <el-radio v-for="item in reportTypes" :label="item.typeId" :key="item.typeId">{{ item.typeName }}</el-radio>
                    </el-radio-group>
                </div>
                <div class="report_dialog_area">
                    <span class="report_tip">请填写举报理由</span>
                    <el-input 
                        type="textarea"
                        v-model="report.reportReason" 
                        :rows="6" 
                        maxlength="200"
                        show-word-limit
                        placeholder="理由请不要超出200个字哦">
                    </el-input>
                </div>
                <div class="report_dialog_area">
                    <span class="report_tip">请核实举报内容</span>
                    <div class="report_dialog_check_div clearfix">
                        <div class="report_avatar">
                            <img :src="defaultImg" v-real-img="reportDialogInfo.reportUserAvatar" />
                            <span>{{ reportDialogInfo.reportUserName }}</span>
                        </div>
                        <div class="report_content">
                            <span>回复
                                <span v-if="reportDialogInfo.reportKind == 2">帖子</span>
                                <span v-else-if="reportDialogInfo.reportKind == 1">楼层评论</span>
                            </span>
                            <div v-html="reportDialogInfo.reportCheck"></div>
                        </div>
                    </div>
                    <div class="report_dialog_area">
                        <el-button @click="postReport" type="primary">提交</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Top from '@/components/common/Top';
import Editor from '@/components/common/Editor';
import { getArticleDetails } from '@/api/article';
import { getArtComments, createMultiComment, createComment } from '@/api/comment';
import { getReportTypes, createReport } from '@/api/report';

export default {
    data() {
        return {
            defaultImg: this.ASSET.USER_IMG_SRC,
            article: {},
            comments: [],
            reportTypes: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            pages: 0,
            // 此属性控制只有一个text_area显示 避免出现多个的情况
            isTextAreaShow: false,
            lastShowTextArea: null,
            reportDialogVisible: false,
            reportDialogInfo: {
                reportUserName: '测试',
                reportUserAvatar: '',
                // 0 举报帖子 1 举报回复 2 举报用户
                reportKind: 0,
                reportCheck: ''
            },
            report: {
                reportKind: 0,
                reportReason: '',
                reportType: 0,
                reportUser: 0,
                reportedUser: 0,
                keyOne: 0,
                keyTwo: 0,
                keyThree: 0
            },
            multiComment: {
                artId: Number(this.$route.params.artId),
                comId: 0,
                multiUserId: 0,
                multiRepliedUserId: 0,
                // 此属性为全局共享 所有评论框均与之绑定
                multiContent: '',
                multiType: 0
            },
            comment: {
                comUserId: 0,
                content: '',
                artId: Number(this.$route.params.artId)
            }
        };
    },
    created() {
        this.getData();
    },
    mounted() {
        
    },
    methods: {
        getData() {
            this.getArticle();
            this.getComments();
            this.getTypes();
        },
        getArticle() {
            getArticleDetails(this.$route.params.artId).then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.article = res.data;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        getComments() {
            let params = { artId:Number(this.$route.params.artId), pageNum: this.pageNum, pageSize: this.pageSize };
            getArtComments(params).then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.comments = res.data.list;
                    this.total = res.data.total;
                    this.pageNum = res.data.pageNum;
                    this.pageSize = res.data.pageSize;
                    this.pages = res.data.pages;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        getTypes() {
            getReportTypes(0).then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.reportTypes = res.data;
                } else {
                    this.$message.error(res.message);
                }
            })

        },
        fold(item) {
            item.fold = true;
        },
        unfold(item) {
            this.showTextArea(item);
            item.fold = false;
        },
        // 显示隐藏的回复
        showMoreMulti(item) {
            item.multiSize = item.comMultiRespVOList.length;
            // 设置multiSize的值以便v-if失效
        },
        // 回复楼中楼的用户
        showTextAreaToUser(comment, multiCom) {
            this.showTextArea(comment);
            this.multiComment.multiRepliedUserId = multiCom.multiUserId;
            this.multiComment.multiType = 1;

            this.multiComment.multiContent = '回复 ' + multiCom.multiUserName + ' :';
        },
        showTextArea(item) {
            // 清除文本
            this.multiComment.multiContent = '';
            this.multiComment.comId = item.comId;
            this.multiComment.multiUserId = this.$store.state.user.userId;
            this.multiComment.multiRepliedUserId = item.comUserId;
            // 此处回复层主 设置为0
            this.multiComment.multiType = 0;
            // 已有显示
            if (this.isTextAreaShow) {
                this.lastShowTextArea.showInput = false;
                item.showInput = true;
                this.lastShowTextArea = item;
            } else {
                item.showInput = true;
                this.lastShowTextArea = item;
                this.isTextAreaShow = true;
            }
        },
        postComMulti(comment) {
            if (this.multiComment.multiType == 1) {
                let str = this.multiComment.multiContent;
                let index = str.indexOf(':');
                this.multiComment.multiContent = str.substr(index + 1);
            }
            createMultiComment(this.multiComment).then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    comment.comMultiRespVOList.push(res.data);

                    comment.showInput = false;
                    this.isTextAreaShow = false;
                    this.$message.success('回复成功!');

                    // 显示剩余未显示的回复
                    this.showMoreMulti(comment);
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        postComment() {
            this.comment.comUserId = this.article.artUserId;
            this.comment.content = this.$refs.editor.editorData
            createComment(this.comment).then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    // 评论成功后，重新获取数据 并提示发送成功
                    this.$refs.editor.editor.txt.clear()
                    this.getData();
                    this.$message.success('评论成功!');
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        changePageNum() {
            this.getComments();
        },
        reportMulti(multiCom) {
            this.reportDialogInfo.reportUserName = multiCom.multiUserName;
            this.reportDialogInfo.reportUserAvatar = multiCom.multiUserAvatar;
            this.reportDialogInfo.reportKind = 1;
            this.reportDialogInfo.reportCheck = multiCom.multiContent;
            this.report.reportKind = 1;
            this.report.reportUser = this.$store.state.user.userId;
            this.report.reportedUser = multiCom.multiUserId;

            this.report.keyOne = multiCom.artId;
            this.report.keyTwo = multiCom.comId;
            this.report.keyThree = multiCom.multiId;

            this.reportDialogVisible = true;
        },
        reportComment(comment) {
            this.reportDialogInfo.reportUserName = comment.comUserName;
            this.reportDialogInfo.reportUserAvatar = comment.comUserAvatar;
            this.reportDialogInfo.reportKind = 2;
            this.reportDialogInfo.reportCheck = comment.comContent;
            this.report.reportKind = 2;
            this.report.reportUser = this.$store.state.user.userId;
            this.report.reportedUser = comment.comUserId;

            this.report.keyOne = comment.comId;

            this.reportDialogVisible = true;
        },
        postReport() {
            let types = [];
            for (let i = 0; i < this.reportTypes.length; i++) {
                types.push(this.reportTypes[i].typeId);
            }
            if(types.includes(this.report.reportType)) {
                let data = {
                    reportedUserId: this.report.reportedUser,
                    reportKind: this.report.reportKind,
                    reportTypeId: this.report.reportType,
                    reportReason: this.report.reportReason
                }
                if(this.report.reportKind == 2) {
                    data.keyOne = this.report.keyOne;
                } else if(this.report.reportKind == 1) {
                    data.keyOne = this.report.keyOne;
                    data.keyTwo = this.report.keyTwo;
                    data.keyThree = this.report.keyThree;
                }
                createReport(data).then(res => {
                    if (res.code == this.NET.SUCCESS_CODE) {
                        this.$message.success('举报成功！请等待官方处理');
                        this.reportDialogVisible = false;
                    } else {
                        this.$message.error(res.message);
                    }
                })
            } else {
                this.$message.warning("请选择举报类型！");
            }
        },
        // 滚动到顶部的方法
        toTop() {
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            const timeTop = setInterval(() => {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                if (top <= 0) {
                    clearInterval(timeTop);
                }
            }, 10);
        }
    },
    computed: {
        // 是否具有回复
        hasComments: function() {
            return this.comments.length != 0;
        }
    },
    components: {
        Top,
        Editor
    }
};
</script>

<style scoped>
#wrapper {
    width: 70rem;
    margin: 0 auto;
}
.com-col {
    width: auto !important;
    max-width: 70%;
}
.user-name {
    font: 0.75rem;
    font-weight: bold;
}
#header {
    margin-top: 1rem !important;
    margin: 0.5rem;
    padding: 0.5rem;
}
.comment-card {
    margin-top: 1rem !important;
    margin: 0.5rem;
    padding: 0.5rem;
}

.avatar {
    margin: 10px 15px;
}
.avatar img {
    padding: 5px 5px 8px;
    width: 120px;
    object-fit: cover;
    display: block;
}
.report_avatar img {
    width: 60px;
    object-fit: cover;
    display: block;
}
.report_avatar {
    text-align: center;
    margin-right: 15px;
    float: left;
}
#title {
    font: 700 16px 'Microsoft Yahei', 'Hei', Tahoma, 'SimHei', sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
}
.subtitle {
    margin-top: 1rem;
    font-size: 0.75rem;
}
/* 设置竖直分割线 */
.divider-vertical {
    height: 100% !important;
    position: absolute !important;
}
.post_content {
    font-size: 15px;
    word-wrap: break-word;
    overflow: hidden;
    min-height: 170px;
}
/* 回复区域 */
.reply_area {
}
.reply_area_tail {
    font-size: 12px !important;
}
.reply_area_tail_btn {
    float: right;
}

.reply_area_tail_core {
    position: relative;
    float: right;
    color: #999;
}
.reply_area .tail_info {
    display: inline-block;
    margin: 0 4px;
}
.reply_area_wrapper {
    background: #f7f8fa;
    border: 1px solid #f0f1f2;
    padding: 4px 15px 14px;
}
.reply_area_content li {
    padding-top: 10px;
}
.reply_area_content {
}
.reply_area_user_avatar {
    float: left;
    width: 32px;
    height: 32px;
    border: 0;
}
.reply_area_details {
    font-size: 14px;
    margin-left: 45px;
    zoom: 1;
    word-wrap: break-word;
    word-break: break-all;
}
.reply_user_name {
    font-size: 12px;
    color: #2d64b3;
    text-decoration: none;
}
.reply_area_tip {
    text-align: right;
}
.reply_area_more_tip {
    color: #707070;
    font-size: 12px;
}
.reply_area_post {
    float: right;
}
.reply_area_text_input {
    margin-top: 20px;
}
.reply_area_post_btn {
    margin: 10px;
    float: right;
}
/* 清除浮动 */
.clearfix:after {
    content: ' ';
    display: block;
    clear: both;
}
.aside_float_bar {
    position: fixed;
    left: 50%;
    bottom: 15rem;
    margin-left: 34rem;
    z-index: 1005;
}
.aside_float_bar li {
    display: block;
    margin-top: 25px;
    padding: 0px;
}
.aside_float_bar li a {
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -24px;
    width: 48px;
    height: 48px;
}

#post {
    width: 70rem;
    margin: 0 auto;
}
#post_comment {
    padding: 20px;
}

.post_comment_area {
    margin-top: 1rem !important;
    margin: 0.5rem;
    padding: 0.5rem;
}
.post_comment_btn {
    margin-top: 0.5rem;
}
.report_multi_btn {
    display: none;
}
.reply_area_details:hover .report_multi_btn {
    display: initial;
}

.report_dialog_wrapper {
    padding: 20px 60px 40px;
}
.report_dialog_area {
    margin: 25px;
}
.report_tip {
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 15px;
}
.report_dialog_check_div {
    overflow: hidden;
    border: 1px solid #e5e5e5;
    padding: 20px;
    margin-bottom: 20px;
    zoom: 1;
}
.report_content {
    float: left;
}
</style>