import { PageContainer } from '@ant-design/pro-layout';
import { Button, message, Upload, Space, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { useRef } from 'react';
import enums from '@/enum';
import { rule, addRule, removeRule } from '@/services/ant-design-pro/api';
import { FormModal } from '@/components/Form';
import type { ProModalRef } from '@/components/Form/FormModal';
import { ProTableOur } from '@/components/Table';
import type { ProOurColumns } from '@/components/Table/ProTable';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const uploadprops = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info: any) {
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const NewPage: React.FC = () => {
  const { Dragger } = Upload;
  /* tableRef */
  const tableRef = useRef<ActionType>();
  const proModalRef = useRef<ProModalRef>(null);
  // 渲染表格
  const reloadAndRest = () => {
    tableRef?.current?.reloadAndRest?.();
  };

  interface FormValueType {
    name?: string;
    type?: boolean;
  }
  // 移除函数
  const handleRemove = (record: API.RuleListItem) => {
    confirm({
      title: `是否要删除${record.name}`,
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

  // 新增 和 修改 函数
  const handleAddUpdate = async (values: FormValueType) => {
    try {
      await addRule(values);
      message.success('新增成功');
    } catch (error) {
      reloadAndRest();
      message.success('新增失败');
    }
  };
  // columns
  const columns: ProOurColumns[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
      hideInForm: false,
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
      valueType: 'image',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入！',
          },
        ],
      },
      hideInSearch: true,
      renderFormItem() {
        return (
          <Dragger {...uploadprops}>
            <p className="ant-upload-drag-icon">
              <PlusCircleOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
            <p className="ant-upload-hint">支持单个文件上传</p>
          </Dragger>
        );
      },
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
      <ProTableOur
        actionRef={tableRef}
        headerTitle="Test"
        columns={columns}
        rowKey="key"
        requestOur={rule}
        rowSelection={{}}
        tableAlertOptionRender={() => {
          // console.log(selectedRowKeys, selectedRows, onCleanSelected);
          return (
            <Space size={16}>
              <a>批量删除</a>
              <a>导出数据</a>
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
