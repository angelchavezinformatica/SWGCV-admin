<template>
  <section>
    <InventoryNav />
    <Form
      send-value="Enviar"
      @s="handleSubmit"
      @r="handleReset"
      :disabled="disabled"
    >
      <FormInput
        id="name"
        label="Nombre:"
        type="text"
        v-model="name"
        :error="nameError"
      />
      <FormInput
        id="description"
        label="Descripción:"
        type="text"
        v-model="description"
      />
      <FormInput
        id="stock"
        label="Cantidad:"
        type="number"
        v-model="stock"
        :error="stockError"
      />
      <FormInput
        id="price"
        label="Precio:"
        type="number"
        v-model="price"
        :error="priceError"
      />
      <FormDatalist
        id="category"
        label="Categoría:"
        :items="allCategories"
        v-model="category"
      />
      <FormDatalist
        id="subcategory"
        label="Subcategoría:"
        :items="allSubcategories"
        v-show="category !== ''"
        v-model="subcategory"
      />
      <FormImage id="image" label="Imagen:" v-model="image" />
    </Form>
  </section>
</template>

<script setup lang="ts">
useHead({ title: "Agregar productos | Inventario | Vivero La Huerta" });
import { useInventoryAddProduct } from "~/composables/pages/inventory/add-product";

const {
  allCategories,
  allSubcategories,
  category,
  description,
  disabled,
  handleReset,
  handleSubmit,
  image,
  name,
  nameError,
  price,
  priceError,
  stock,
  stockError,
  subcategory,
} = useInventoryAddProduct();
</script>
