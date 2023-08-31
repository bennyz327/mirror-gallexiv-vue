<script setup>

import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

const { handleSubmit,} = useForm({
  validationSchema: {
    nickname (value) {
      if (value?.length >= 1) return true

      return '至少需要輸入一個字元!'
    },
  },
})

const selectedCountry = ref(null);
const nickname = useField('nickname')
const select = useField('select')
const countries  = ref(['阿富汗', '阿爾巴尼亞', '阿爾及利亞', '安道爾', '安哥拉', '安提瓜和巴布達', '阿根廷', '亞美尼亞', '澳大利亞', '奧地利', '阿塞拜疆', '巴哈馬', '巴林', '孟加拉', '巴巴多斯', '白俄羅斯', '比利時', '貝里斯', '貝寧', '不丹', '玻利維亞', '波斯尼亞和黑塞哥維那', '博茨瓦納', '巴西', '保加利亞', '布基納法索', '布隆迪', '柬埔寨', '喀麥隆', '加拿大', '佛得角', '中非共和國', '乍得', '智利', '中國', '哥倫比亞', '科摩羅', '剛果（布）', '剛果（金）', '哥斯大黎加', '克羅地亞', '古巴', '賽普勒斯', '捷克共和國', '丹麥', '吉布提', '多明尼加共和國', '東帝汶', '厄瓜多爾', '埃及', '薩爾瓦多', '赤道幾內亞', '厄立特里亞', '愛沙尼亞', '埃塞俄比亞', '斐濟', '芬蘭', '法國', '加蓬', '岡比亞', '喬治亞', '德國', '加納', '希臘', '格林納達', '危地馬拉', '幾內亞', '幾內亞比紹', '圭亞那', '海地', '洪都拉斯', '匈牙利', '冰島', '印度', '印尼', '伊朗', '伊拉克', '愛爾蘭', '以色列', '義大利', '牙買加', '日本', '約旦', '哈薩克', '肯尼亞', '吉里巴斯', '科威特', '吉爾吉斯', '老撾', '拉脫維亞', '黎巴嫩', '萊索托', '利比里亞', '利比亞', '列支敦士登', '立陶宛', '盧森堡', '馬其頓', '馬達加斯加', '馬拉維', '馬來西亞', '馬爾代夫', '馬利', '馬爾他', '茅利塔尼亞', '毛里求斯', '墨西哥', '密克羅尼西亞', '摩爾多瓦', '摩納哥', '蒙古', '黑山', '摩洛哥', '莫桑比克', '緬甸', '納米比亞', '瑙魯', '尼泊爾', '荷蘭', '紐西蘭', '尼加拉瓜', '尼日爾', '尼日利亞', '朝鮮', '挪威', '阿曼', '巴基斯坦', '帛琉', '巴拿馬', '巴布亞新幾內亞', '巴拉圭', '秘魯', '菲律賓', '波蘭', '葡萄牙', '卡塔爾', '羅馬尼亞', '俄羅斯', '盧旺達', '聖克里斯多福及尼維斯', '聖盧西亞', '聖文森特和格林納丁斯', '薩摩亞', '聖馬力諾', '聖多美和普林西比', '沙烏地阿拉伯', '塞內加爾', '塞爾維亞', '塞席爾', '塞拉利昂', '新加坡', '斯洛伐克', '斯洛維尼亞', '所羅門群島', '索馬里', '南非', '韓國', '南蘇丹', '西班牙', '斯里蘭卡', '蘇丹', '蘇里南', '斯威士蘭', '瑞典', '瑞士', '敘利亞', '塔吉克', '坦桑尼亞', '泰國', '東帝汶', '多哥', '湯加', '千里達和多巴哥', '突尼斯', '土耳其', '土庫曼', '圖瓦盧', '烏干達', '烏克蘭', '阿聯酋', '英國', '美國', '烏拉圭', '烏茲別克', '瓦努阿圖', '梵蒂岡', '委內瑞拉', '越南', '也門', '贊比亞', '津巴布韋','臺灣']
)

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>

  <div class="edit-personal-data-div">
  <form @submit.prevent="submit">
    <v-text-field
        v-model="nickname.value.value"
        :counter="20"
        :error-messages="nickname.errorMessage.value"
        label="暱稱"
        class="nickname-error-message-form"
        outlined
        dense
    ></v-text-field>

    <div class="countries-select-div">
    <v-autocomplete
        v-model="selectedCountry"
        :items="countries"
        label="選擇您的所在國家"
    ></v-autocomplete>
    </div>
    <v-btn
        class="me-4"
        type="submit"
    >
      送出修改
    </v-btn>

  </form>
  </div>
</template>

<style scoped>

.edit-personal-data-div{
width: ;
}

.nickname-error-message-form{

}

.countries-select-div{

}

</style>