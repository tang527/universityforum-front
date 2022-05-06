<template>
    <div class="tile is-ancestor">
        <div class="tile is-vertical">
            <div class="tile">
                <div class="tile is-parent is-vertical">
                    <article class="tile is-child box">
                        <p class="title">从这里选择感兴趣的版块</p>
                        <div class="slide" v-loading="articleTypeLoading">
                            <div class="box type-box" v-for="(list, index) in typeList" :key="index">
                                <!-- <div v-for="(item, i) in list" :key="i" :class="[i % 3==0 ? leftClass:i % 3==2?rightClass:'']"> -->
                                <div v-for="(item, i) in list" :key="i" :class="leftClass">
                                    <article class="media">
                                        <figure class="media-left">
                                            <p class="image is-64x64">
                                                <img :src="defaultImg" v-real-img="item.typeImg" class="size" />
                                            </p>
                                        </figure>
                                        <div class="media-content">
                                            <div class="content">
                                                <p>
                                                    <a @click="articleByType(item.typeId)"><strong>{{ item.typeName }}</strong></a>
                                                    <br />
                                                    {{ item.typeDesc }}
                                                </p>
                                            </div>
                                            <nav class="level is-mobile">
                                                <div class="level-left">
                                                    帖子数量：
                                                    <a class="level-item">
                                                        <span class="icon is-small">
                                                            <i class="fab fa-hotjar"></i>
                                                        </span>
                                                        {{ item.articleNum }}
                                                    </a>
                                                </div>
                                            </nav>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllArticleType } from '@/api/article';

export default {
    mounted() {
        this.getData();
    },
    data() {
        return {
            defaultImg: this.ASSET.TYPE_IMG_SRC,
            users: [
                {
                    userId: 0,
                    userPassword: 0,
                    userName: '',
                    userEmail: '',
                    userSex: '',
                    userPhone: '',
                    userStatus: 0,
                    userTime: '',
                    userShow: '',
                    userBlog: '',
                    userImg: '',
                    userFans: 0,
                    userConcern: 0
                }
            ],
            typeList: [
                {
                    typeId: 0,
                    typeName: '',
                    typeDesc: '',
                    typeLevel: 0,
                    typeImg: '',
                    articleNum: 0
                }
            ],
            articleTypeLoading: true,
            leftClass: 'box-float-left',
            rightClass: 'box-float-right'
        };
    },
    methods: {
        getData() {
            getAllArticleType().then(res => {
                if (res.code == this.NET.SUCCESS_CODE) {
                    // 对此数据进行处理 此处的3表示每行存放三个数据
                    this.typeList = this.dealTypeList(res.data, 3);
                    this.articleTypeLoading = false;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // Box容器每行存放num个type 此处num一般取2-3
        dealTypeList(typeList, num) {
            let newTypeList = [];
            let listNum = Math.ceil(typeList.length / num);
            for (let index = 0; index < listNum; index++) {
                let list = [];
                for (let i = 0; i < num; i++) {
                    if (num * index + i < typeList.length) {
                        list.push(typeList[num * index + i]);
                    }
                }
                newTypeList.push(list);
            }
            console.log(newTypeList);
            return newTypeList;
        },
        // 根据typeId跳转到该板块的详情页面
        articleByType(typeId) {
            this.$router.push({
                name: 'Article',
                params: {
                    typeId: typeId
                }
            });
        }
    },

    computed: {},
    components: {}
};
</script>


<style scoped>
/*利用:after伪元素 解决div高度为0的问题*/
div:after {
    content: '';
    display: block;
    clear: both;
}
.box-float-left {
    width: 31%;
    float: left;
}
.box-float-right {
    width: 31%;
    float: right;
}
.type-box {
    margin-top: 20px;
    margin-left: 5px;
    margin-right: 5px;
    border: 1px solid rgb(100, 99, 99);
}
.hero.is-medium .hero-body {
    padding-top: 0rem;
    padding-bottom: 3rem;
}
.slide {
    height: 500px;
    overflow-y: auto;
}
.is-parent {
    margin-left: 30px;
}
</style>