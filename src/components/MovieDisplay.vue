<script setup lang="ts">
import { ref } from 'vue';
const data = ref({
    "id": "35873969",
    "name": "名侦探柯南：黑铁的鱼影 名探偵コナン 黒鉄の魚影",
    "image": "https://bu.dusays.com/2022/04/17/1ef8787039f53.webp",
    "director": "立川让",
    "screenwriter": "樱井武晴",
    "mainActor": [
        "高山南",
        "林原惠美",
        "山崎和佳奈",
        "小山力也",
        "山口胜平",
        "古谷彻",
        "池田秀一",
        "置鲇龙太郎",
        "三石琴乃",
        "岸野幸正",
        "一城美由希",
        "土师孝也",
        "乃村健次",
        "飞田展男",
        "绪方贤一",
        "松井菜樱子",
        "岩居由希子",
        "大谷育江",
        "茶风林",
        "汤屋敦子",
        "井上和彦",
        "千叶繁",
        "堀之纪",
        "立木文彦",
        "小山茉美",
        "井上喜久子",
        "木下浩之",
        "玉川纱己子",
        "种崎敦美",
        "诹访部顺一",
        "神谷浩史",
        "土田大",
        "泽木郁也",
        "宫原永海",
        "村濑步",
        "泽田敏子",
        "鸟海胜美",
        "藤原泰浩",
        "金光宣明",
        "冈井克升",
        "下地紫野",
        "泽村一树"
    ],
    "type": [
        "动作",
        "动画",
        "悬疑",
        "惊悚",
        "犯罪",
        "冒险"
    ],
    "website": "https://www.conan-movie.jp",
    "country": "日本",
    "language": "日语",
    "releaseDate": "2023-12-16(中国大陆) / 2023-04-14(日本)",
    "length": "110分钟",
    "description": "故事发生在东京八丈岛近海，一座将全球各地警方监控相连接的高科技设施——“太平洋浮标”即将启动。为了与欧洲刑警组织管辖的范围联网，来自世界各地的工程师聚集在这里。基于人脸识别的全新“黑科技”也正在测试中……\n\n与此同时，柯南一行人前往八丈岛观鲸，途中柯南接到冲矢昴（赤井秀一）的电话，被告知欧洲刑警组织成员在德国遭到琴酒的杀害。为调查真相的柯南潜入“太平洋浮标”。正当工程师们正在为系统启动而展开准备工作时，一桩案件突然发生！一名女工程师被黑暗组织绑架，她手中存有核心技术的U盘也落入了黑暗组织手中！\n\n此时，水下传来未知潜水艇逼近的声音，令人毛骨悚然，一个神秘的黑影也正在悄悄接近灰原哀……"
}
)
</script>

<template>
    <div class="root">
        <a-row>
            <a-col :offset="1">
                <h1>{{ data.name }}</h1>
            </a-col>
            <a-divider />
            <a-col :span="8" :offset="1" class="cover-image-container">
                <img :src="data.image" class="cover-image"/>
            </a-col>
            <a-col :span="14" :offset="1" style="color: #70757A;">
                <p v-show="data.director"><span class="role">导演: </span>{{ data.director }}</p>
                <p v-show="data.screenwriter"><span class="role">编剧: </span>{{ data.screenwriter }}</p>
                <p v-show="data.mainActor"><span class="role">主演: </span>{{ data.mainActor.join(' / ') }}</p>
                <p v-show="data.type"><span class="role">类型: </span>{{ data.type.join(' / ') }}</p>
                <p v-show="data.website"><span class="role">官方网站: </span><a :href="data.website">{{ data.website }}</a></p>
                <p v-show="data.country"><span class="role">制片国家/地区: </span>{{ data.country }}</p>
                <p v-show="data.language"><span class="role">语言: </span>{{ data.language }}</p>
                <p v-show="data.releaseDate"><span class="role">上映日期: </span>{{ data.releaseDate }}</p>
                <p v-show="data.length"><span class="role">片长: </span>{{ data.length }}</p>
            </a-col>
            <a-divider />
            <a-col :span="22" :offset="1">
                <h2>剧情简介</h2>
                <p v-show="data.description" class="description">{{ data.description }}</p>
            </a-col>
        </a-row>
    </div>
</template>

<style scoped>
.root {
    max-width: 45rem;
    margin: 3rem auto;
}
.cover-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.cover-image {
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
}
.role {
    color: black;
}
.description {
    white-space: pre-line;
    color: #70757A;
}
</style>