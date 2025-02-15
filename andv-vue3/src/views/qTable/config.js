import { formItemProps } from "ant-design-vue/es/form";

/**
 * t:table
 */
export const config = () => {
  return [
    {
      title: '分厂名称',
      field: "yl0factory",
      scope: ["t"],
      width: 140,
    },
    {
      title: "所属项目",
      field: "yl0belongProject",
      scope: ["t",'s','add','e'],//'add','e'
      width: 140,
      inputType: "qInput",
      colAttr: {
        // style_s: { flex: "0 0 300px" },
        span_add: 12, 
        span_e: 24,
        
      },
      formItemAttr:{
        rules: [
          {
            required: true,
            message: "请输入所属项目",
          },
        ],
      },
      inputAttr:{
        // placeholder: "请输入所属项目",
      }
    },
    {
      title: "年度",
      field: "yl0year",
      scope: ["t", "s"],
      width: 140,
      inputType: "qInput",
      colAttr: {
        style_s: { flex: "0 0 300px" },
      },
    },
    {
      title: "月度",
      width: 120,
      field: "yl0monthly",
      scope: ["t", "s"],
      inputType: "qInput",
      colAttr: {
        style_s: { flex: "0 0 300px" },
      },
    },
    {
      title: "天",
      width: 120,
      field: "yl0daily",
      scope: ["t", "s"],
      inputType: "qInput",
      colAttr: {
        style_s: { flex: "0 0 600px", width: "600x" },
        span_s: 12,
      },
    },
    {
      title: "设备编码",
      width: 120,
      scope: ["t"],
      field: "yl0equCode",
    },
    {
      title: "设备名称",
      width: 120,
      scope: ["t"],
      field: "yl0equName",
    },
    {
      title: "开机时间(小时)",
      width: 180,
      scope: ["t"],
      field: "yl0bootTime",
    },
    {
      title: "加工时间(小时)",
      width: 160,
      scope: ["t"],
      field: "yl0processTime",
    },
    {
      title: "总时间",
      field: "yl0totalTime",
      scope: ["t"],
      minWidth: 180,
      inputType: "nInput",
    },
    {
      title: "稼动率",
      field: "yl0utilizationRate",
      scope: ["t"],
      width: 240,
      inputType: "nInput",
      formatter: ({ cellValue }) => {
        return Math.floor(Number(cellValue) * 100) + "%";
      },
    },
    // { title: 'A率', field: 'yl0rateA', scope: ['t'], minWidth: 180, inputType: 'nInput' },
    {
      title: "日设备A率",
      width: 120,
      scope: ["t"],
      field: "yl0rateDay",
      formatter: ({ cellValue }) => {
        return cellValue ? cellValue + "%" : "-";
      },
    },
    {
      title: "月设备A率",
      width: 120,
      scope: ["t"],
      field: "yl0ratea",
      formatter: ({ cellValue }) => {
        return cellValue ? cellValue + "%" : "-";
      },
    },
    {
      title: "操作",
      width: 140,
      scope: ["t"],
      field: "HANDLER",
    },
  ];
};
