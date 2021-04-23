import { ProTableOur } from '@/components/Table';

export default () => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      hideInForm: false,
    },
  ];
  return (
    <div>
      <ProTableOur columns={columns}></ProTableOur>
    </div>
  );
};
