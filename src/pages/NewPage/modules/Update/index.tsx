import { FormModal } from '@/components/Form';

interface rule {
  required: boolean;
  message: string;
}

interface item {
  Components: string;
  name: string;
  label: string | number;
  rules?: rule[];
  placeholder?: string;
}
export type FormValueType = {
  name?: string;
  type?: boolean;
};

interface UpdateFormProps {
  currentRow: Partial<API.RuleListItem>;
  onSubmit: (record: FormValueType) => Promise<void>;
  onCancel: () => void;
}
const items: item[] = [
  {
    Components: 'ProFormText',
    name: 'name',
    label: 'text',
    placeholder: '请输入',
    rules: [{ required: true, message: '请输入！' }],
  },
  {
    Components: 'ProFormSwitch',
    name: 'disabled',
    label: '开关',
    placeholder: '请输入',
    rules: [{ required: true, message: '请输入！' }],
  },
  {
    Components: 'ProFormSelect',
    name: 'status',
    label: '选择框',
    placeholder: '请输入',
    rules: [{ required: true, message: '请输入！' }],
  },
  {
    Components: 'ProFormCheckbox',
    name: 'progress',
    label: '复选框',
    placeholder: '请输入',
    rules: [{ required: true, message: '请输入！' }],
  },
];
const Update: React.FC<UpdateFormProps> = (props) => {
  const { currentRow } = props;
  return (
    <FormModal
      items={items}
      initialValues={currentRow}
      onCancel={() => props.onCancel()}
      onSubmit={(values) => props.onSubmit(values)}
    ></FormModal>
  );
};

export default Update;
