import { useRef } from 'react';
import enums from '@/enum';
import { Button, message, Space, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { FormModal } from '@/components/Form';
import { MTable } from '@/components/Table';
import MIcon from '@/components/Icon';
import type { ActionType } from '@ant-design/pro-table';
import type { ProModalRef } from '@/components/Form/FormModal';
import type { MColumns } from '@/components/Table/MTable';
import { rule, addRule, removeRule } from '@/services/ant-design-pro/api';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const NewPage: React.FC = () => {
  /* tableRef */
  const tableRef = useRef<ActionType>();
  const proModalRef = useRef<ProModalRef>(null);
  // 渲染表格
  const reloadAndRest = () => {
    tableRef?.current?.reloadAndRest?.();
  };

  // 移除函数
  const handleRemove = (record: API.RuleListItem | (number | string)[]) => {
    confirm({
      title: `是否要删除`,
      icon: <ExclamationCircleOutlined />,
      content: '点击确定即可删除',
      onOk: async () => {
        try {
          await removeRule(record);
          message.success('删除成功，即将刷新');
          reloadAndRest();
          return true;
        } catch (error) {
          message.error('删除失败，请重试');
          return false;
        }
      },
    });
  };

  const handleExportData = async (rows: API.RuleListItem[]) => {
    // 导出操作
    await removeRule(rows);
    message.success('删除成功，即将刷新');
  };

  // 新增 和 修改 函数
  const handleAddUpdate = async (values: API.RuleListItem) => {
    try {
      await addRule(values);
      message.success('新增成功');
    } catch (error) {
      reloadAndRest();
      message.success('新增失败');
    }
  };
  // columns
  const columns: MColumns[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
      hideInForm: false,
      symbols: 'eq',
      render: (dom) => {
        return <a>{dom}</a>;
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入！',
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
    },
    {
      title: '文件',
      dataIndex: 'avatar',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入！',
          },
        ],
      },
      render: () => {
        return <span>文件</span>;
      },
      formType: 'file',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: enums.NEWPAGE_STATE,
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
    },
    {
      title: '操作',
      width: 200,
      render: (_, record: API.RuleListItem) => {
        return (
          <Space>
            <Button type="primary" size="small" style={{ marginRight: 15 }}>
              查看
            </Button>
            <Button
              type="primary"
              size="small"
              style={{ marginRight: 15 }}
              onClick={() => {
                proModalRef.current?.show(record);
              }}
            >
              <MIcon type="icon-linux" />
              编辑
            </Button>
            <Button type="primary" size="small" onClick={() => handleRemove(record)} danger>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <MTable
        actionRef={tableRef}
        headerTitle="Test"
        columns={columns}
        rowKey="key"
        MRequest={rule}
        rowSelection={{
          selections: [],
        }}
        tableAlertOptionRender={({ selectedRowKeys, selectedRows }) => {
          return (
            <Space size={16}>
              <a
                onClick={() => {
                  handleRemove(selectedRowKeys);
                }}
              >
                批量删除
              </a>
              <a
                onClick={() => {
                  handleExportData(selectedRows);
                }}
              >
                导出数据
              </a>
            </Space>
          );
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              proModalRef.current?.show();
            }}
          >
            新建
          </Button>,
        ]}
      />
      <FormModal ref={proModalRef} columns={columns} onOk={handleAddUpdate} />
    </PageContainer>
  );
};
export default NewPage;
