export const useInventoryAddProduct = () => {
  const inventory = useInventoryStore();

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
  const quantity: Ref<string> = ref("0");
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
  const quantityError: ComputedRef<string | null> = computed(() => {
    if (!/^\d+$/.test(quantity.value) || quantity.value === "")
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
      quantityError.value === null &&
      priceError.value === null &&
      !isEmpty(category.value) &&
      !isEmpty(subcategory.value) &&
      image.value !== null
    );
  });

  const handleSubmit = () => {
    // console.log({
    //   name: name.value,
    //   description: description.value,
    //   quantity: quantity.value,
    //   price: price.value,
    //   category: category.value,
    //   subcategory: subcategory.value,
    // });
  };

  const handleReset = () => {
    name.value = "";
    description.value = "";
    quantity.value = "0";
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
    quantity,
    quantityError,
    subcategory,
  };
};
