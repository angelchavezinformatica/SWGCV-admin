import { ref, type Ref } from "vue";
import { AllProvider } from "~/config/api";
import type { Provider } from "~/interfaces/provider";
import { useFetchJSON } from "~/services/api";

export const useProviderStore = defineStore("provider", () => {
  const allProviders: Ref<Provider[]> = ref([]);
  const { request } = useFetchJSON();

  const fetch = async () => {
    const { getJSON } = await request(AllProvider);
    const json = await getJSON<Provider[]>();
    allProviders.value = json;
  };

  return { allProviders, fetch };
});
