import { Modal, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import type { FormInstance } from 'antd';
import type { ForwardRefRenderFunction } from 'react';
import type { MColumns } from '@/components/Table/MTable';
// import type { ProColumns, ProTableProps, RequestData } from '@ant-design/pro-form';

export type ProModalRef = {
  show: (record?: any) => void;
  hide: () => void;
  form: FormInstance | undefined;
};

type FormModalProps = {
  onOk: (values: any) => void;
  columns: MColumns[];
  width?: string;
  title?: string;
  maskClosable?: boolean;
  okText?: string;
  cancelText?: string;
};

const FormModal: ForwardRefRenderFunction<ProModalRef, FormModalProps> = (props, ref) => {
  const {
    columns,
    onOk,
    width = '500px',
    okText = '提交',
    cancelText = '取消',
    maskClosable = false,
  } = props;
  /* Form的Ref */
  const formRef = useRef<FormInstance>();
  /* 弹窗开关 */
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false);
  /* 提交表单的loading */
  const [loading, setLoading] = useState<boolean>(false);

  /* 当前行 */
  const [currentRow, setCurrentRow] = useState();
  /* title设置 */
  const [title, setTitle] = useState<string>();

  /* 取消操作 */
  const handleClose = () => {
    setLoading(false);
    setFormModalVisible(false);
    setCurrentRow(undefined);
    formRef.current?.resetFields();
  };

  /* 确定操作 */
  const handleOk = async () => {
    let result = await formRef?.current?.validateFields();
    if (!result.errorFields) {
      setLoading(true);
      try {
        if (currentRow) {
          result = Object.assign(currentRow, result);
        }
        onOk(result);
        handleClose();
      } catch (error) {
        setLoading(false);
        throw error;
      }
    }
  };

  /* 添加显示隐藏功能 */
  useImperativeHandle(ref, () => ({
    show: (record) => {
      if (record) {
        setTitle('编辑');
        setCurrentRow(record);
        setTimeout(() => {
          formRef.current?.setFieldsValue(record);
        }, 0);
      } else {
        setTitle('新增');
      }
      setFormModalVisible(true);
    },
    hide: () => setFormModalVisible(false),
    form: formRef.current,
  }));

  return (
    <Modal
      width={width}
      title={title}
      visible={formModalVisible}
      maskClosable={maskClosable}
      footer={
        <div>
          <Button onClick={handleClose}>{cancelText}</Button>
          <Button type="primary" loading={loading} onClick={handleOk}>
            {okText}
          </Button>
        </div>
      }
      onCancel={handleClose}
    >
      <ProTable
        formRef={formRef}
        form={{
          submitter: false,
          layout: 'horizontal',
          labelAlign: 'left',
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        }}
        type="form"
        columns={columns}
      />
    </Modal>
  );
};

export default forwardRef(FormModal);
