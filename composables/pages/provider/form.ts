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
    if (phoneNumber.value.length === 0) return null;
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
    let body: { id?: number; name: string; phone_number: string } = {
      name: name.value,
      phone_number: phoneNumber.value,
    };
    if (id.value !== undefined) body = { id: id.value, ...body };
    handleReset();
    const method: "PATCH" | "POST" = id.value !== undefined ? "PATCH" : "POST";

    toast.promise(request(AllProvider, { method, body }), {
      loading: "Cargando...",
      success: () => {
        fetch().then(() => {
          router.push("/provider");
        });
        return id.value !== undefined
          ? "Se actualizó los datos del proveedor exitosamente"
          : "Se creó el proveedor exitosamente";
      },
      error: () => "Ha ocurrido un error, intentelo más tarde",
    });
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
