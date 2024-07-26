import { toast } from "vue-sonner";
import { AdminInventory } from "~/config/api";
import { dataURLtoFile } from "~/helpers/file";
import { useFetchJSON, usePFetch } from "~/services/api";

export const useInventoryAddProduct = () => {
  const inventory = useInventoryStore();
  const { requestP } = usePFetch();

  const allCategories = inventory.allCategories.map((cat) => cat.category);
  const allSubcategories: ComputedRef<string[]> = computed(() => {
    return (
      inventory.allCategories
        .filter((cat) => cat.category === category.value)
        .map((cat) => cat.subcategories)[0] || []
    );
  });

  const name: Ref<string> = ref("");
  const description: Ref<string> = ref("");
  const stock: Ref<string> = ref("0");
  const price: Ref<string> = ref("0");
  const category: Ref<string> = ref("");
  const subcategory: Ref<string> = ref("");
  const image: Ref<string | null> = ref(null);

  const nameError: ComputedRef<string | null> = computed(() => {
    if (
      inventory.allProducts.find(
        (p) => p.name.toLowerCase() === name.value.trim().toLowerCase()
      )
    )
      return "El producto ya está registrado";
    if (name.value.length > 100) return "El nombre del producto es muy grande";
    return null;
  });
  const stockError: ComputedRef<string | null> = computed(() => {
    if (!/^\d+$/.test(stock.value) || stock.value === "")
      return "Debe ser un número";
    return null;
  });
  const priceError: ComputedRef<string | null> = computed(() => {
    if (!/^\d+(\.\d{1,2})?$/.test(price.value) || price.value === "")
      return "Debe ser un número con máximo 2 decimales";
    return null;
  });

  const disabled: ComputedRef<boolean> = computed(() => {
    const isEmpty = (v: string) => v.length === 0;
    return !(
      !isEmpty(name.value) &&
      nameError.value === null &&
      !isEmpty(description.value) &&
      stockError.value === null &&
      priceError.value === null &&
      !isEmpty(category.value) &&
      !isEmpty(subcategory.value) &&
      image.value !== null
    );
  });

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("name", name.value);
    form.append("description", description.value);
    form.append("stock", stock.value);
    form.append("price", price.value);
    form.append("category", category.value);
    form.append("subcategory", subcategory.value);
    form.append("image", dataURLtoFile(image.value || "", name.value));

    toast.promise(
      requestP(AdminInventory, {
        method: "POST",
        body: form,
      }),
      {
        loading: "Cargando...",
        success: (_) => {
          inventory.fetch().then(() => {});
          return "Se agrego el producto con éxito.";
        },
        error: ({ response }) => {
          if (response.status === 400) return "Datos invalidos.";
          if (response.status === 409) return "El producto ya existe.";
          return "Ha ocurrido un error, intentelo más tarde.";
        },
      }
    );

    name.value = "";
    description.value = "";
    stock.value = "0";
    price.value = "0";
    category.value = "";
    subcategory.value = "";
    image.value = null;
  };

  const handleReset = () => {
    name.value = "";
    description.value = "";
    stock.value = "0";
    price.value = "0";
    category.value = "";
    subcategory.value = "";
    image.value = null;
  };

  return {
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
  };
};
