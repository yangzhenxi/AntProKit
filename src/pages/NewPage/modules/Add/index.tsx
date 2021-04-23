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
  onSubmit: (record: FormValueType) => Promise<void>;
  Add: number;
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
const Add: React.FC<UpdateFormProps> = (props) => {
  return (
    <FormModal
      Add={props.Add}
      items={items}
      onSubmit={(values) => props.onSubmit(values)}
    ></FormModal>
  );
};

export default Add;
