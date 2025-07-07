import { useEffect, type FC } from "react";
import { Form, Input, Typography } from "antd";
import styles from "./HeaderEditor.module.scss";
import type { Header } from "../../types/types";

const { Title } = Typography;

interface Props {
  value: Header;
  onChange: (newData: Partial<Header>) => void;
}

const HeaderEditor: FC<Props> = ({ value, onChange }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(value);
  }, [value, form]);

  const handleChange = (changedValues: Partial<Header>) => {
    onChange({ ...value, ...changedValues });
  };

  return (
    <div className={styles.container}>
      <Title level={4}>Контактная информация</Title>
      <Form
        layout="vertical"
        form={form}
        onValuesChange={(changedValues) => handleChange(changedValues)}
      >
        <Form.Item
          label="ФИО"
          name="name"
          rules={[
            { required: true, message: "Пожалуйста, введите ФИО" },
            {
              pattern: /^[А-Яа-яA-Za-z\s_-]+$/,
              message: "ФИО не должно содержать цифры или спецсимволы",
            },
          ]}
        >
          <Input placeholder="введите ФИО" />
        </Form.Item>

        <Form.Item
          label="Должность"
          name="position"
          rules={[
            { required: true, message: "Укажите вашу должность" },
            {
              pattern: /^[А-Яа-яA-Za-z\s_-]+$/,
              message: "Должность не должна содержать цифры или спецсимволы",
            },
          ]}
        >
          <Input placeholder="введите должность" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email", message: "Некорректный email" }]}
        >
          <Input placeholder="введите email" />
        </Form.Item>

        <Form.Item
          label="Телефон"
          name="phone"
          rules={[
            {
              pattern: /^[+()\d\s-]+$/,
              message: "Допустимы только +, цифры, скобки и пробелы",
            },
          ]}
        >
          <Input placeholder="введите номер телефона" />
        </Form.Item>

        <Form.Item label="Локация" name="location">
          <Input placeholder="введите город или страну" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default HeaderEditor;
