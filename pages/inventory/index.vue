<template>
  <Main>
    <InventoryNav />
    <section class="Filter">
      <div class="Filter-search">
        <input type="text" v-model="search" placeholder="Buscar..." />
      </div>
      <div class="Filter-select" v-show="search === ''">
        <select v-model="category">
          <option value="all">-- Seleccione una categoría --</option>
          <option v-for="category in allCategories" :value="category.category">
            {{ category.category }}
          </option>
        </select>
      </div>
      <div
        class="Filter-select"
        v-show="
          category !== 'all' && subCategories.length !== 0 && search === ''
        "
      >
        <select v-model="subcategory">
          <option value="all">-- Seleccione una subcategoría --</option>
          <option v-for="subcategory in subCategories" :value="subcategory">
            {{ subcategory }}
          </option>
        </select>
      </div>
    </section>
    <section class="Products">
      <div class="Products-product" v-for="product in products">
        <img :src="product.image" :alt="product.name" />
        <div class="Products-product-content">
          <div class="Products-product-tags">
            <span @click="category = product.category">
              #{{ product.category }}
            </span>
            <span
              @click="
                category = product.category;
                subcategory = product.subcategory;
              "
            >
              #{{ product.subcategory }}
            </span>
          </div>
          <h2 class="Products-product-title">{{ product.name }}</h2>
          <p class="Products-product-available">
            <span>{{ product.quantity }}</span> disponibles (<span
              >S/. {{ product.price }}</span
            >)
          </p>
          <details class="Products-product-details">
            <summary>Descripción</summary>
            <p>{{ product.description }}</p>
          </details>
        </div>
      </div>
    </section>
  </Main>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });
useHead({ title: "Inventario | Vivero La Huerta" });

import { useInventoryIndex } from "~/composables/pages/inventory";

const {
  allCategories,
  category,
  search,
  subCategories,
  subcategory,
  products,
} = useInventoryIndex();
</script>

<style scope lang="sass">
.Filter
  display: flex
  flex-wrap: wrap
  gap: 1rem
  .Filter-select select,
  .Filter-search input
    text-align: center
    padding: .3rem
    font-size: 1rem
    outline: 2px solid $accent-2
    background-color: $bg-color
    border: none
    border-radius: 20px
  .Filter-search input
    text-align: start
    width: 150px
.Products
  @include flex--evenly()
  flex-wrap: wrap
  gap: 1.5rem
  width: 100%
  .Products-product
    @include flex--start()
    flex-direction: column
    width: 250px
    background-color: $color-3
    border-radius: 20px
    overflow: hidden
    img
      width: 250px
      height: 150px
      object-fit: cover
    .Products-product-content
      padding: .5rem
      .Products-product-tags
        display: flex
        align-items: center
        flex-direction: column
        width: 100%
        gap: .3rem
        span
          cursor: pointer
          color: $color-4
          border: 1px solid $color-4
          font-size: .9rem
          padding: .2rem .5rem
          text-align: center
          border-radius: 30px
      .Products-product-title
        font-size: 1.2rem
        color: $color-4
        text-align: center
      .Products-product-available
        font-size: .95rem
        margin: .2rem 0
        color: $color-4
        text-align: center
        span
          font-weight: 700
      .Products-product-details
        margin-top: .5rem
        color: $color-4
        text-align: center
        summary
          cursor: pointer
</style>
