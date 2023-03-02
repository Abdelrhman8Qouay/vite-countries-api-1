
<template>
  <div class="home">
    <div class="formDivSearch">
      <ion-icon id="searchIcon" name="search-sharp"></ion-icon>
      <input
        id="searchBox"
        v-model="search"
        type="text"
        placeholder="search for a country"
      />
      <div class="forFilter">
        <a class="aFilter" @click="ulFilter = !ulFilter"
          >Filter By Region <ion-icon name="chevron-down-sharp"></ion-icon
        ></a>
        <ul v-if="ulFilter">
          <li>
            <label for="radioAfrica"
              >Africa
              <input
                id="radioAfrica"
                class="dropdownInput"
                type="radio"
                name="africa"
                value="Africa"
                v-model="region"
                v-on:click="handleFilterClick"
              />
            </label>
          </li>
          <li>
            <input
              id="radioAmerica"
              class="dropdownInput"
              type="radio"
              name="america"
              value="America"
              v-model="region"
              v-on:click="handleFilterClick"
            />
            <label for="radioAmerica">America</label>
          </li>
          <li>
            <input
              id="radioAsia"
              class="dropdownInput"
              type="radio"
              name="asia"
              value="Asia"
              v-model="region"
              v-on:click="handleFilterClick"
            />
            <label for="radioAsia">Asia</label>
          </li>
          <li>
            <input
              id="radioEurope"
              class="dropdownInput"
              type="radio"
              name="europe"
              value="Europe"
              v-model="region"
              v-on:click="handleFilterClick"
            />
            <label for="radioEurope">Europe</label>
          </li>
          <li>
            <input
              id="radioOceania"
              class="dropdownInput"
              type="radio"
              name="oceania"
              value="Oceania"
              v-model="region"
              v-on:click="handleFilterClick"
            />
            <label for="radioOceania">Oceania</label>
          </li>
          <!-- After selecting a region this "All Regions" option becomes available -->
          <li v-if="showAllRegion">
            <input
              id="radioAll"
              class="dropdownInput"
              type="radio"
              name="all"
              value="All Regions"
              v-model="region"
              v-on:click="handleFilterClick"
            />
            <label for="radioAll">All Regions</label>
          </li>
        </ul>
      </div>
    </div>

    <font-awesome-icon class="fa-duotone fa-sun" />

    <h1 v-if="errorMsg !== null">
      Sorry, an error has occurred {{ errorMsg }}
    </h1>
    <!-- Loading API response -->
    <div class="loaderFlex"><div v-if="pending" class="loader"></div></div>

    <div
      v-if="filterAllCountries"
      class="contentCardsCountry"
      style="display: flex; flex-wrap: wrap; justify-content: center"
    >
      <div
        class="contentOfHome"
        v-for="country in filterAllCountries"
        :key="country.id"
      >
        <div class="featCard">
          <router-link :to="'/country/' + country.name.common">
            <div class="imgCard">
              <img :src="country.flags.png" alt="country" />
            </div>
            <div class="detailCard">
              <span>{{ country.name.common }}</span>
              <p>population: {{ formatNumbers(country.population) }}</p>
              <p>region: {{ country.region }}</p>
              <p v-for="cap in country.capital" :key="cap">
                capital: {{ cap }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { RouterLink } from "vue-router";
import axios from "axios";
import { ref, onMounted, computed } from "vue";

const countries = ref([]);
const search = ref("");
const ulFilter = ref(false);
const showFilter = ref(false);
const showAllRegion = ref(false);
const region = ref("");
const pending = ref(false);
const errorMsg = ref(null);

onMounted(() => {
  pending.value = true;
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => {
      countries.value = response.data;
    })
    .catch((error) => {
      errorMsg.value = error;
    })
    .finally(() => {
      pending.value = false;
    });
});

const getCountries = computed(() => countries.value);

const filterAllCountries = computed(() => {
  return countries.value.filter((country) => {
    if (region.value === "" || region.value === "All Regions") {
      return countries.value.length
        ? Object.keys(countries.value[0]).some((key) =>
            ("" + country[key]).toLowerCase().includes(search.value)
          )
        : true;
    } else if (search.value !== "") {
      return countries.value.length
        ? Object.keys(countries.value[0]).some((key) =>
            ("" + country[key]).toLowerCase().includes(search.value)
          )
        : true;
    } else {
      return country.region.match(region.value);
    }
  });
});

void function handleFilterClick() {
  setTimeout(() => {
    showFilter.value = !showFilter.value;
    showAllRegion.value = true;
  });
};

function formatNumbers(value) {
  return value.toLocaleString();
}
</script>


<style lang="scss">
.home {
  height: 100%;
  width: 100%;
}

.formDivSearch {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 50px;
  position: relative;
  #searchIcon {
    position: absolute;
    color: var(--Blue-text);
    font-size: 1.2rem;
    left: 60px;
    top: 40px;
  }
  #searchBox {
    padding: 12px 12px 12px 40px;
    border: none;
    border-radius: 3px;
    font-size: 0.8rem;
    color: var(--Blue-text);
    background-color: var(--elements);
    outline: none;
    appearance: none;
    width: 420px;
  }
  #searchBox:focus {
    color: var(--Blue-text);
  }
  #searchBox::placeholder {
    color: var(--Blue-text);
  }

  .forFilter {
    position: relative;
    .aFilter {
      padding: 15px;
      background-color: var(--elements);
      font-size: 0.8rem;
      border-radius: 3px;
      color: var(--Blue-text);
      cursor: pointer;
      ion-icon {
        padding-left: 15px;
      }
    }
    ul {
      display: flex;
      position: absolute;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      left: 0px;
      top: 40px;
      background-color: var(--elements);
      border-radius: 7px;
      z-index: 10;
      li {
        list-style: none;
        padding: 10px 55px;
        label {
          color: var(--Blue-text);
          font-size: 0.8rem;
          cursor: pointer;
        }
        .dropdownInput {
          display: none;
        }
      }
    }
  }

  .contentCardsCountry {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 700px) {
  .formDivSearch #searchBox {
    width: 100%;
  }
  #app header {
    font-size: 0.8rem;
  }
  .home .formDivSearch {
    flex-direction: column;
    gap: 40px;
  }
}

.contentOfHome {
  padding: 40px 30px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 75px;
  justify-content: space-around;
  .featCard {
    background-color: var(--elements);
    width: 260px;
    height: auto;
    border-radius: 5px;
    a {
      text-decoration: none;
      .imgCard {
        width: 100%;
        height: 9em;
        img {
          width: 100%;
          height: 100%;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
      }
      .detailCard {
        padding: 14px 15px 44px 15px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        span {
          font-weight: 600;
          color: var(--Blue-text);
          margin-bottom: 5px;
          font-size: 1.3rem;
        }
        p {
          font-weight: 300;
          font-size: 1rem;
          color: var(--Blue-text);
        }
      }
    }
  }
}
</style>

