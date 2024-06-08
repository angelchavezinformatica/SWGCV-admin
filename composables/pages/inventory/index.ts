import { computed, ref, watch, type ComputedRef, type Ref } from "vue";
import { AllInventory } from "~/config/api";
import type { All, Category, Product } from "~/interfaces/inventory";
import { useFetchJSON } from "~/services/api";

export const useInventoryIndex = () => {
  const allProducts: Ref<Product[]> = ref([]);
  const allCategories: Ref<Category[]> = ref([]);
  const category: Ref<string> = ref("all");
  const subcategory: Ref<string> = ref("all");
  const search: Ref<string> = ref("");

  const subCategories: ComputedRef<string[]> = computed(() => {
    if (category.value === "all") return [];
    const cat: Category | undefined = allCategories.value.find(
      (c) => c.category === category.value
    );
    if (!cat) return [];
    return cat.subcategories;
  });

  const products: ComputedRef<Product[]> = computed(() => {
    if (search.value === "") {
      if (category.value === "all") return allProducts.value;
      if (subcategory.value === "all")
        return allProducts.value.filter(
          (product) => product.category === category.value
        );
      return allProducts.value.filter(
        (product) => product.subcategory === subcategory.value
      );
    }
    return allProducts.value.filter(
      (product) =>
        product.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1
    );
  });

  watch(category, () => {
    if (category.value == "all") subcategory.value = "all";
  });

  onMounted(async () => {
    const { getJSON } = await useFetchJSON(AllInventory);
    const json = await getJSON<All>();
    allProducts.value = json.products;
    allCategories.value = json.categories;
  });

  return {
    allCategories,
    category,
    search,
    subCategories,
    subcategory,
    products,
  };
};
