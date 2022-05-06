<template>
    <div class="page">
        <Top />
        <div class="tile is-parent msg-box">
            <article class="tile box">
                

                <el-aside>
                <div class="msg-aside">
                    <p class="subtitle">消息中心</p>
                    <el-menu
                    :default-active="String(activeMsgType)"
                    class="el-menu-vertical-demo"
                    background-color="#1570AE"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                >
                    <el-menu-item v-for="item in msgTypes" :key="item.typeId" :index="String(item.typeId)" @click="changeType(item)" >
                        <span>{{ item.typeName }}</span>
                    </el-menu-item>
                </el-menu>
                </div>
                </el-aside>
                <el-main>
                    <div class="msg-wrapper">
                        <el-card class="wrapper-title">
                            <div>
                                <span>{{ msgTypes[activeMsgType - 1].typeName }}</span>
                            </div>
                        </el-card>
                        <el-card v-show="activeMsgType == 1" v-for="(item, index) in artMsgList" :key="index">
                            <div class="feed_title">
                                <div class="msg-send-user">{{ item.msgSendUserName }}:&nbsp;</div>
                                <div class="msg-content">{{ item.msgContent }}</div>
                            </div>
                            <div class="feed_from">
                                <span v-if="item.msgContent == ''" class="msg-tip">
                                    点赞了你的帖子
                                </span>
                                <span v-else class="msg-tip">
                                    评论了你的帖子
                                </span>
                                &nbsp;&nbsp;&nbsp;
                                <a @click="linkToArticle(item.relatedId)" target="_blank">"{{ item.relatedTitle }}"</a>
                                <span style="float:right">{{ item.msgCreated }}</span>
                            </div>
                        </el-card>
                        
                        <el-card v-show="activeMsgType == 2" v-for="(item, index) in receiveMsgList" :key="index">
                            <div class="feed_title">
                                <div class="msg-send-user">{{ item.msgSendUserName }}:&nbsp;</div>
                                <div class="msg-content">{{ item.msgContent }}</div>
                            </div>
                            <div class="feed_from">
                                <span class="msg-tip">
                                    回复了你
                                </span>
                                &nbsp;&nbsp;&nbsp;
                                <a @click="linkToArticle(item.relatedId)" target="_blank">"{{ item.relatedTitle }}"</a>
                                <span style="float:right">{{ item.msgCreated }}</span>
                            </div>
                        </el-card>

                        <el-card v-show="activeMsgType == 3" v-for="(item, index) in systemMsgList" :key="index">
                            <div class="feed_title">
                                <div class="msg-send-user">{{ item.msgSendUserName }}:&nbsp;</div>
                                <div class="msg-content">{{ item.msgContent }}</div>
                            </div>
                            <div class="feed_from">
                                <span class="msg-tip">
                                    以<span class="emphasize-font">{{ item.additionalMsg }}</span>为由举报了你在
                                </span>
                                &nbsp;&nbsp;&nbsp;
                                <a @click="linkToArticle(item.relatedId)" target="_blank">"{{ item.relatedTitle }}"</a> 帖子下的<span v-if="item.msgKind == 2">评论</span><span v-else>回复</span>
                                <span style="float:right">{{ item.msgCreated }}</span>
                            </div>
                        </el-card>

                        <el-card v-show="(activeMsgType == 1 && artMsgList.length==0) || (activeMsgType == 2 && receiveMsgList.length==0) || (activeMsgType == 3 && systemMsgList.length==0)" >
                            <div class="feed_img">
                                <img :src="noDataImgSrc" />
                            </div>
                        </el-card>

                    </div>

                </el-main>
            </article>
        </div>
    </div>
</template>

<script>
import Top from '@/components/common/Top';
import { getArticleMsg, getCommentMsg, getSystemMsg } from '@/api/msg';
export default {
    name: 'Msg',
    data() {
        return {
            activeMsgType: 1,
            msgTypes: [
                {typeId: 1, typeName: "帖子相关"},
                {typeId: 2, typeName: "回复我的"},
                {typeId: 3, typeName: "系统通知"}
            ],
            artMsgList: [
                // {}
            ],
            receiveMsgList: [
                // {}
            ],
            systemMsgList: [
                // {}
            ],
            noDataImgSrc: this.ASSET.NO_DATA_SRC
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.getArtMsgList();
            this.getReceiveMsgList();
            this.getSystemMsgList();
        },
        getArtMsgList() {
            getArticleMsg().then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.artMsgList = res.data;
                    // this.typeLoading = false;
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        getReceiveMsgList() {
            getCommentMsg().then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.receiveMsgList = res.data;
                    // this.typeLoading = false;
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        getSystemMsgList() {
            getSystemMsg().then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    this.systemMsgList = res.data;
                    // this.typeLoading = false;
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        changeType(msgType){
            console.log(msgType);
            this.activeMsgType = msgType.typeId;
        },
        linkToArticle(artId) {
            console.log(artId);
            this.$router.push({
                name: 'Details',
                params: { artId: artId }
            });
        }
    },
    components: {
        Top
    }
};
</script>

<style scoped>
.msg-box {
    width: 80%;
    margin: auto;
    padding: 2rem;
    min-height: 30rem;
}
.msg-title {
    height: 62px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #333;
}
.msg-aside {
    /* width: 20rem; */

}
.msg-wrapper {
    width: 50rem;
}
.wrapper-title {
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    color: #666;
    border-radius: 4px;
    margin-bottom: 1.2rem;
}

.msg-tip {

}
.feed_title {
    /* display: inline; */
}
.feed_from {
    font-size: 13px;
}
.feed_from a{
    /* color: #000; */
    font-size: 15px;
    text-decoration:cadetblue;
    /* padding: 0 3px; */
}
.feed_title .msg-send-user {
    font-size: 14px;
    line-height: 20px;
    color: #2d64b3;
}
.feed_title .msg-content {
    width:600px;
	/* height:20px; */
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.emphasize-font {
    color: #d31010;
}
.feed_img {
        display: flex;
    justify-content: center;
}
</style>
