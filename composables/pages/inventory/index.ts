import { computed, ref, watch, type ComputedRef, type Ref } from "vue";
import type { Category, Product } from "~/interfaces/inventory";

export const useInventoryIndex = () => {
  const { allCategories, allProducts } = useInventoryStore();
  const category: Ref<string> = ref("all");
  const subcategory: Ref<string> = ref("all");
  const search: Ref<string> = ref("");

  const subCategories: ComputedRef<string[]> = computed(() => {
    if (category.value === "all") return [];
    const cat: Category | undefined = allCategories.find(
      (c) => c.category === category.value
    );
    if (!cat) return [];
    return cat.subcategories;
  });

  const products: ComputedRef<Product[]> = computed(() => {
    if (search.value === "") {
      if (category.value === "all") return allProducts;
      if (subcategory.value === "all")
        return allProducts.filter(
          (product) => product.category === category.value
        );
      return allProducts.filter(
        (product) => product.subcategory === subcategory.value
      );
    }
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1
    );
  });

  watch(category, () => {
    if (category.value === "all") subcategory.value = "all";
    else if (!subCategories.value.find((s) => s === subcategory.value))
      subcategory.value = "all";
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
