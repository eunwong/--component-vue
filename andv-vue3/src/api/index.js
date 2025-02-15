import { get, postJSON } from "@/utils/request.js";
export const Yl0CustomQueryAgent = (params) =>
  postJSON(
    `/levault/yl0backsvr/Yl0BranchFactoryStatisticRate/Yl0CustomQueryAgent`,
    params
  );
