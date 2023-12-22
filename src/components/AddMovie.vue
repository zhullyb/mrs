<script setup lang="ts">
import { ref } from 'vue';
import { movieInfo } from '../types/movie';
import movieService from '../apis/movieService';
import { UploadChangeParam, UploadProps, message } from 'ant-design-vue';
import router from '../routers';
import userStore from '../stores/userStore';
const newUserStore = userStore();
const isEditing = ref(true);
const fileList = ref([]);
const data = ref<movieInfo>({
    mid: '',
    name: '',
    image: '',
    director: '',
    screenwriter: '',
    mainActor: '',
    type: '',
    website: '',
    country: '',
    language: '',
    releaseDate: '',
    length: '',
    description: ''
})

const handleSubmit = async () => {
    const res = await movieService.addMovie(data.value)
    if (res.data.code == 200) {
        isEditing.value = false
        router.push(`/movie/${res.data.data.mid}`);
        message.success('添加成功')
    } else if (res.data.code == 401) {
        message.warning('登陆过期，请重新登陆')
        newUserStore.clearUserInfo()
    } else {
        message.error(res.data.msg || '添加失败')
    }
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传 JPG/PNG 格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小不能超过 2MB');
    }
    return isJpgOrPng && isLt2M;
}

const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
        return;
    }
    if (info.file.status === 'done') {
        data.value.image = info.file.response.data.url
    }
    if (info.file.status === 'error') {
        fileList.value = [];
    }
}
</script>

<template>
    <div class="root">
        <a-row>
            <a-col :span="18" :offset="1">
                <h1 v-show="!isEditing">{{ data.name }}</h1>
                <a-input v-show="isEditing" v-model:value="data.name" />
            </a-col>
            <a-col :span="5" style="display: flex; justify-content: flex-end; align-items: center;">
                <a-button type="dashed" @click="isEditing=!isEditing">{{isEditing ? "预览" : "编辑"}}</a-button>
            </a-col>
            <a-divider />
            <a-col :span="8" :offset="1" class="cover-image-container">
                <img :src="data.image" class="cover-image"/>
                <br />
                <!-- FIXME: change upload url here -->
                <a-upload
                    v-show="isEditing"
                    v-model:file-list="fileList"
                    :max-count="1"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :showUploadList="false"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                >
                    <a-button>
                        上传封面
                    </a-button>
                </a-upload>
            </a-col>
            <a-col :span="14" :offset="1" style="color: #70757A;">
                <div v-if="!isEditing">
                    <p v-show="data.director"><span class="role">导演: </span>{{ data.director }}</p>
                    <p v-show="data.screenwriter"><span class="role">编剧: </span>{{ data.screenwriter }}</p>
                    <p v-show="data.mainActor"><span class="role">主演: </span>{{ data.mainActor }}</p>
                    <p v-show="data.type"><span class="role">类型: </span>{{ data.type }}</p>
                    <p v-show="data.website"><span class="role">官方网站: </span><a :href="data.website">{{ data.website }}</a></p>
                    <p v-show="data.country"><span class="role">制片国家/地区: </span>{{ data.country }}</p>
                    <p v-show="data.language"><span class="role">语言: </span>{{ data.language }}</p>
                    <p v-show="data.releaseDate"><span class="role">上映日期: </span>{{ data.releaseDate }}</p>
                    <p v-show="data.length"><span class="role">片长: </span>{{ data.length }}</p>
                </div>
                <div v-else>
                    <a-form
                        model="data"
                        name="basic"
                        @finish="handleSubmit"
                    >
                        <a-form-item
                            label="导演"
                            name="director"
                        >
                            <a-input v-model:value="data.director" />
                        </a-form-item>
                        <a-form-item
                            label="编剧"
                            name="screenwriter"
                        >
                            <a-input v-model:value="data.screenwriter" />
                        </a-form-item>
                        <a-form-item
                            label="主演"
                            name="mainActor"
                        >
                            <a-input v-model:value="data.mainActor" />
                        </a-form-item>
                        <a-form-item
                            label="类型"
                            name="type"
                        >
                            <a-input v-model:value="data.type" />
                        </a-form-item>
                        <a-form-item
                            label="官方网站"
                            name="website"
                        >
                            <a-input v-model:value="data.website" />
                        </a-form-item>
                        <a-form-item
                            label="制片国家/地区"
                            name="country"
                        >
                            <a-input v-model:value="data.country" />
                        </a-form-item>
                        <a-form-item
                            label="语言"
                            name="language" 
                        >
                            <a-input v-model:value="data.language" />
                        </a-form-item>
                        <a-form-item
                            label="上映日期"
                            name="releaseDate"
                        >
                            <a-input v-model:value="data.releaseDate" />
                        </a-form-item>
                        <a-form-item
                            label="片长"
                            name="length"
                        >
                            <a-input v-model:value="data.length" />
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit">
                                提交
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </a-col>
        </a-row>
        <a-divider />
        <a-row style="display: block;">
            <div v-if="!isEditing">
                <a-col :span="22" :offset="1" v-show="data.description">
                    <h2>剧情简介</h2>
                    <p class="description">{{ data.description }}</p>
                </a-col>
            </div>
            <div v-else>
                <a-col :span="22" :offset="1">
                    <h2 style="width: 100%;">剧情简介</h2>
                    <a-textarea v-model:value="data.description" autoSize />
                </a-col>
            </div>
            <a-divider />
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
    flex-direction: column;
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