// src/hooks/useTable.js
import { ref, reactive } from "vue";

export function useForm(pagingLoad) {
  function formSubmit(type, parsm) {
    if (type === "add") {
      pagingLoad({ ...parsm, type });
    } else if (type === "edit") {
      pagingLoad({ ...parsm, type });
    } else if (type === "delete") {
      pagingLoad({ ...parsm, type });
    }
  }

  return {
    formSubmit,
  };
}
