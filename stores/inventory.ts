import { ref, type Ref } from "vue";
import { AllInventory } from "~/config/api";
import type { All, Category, Product } from "~/interfaces/inventory";
import { useFetchJSON } from "~/services/api";

export const useInventoryStore = defineStore("inventory", () => {
  const allProducts: Ref<Product[]> = ref([]);
  const allCategories: Ref<Category[]> = ref([]);

  const fetch = async () => {
    const { getJSON } = await useFetchJSON(AllInventory);
    const json = await getJSON<All>();
    allProducts.value = json.products;
    allCategories.value = json.categories;
  };

  return { allProducts, allCategories, fetch };
});
