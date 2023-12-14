<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue';
import { movieInfo } from '../types/movie';
import movieService from '../apis/movieService';
import { message } from 'ant-design-vue';
const mid = getCurrentInstance()?.proxy?.$route.params.id as string;
const isEditing = ref(false)
const data = ref<movieInfo>({
    mid: '',
    name: '',
    image: '',
    director: '',
    screenwriter: '',
    mainActor: [],
    type: [],
    website: '',
    country: '',
    language: '',
    releaseDate: '',
    length: '',
    description: ''
})

const handleSubmit = async () => {
    const res = await movieService.updateMovie(data.value)
    if (res.data.code == 200) {
        isEditing.value = false
        message.success('修改成功')
    } else {
        message.error(res.data.msg || '修改失败')
    }
}

onMounted(async () => {
    console.log(mid)
    const res = await movieService.getInfo(mid)
    data.value = res.data.data
})

</script>

<template>
    <div class="root">
        <a-row>
            <a-col :span="21" :offset="1">
                <h1>{{ data.name }}</h1>
            </a-col>
            <a-col :span="1">
                <a-button type="dashed" @click="isEditing=!isEditing">{{isEditing ? "预览" : "编辑"}}</a-button>
            </a-col>
            <a-divider />
            <a-col :span="8" :offset="1" class="cover-image-container">
                <img :src="data.image" class="cover-image"/>
            </a-col>
            <a-col :span="14" :offset="1" style="color: #70757A;">
                <div v-if="!isEditing">
                    <p v-show="data.director"><span class="role">导演: </span>{{ data.director }}</p>
                    <p v-show="data.screenwriter"><span class="role">编剧: </span>{{ data.screenwriter }}</p>
                    <p v-show="data.mainActor"><span class="role">主演: </span>{{ data.mainActor?.join(' / ') }}</p>
                    <p v-show="data.type"><span class="role">类型: </span>{{ data.type?.join(' / ') }}</p>
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