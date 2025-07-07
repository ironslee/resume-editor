import type { FC } from "react";
import { Input, Typography } from "antd";
import styles from "./HeaderEditor.module.scss";
import type { Header } from "../../types/types";

const { Title } = Typography;

interface Props {
  value: Header;
  onChange: (newData: Partial<Header>) => void;
}

const HeaderEditor: FC<Props> = ({ value, onChange }) => {
  const handleChange = (field: string, newValue: string) => {
    onChange({ ...value, [field]: newValue });
  };

  return (
    <div className={styles.container}>
      <Title level={4}>Контактная информация</Title>
      <div className={styles.fieldGroup}>
        <Input
          placeholder="Имя"
          value={value.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <Input
          placeholder="Должность"
          value={value.position}
          onChange={(e) => handleChange("position", e.target.value)}
        />
        <Input
          placeholder="Email"
          value={value.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          placeholder="Телефон"
          value={value.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <Input
          placeholder="Локация"
          value={value.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>
    </div>
  );
};

export default HeaderEditor;
