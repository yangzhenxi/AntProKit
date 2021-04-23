declare namespace Form {
  type Event = {
    onClick?: () => void;
    onChange?: () => void;
  };
  type item = {
    Components: string;
    name: string;
    placeholder: string;
    label: string;
    rules?: [];
    on?: Event;
  };
}
