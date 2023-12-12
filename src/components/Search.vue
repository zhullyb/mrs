<script setup lang="ts">
import { ref } from 'vue';

const result = ref<{
    name: string;
    rate: number;
    description: string;
    image: string;
    url: string;
}[]>([
        {
            "name": "油被带要想采",
            "rate": 1.5,
            "description": "线以片理位科进十资研局平力路所严极。界权成安江党气产圆新起化权五状。果习少立自整音府发天你称织教程通。文也中事起习器比看学边具土统。",
            "image": "http://dummyimage.com/400x400",
            "url": "http://example.com"
        },
        {
            "name": "己法周",
            "rate": 3.3,
            "description": "质又导术当张干现口十会任处八表由育着。段可维类安走象色业确毛质候第增。铁取明期严市力们支律较从水和。",
            "image": "http://dummyimage.com/400x400",
            "url": "http://example.com"
        },
        {
            "name": "去话到置感想次",
            "rate": 2.2,
            "description": "查改内层百使加响但写议话称权内。关总应变花劳把通便门则必将身而。今争大消任只节万容口给边集济经工。复证原场高济今据面收走适不况打。划好品活声正共千示时月道比通直电。性观口电劳教第联业张积又土定主。",
            "image": "http://dummyimage.com/400x400",
            "url": "http://example.com"
        },
        {
            "name": "本酸温率半照",
            "rate": 4.1,
            "description": "不说况体本北确前易真品除。率由信例选其角号开回精高。花风斗率商据子她力团才己格给影打么。长边别全史发运价太内连角清响权原之争。理风响华入经程也连土南儿机整好。",
            "image": "http://dummyimage.com/400x400",
            "url": "http://example.com"
        },
        {
            "name": "整然交准红",
            "rate": 1.8,
            "description": "场西形样最义老华研示速工市果在合。利还决气省又土话过克则教制建多。切结选器京响务党二市元毛后消育低。产节百最局造按本备家方展收群查线社。即确改度复件织应委很物而外需。由土才称特八群到细存车构个。",
            "image": "http://dummyimage.com/400x400",
            "url": "http://example.com"
        }
    ])

</script>

<template>
    <div>
        <h1>标题</h1>
        <a-list item-layout="vertical" :dataSource="result">
            <template #renderItem="{ item }">
                <div>
                    <a-list-item style="display: inline-flex;">
                        <a :href="item.url">
                            <a-image
                                :src="item.image"
                                :width="100"
                                :preview=false
                            />
                        </a>
                        <div class="item-content">
                            <a :href="item.url">
                                <h3>{{ item.name }}</h3>
                            </a>
                            <a-rate :value="item.rate/2" disabled allow-half />
                            <span class="rate-num">{{ item.rate }}</span>
                            <p>{{ item.description }}</p>
                        </div>
                    </a-list-item>
                </div>
            </template>
        </a-list>
    </div>
</template>

<style scoped>
.item-content {
    margin-left: 10px;
}

.rate-num {
    margin-left: 10px;
    font-size: 16px;
    color: #fae314; 
}
</style>