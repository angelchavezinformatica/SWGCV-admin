import { toast } from "vue-sonner";
import { AllProvider } from "~/config/api";
import { useFetchJSON } from "~/services/api";

export interface Props {
  id?: number;
  name?: string;
  phoneNumber?: string;
}

export const useProviderForm = (props: Props) => {
  const { fetch } = useProviderStore();
  const { request } = useFetchJSON();
  const router = useRouter();

  const sendValue = props.id ? "Actualizar proveedor" : "Agregar proveedor";
  const id: Ref<number | undefined> = ref(props.id);
  const name: Ref<string> = ref(props.name || "");
  const phoneNumber: Ref<string> = ref(props.phoneNumber || "");

  const phoneNumberError: ComputedRef<string | null> = computed(() => {
    if (!/^\d+$/.test(phoneNumber.value)) return "Debe contener solo números";
    if (phoneNumber.value.length !== 0 && phoneNumber.value.length !== 9)
      return "El número de teléfono debe tener 9 números";
    return null;
  });

  const disabled: ComputedRef<boolean> = computed(
    () =>
      !(
        name.value.length !== 0 &&
        phoneNumber.value.length !== 0 &&
        !phoneNumberError.value
      )
  );

  const handleReset = () => {
    name.value = "";
    phoneNumber.value = "";
  };

  const handleSubmit = async () => {
    const response = await request(AllProvider, {
      method: "PATCH",
      body: { id: id.value, name: name.value, phone_number: phoneNumber.value },
    });

    if (!response.ok) {
      toast.error("Ha ocurrido un error, intentelo más tarde");
      return;
    }

    await fetch();
    router.push("/provider");
    toast.success("Se actualizaron los datos del proveedor exitosamente");
  };

  return {
    disabled,
    handleSubmit,
    handleReset,
    name,
    sendValue,
    phoneNumber,
    phoneNumberError,
  };
};
