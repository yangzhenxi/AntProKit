import ProTable from '@ant-design/pro-table';
import { useCallback, useEffect } from 'react';
import type { ProColumns, ProTableProps, RequestData } from '@ant-design/pro-table';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';

const { Dragger } = Upload;
export type MColumns = ProColumns & {
  symbols?: MColumnsSymbols;
  formType?: string;
};

export type MRequestParam = {
  filter?: TSearchFilterItem[];
  pageSize?: number;
  pageNum?: number;
};

type TSearchFilterItem = {
  name: string;
  symbols: MColumnsSymbols;
  value: any;
};
// 判断 eq = , like 模糊 ，ge 大于等于，le 小于等于，orderDesc 倒序，orderAsc 顺序 ,
export type MColumnsSymbols = 'eq' | 'like' | 'ge' | 'le' | 'orderByDesc' | 'orderByAsc';

type MTableProps<T, U> = ProTableProps<T, U> & {
  columns: MColumns[];
  MRequest: (param: MRequestParam) => Promise<Partial<RequestData<unknown>>>;
};

function getTableFilterList(param: any, columns: MColumns[]) {
  return Object.keys(param)
    .filter((u) => u !== 'current' && u !== 'pageSize')
    .map(
      (u): TSearchFilterItem => ({
        name: u,
        value: param[u],
        symbols: columns.find((item) => item.dataIndex === u)?.symbols ?? 'eq',
      }),
    );
}
const uploadprops = {
  name: 'avatar',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info: any) {
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    }
    if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const ProTableOur = <T,>(props: MTableProps<T, MColumns>) => {
  const { MRequest, columns } = props;
  const innerRequest = useCallback(
    async (params?: any) => {
      const { current = 1, pageSize = 10 } = params;
      const query = {
        filter: getTableFilterList(params, columns),
        pageSize,
        pageNum: current,
      };
      if (MRequest) {
        const result = await MRequest(query);
        return {
          total: result.total,
          data: result.data as [],
          success: result.success,
        };
      }
      return {};
    },
    [MRequest, columns],
  );
  useEffect(() => {
    columns.map((item: MColumns) => {
      if (item.formType) {
        // eslint-disable-next-line no-param-reassign
        item.renderFormItem = () => {
          return (
            <Dragger {...uploadprops}>
              <p className="ant-upload-drag-icon">
                <PlusCircleOutlined />
              </p>
              <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
              <p className="ant-upload-hint">支持单个文件上传</p>
            </Dragger>
          );
        };
      }
      return item;
    });
  }, [columns]);

  return <ProTable {...props} request={innerRequest}></ProTable>;
};

export default ProTableOur;
