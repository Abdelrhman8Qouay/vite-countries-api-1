
<script setup>
import { RouterLink } from "vue-router";
import axios from "axios";
import { ref, onMounted, defineProps } from "vue";

const props = defineProps(["common"]);
const countryDetail = ref([]);

onMounted(() => {
  axios
    .get(`https://restcountries.com/v3.1/name/${props.common}`)
    .then((response) => {
      countryDetail.value = response.data;
    })
    .catch((error) => console.log(error));
});
</script>



<template>
  <div class="detailOfCountries" v-if="countryDetail[0]">
    <br />
    <br />
    <div class="back">
      <router-link to="/">
        <p>Back</p>
      </router-link>
    </div>
    <div class="detas">
      <div class="imgDeta">
        <img
          :src="countryDetail[0].coatOfArms.png"
          :alt="countryDetail[0].name.common"
        />
      </div>
      <div class="infDeta">
        <div class="labRL">
          <div class="leftInf">
            <span>{{ countryDetail[0].name.common }}</span>
            <p v-for="native in countryDetail[0].name.nativeName" :key="native">
              <span>Native name: </span> {{ native.common }}
            </p>
            <p><span>population: </span> {{ countryDetail[0].population }}</p>
            <p><span>Region: </span> {{ countryDetail[0].region }}</p>
            <p><span>Sub region: </span> {{ countryDetail[0].subregion }}</p>
            <p><span>Capital: </span> {{ countryDetail[0].capital[0] }}</p>
          </div>
          <div class="rightInf">
            <p><span>Top Level Domain: </span> {{ countryDetail[0].cca3 }}</p>
            <p>
              <span>Currencies: </span>
              <a v-for="curr in countryDetail[0].currencies" :key="curr">{{
                curr.name
              }}</a>
            </p>
            <p>
              <span>Languages: </span>
              <a v-for="lang in countryDetail[0].languages" :key="lang">
                {{ lang }}</a
              >
            </p>
          </div>
        </div>
        <div class="bordsInf">
          <p><span>border Countries:</span></p>
          <a v-for="border in countryDetail[0].borders" :key="border">{{
            border
          }}</a>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
.detailOfCountries {
  width: 100%;
  height: 100vh;
}

.back {
  display: block;
  padding: 10px;
  background-color: var(--elements);
  font-weight: 600;
  box-shadow: 0 0 5px black;
  max-width: 126px;
  justify-content: space-between;
  border-radius: 7px;
  margin: 0 0 15px 138px;
  a {
    text-decoration: none;
    color: var(--Blue-text);
    display: flex;
    gap: 10px;
  }
}

.detas {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px 60px;
  .imgDeta {
    max-width: 450px;
    max-height: 450px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .infDeta {
    display: flex;
    padding: 15px;
    justify-content: space-around;
    flex-direction: column;
    width: 500px;
    .labRL {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .leftInf {
        color: var(--Blue-text);
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 0.8rem;
        span {
          font-weight: 800;
          font-size: 1.5rem;
          margin: 0px 20px 15px 0;
        }
        p {
          span {
            font-size: 1rem;
            margin: 0;
            font-weight: 600;
          }
        }
      }
      .rightInf {
        color: var(--Blue-text);
        font-size: 0.8rem;
        display: flex;
        flex-direction: column;
        gap: 10px;
        p {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          span {
            font-size: 1rem;
            margin: 0;
            font-weight: 600;
          }
          a {
            margin: 0 5px;
          }
        }
      }
    }
    .bordsInf {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: var(--Blue-text);
      gap: 7px;
      flex-wrap: wrap;
      p {
        span {
          font-size: 1rem;
          margin: 0;
          font-weight: 600;
        }
      }
      a {
        margin: 0 10px;
        padding: 9px;
        color: var(--Blue-text);
        box-shadow: 0 0 5px black;
        background-color: var(--elements);
        border-radius: 4px;
        text-decoration: none;
        font-size: 0.8rem;
      }
    }
  }
}

@media (max-width: 750px) {
  .detailOfCountries .back {
    margin: auto;
  }
  .detailOfCountries .detas {
    flex-direction: column;
    padding: 20px 10px;
  }
  .detailOfCountries .detas .imgDeta {
    width: 80%;
    margin: auto;
  }
  .detailOfCountries .detas .infDeta {
    max-width: 100%;
    gap: 35px;
  }
  .detailOfCountries .detas .infDeta .labRL {
    flex-direction: column;
    gap: 35px;
  }
}
</style>