import ProTable from '@ant-design/pro-table';
import { useCallback } from 'react';
import type { SortOrder } from 'antd/lib/table/interface';
import type { ProColumns, ProTableProps, RequestData } from '@ant-design/pro-table';

export type ProOurColumns = ProColumns & {
  symbols?: ProOurColumnsSymbols;
};

export type ProRequestOurParam = { filter: TSearchFilterItem[]; pageSize: number; pageNum: number };

type TSearchFilterItem = {
  name: string;
  symbols: ProOurColumnsSymbols;
  value: any;
};
// 判断 eq = , like 模糊 ，ge 大于等于，le 小于等于，orderDesc 倒序，orderAsc 顺序 ,
export type ProOurColumnsSymbols = 'eq' | 'like' | 'ge' | 'le' | 'orderDesc' | 'orderAsc';

export type ProRequestOurOrgData = {
  params: {
    pageSize?: number;
    current?: number;
    keyword?: string;
  };
  sort: Record<string, SortOrder>;
  filter: Record<string, React.ReactText[]>;
};

type ProTableOurProps<T, U> = ProTableProps<T, U> & {
  columns: ProOurColumns[];
  requestOur?: (
    param: ProRequestOurParam,
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => Promise<Partial<RequestData<unknown>>>;
};

function getTableFilterList(param: any, columns: ProOurColumns[]) {
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

const ProTableOur = <T,>(props: ProTableOurProps<T, ProOurColumns>) => {
  const { requestOur, columns } = props;
  const innerRequest = useCallback(
    async (params: any, sort: any, filter: any) => {
      const { current = 1, pageSize = 10 } = params;
      const query = {
        filter: getTableFilterList(params, columns),
        pageSize,
        pageNum: current,
      };
      if (requestOur) {
        const result = await requestOur(query, sort, filter);
        return {
          total: result.total,
          data: result.data as [],
          success: result.success,
        };
      }
      return {};
    },
    [requestOur, columns],
  );

  return <ProTable {...props} request={innerRequest}></ProTable>;
};

export default ProTableOur;
