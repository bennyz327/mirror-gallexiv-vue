<script setup>
import Navbar from "@/components/Navbar.vue";
import {useRoute} from "vue-router";
import {reactive, ref} from "vue";

const route = useRoute();
const planId = ref(route.query.planId || ''); //  接收來自router的值以外要讓他成為ref可以更新資料

// const URL = import.meta.env.VITE_API_Post
const planDetail = reactive({});

// const planName = ref('');
// const

</script>

<template>
  <Navbar></Navbar>

  <div class="container" style="padding: 24px">

    <h3>訂閱付款</h3>

    <div style="display: flex">

      <div class="review-plan-block">
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <!-- 圖片 -->
            <div class="card-header py-3 custom-header">
              <div class="text-center">
                <img src="" class="rounded img-fluid"
                     style="max-width: 180px; max-height: 120px;" alt="index">
              </div>
            </div>

            <!-- 內文 -->
            <div class="card-body">

              <!-- 方案名稱 -->
              <h4 class="my-4 fw-normal">{{}}</h4>

              <!-- 方案價格 -->
              <h3 class="card-title pricing-card-title">NT${{ }}<small
                  class="text-muted fw-light">/mo</small>
              </h3>

              <!-- 方案內容按鈕 -->
              <ul class="list-unstyled mt-3 mb-4">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h3 class="accordion-header">
                      <button class="accordion-button collapsed" type="button"
                              data-bs-toggle="collapse" data-bs-target="#collapse"
                              aria-expanded="false" aria-controls="collapse">
                        <h5>方案內容</h5>
                      </button>
                    </h3>

                    <!-- 方案敘述 -->
                    <div id="collapse" class="accordion-collapse collapse" aria-labelledby="heading"
                         data-bs-parent="#accordion">
                      <div class="accordion-body">
                        {{ }}
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="pay-for-plan-block">
        <div class="pay-way-div">
          <div class="pay-way-text-div">
            <h5>付款方式</h5>
          </div>
          <div class="ec-picture-div">
            <img src="../assets/Picture/EcPayLogo.png">
          </div>
        </div>

        <div class="pay-for-plan-button">
          <v-btn style="width: 100%; height: 96px; background-color:beige" t>前往付款</v-btn>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.review-plan-block {
  width: 50%;
}

.pay-for-plan-block {
  width: 50%;
}

.ec-picture-div {
//border: 1px solid black; display: flex;
  justify-content: center;
}

.pay-way-text-div{
  display: flex;
  justify-content: center;
  //background-color: beige;
}

.pay-for-plan-button {
  display: flex;
  justify-content: center;
}
</style>