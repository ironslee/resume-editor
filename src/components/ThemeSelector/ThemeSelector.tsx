import { type FC } from "react";
import { Select, Typography } from "antd";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setTheme } from "../../redux/slices/resumeSlice";

const { Title } = Typography;

const ThemeSelector: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.resume.theme);

  return (
    <>
      <Title level={5}>Настройки шрифта</Title>
      <Select
        style={{ width: "100%", marginBottom: 8 }}
        value={theme.fontFamily}
        onChange={(value) => dispatch(setTheme({ fontFamily: value }))}
        options={[
          { value: "serif", label: "Serif" },
          { value: "sans-serif", label: "Sans-serif" },
          { value: "monospace", label: "Monospace" },
        ]}
      />
      <Select
        style={{ width: "100%" }}
        value={theme.fontSize}
        onChange={(value) => dispatch(setTheme({ fontSize: value }))}
        options={[
          { value: "small", label: "Мелкий" },
          { value: "medium", label: "Средний" },
          { value: "large", label: "Крупный" },
        ]}
      />
    </>
  );
};

export default ThemeSelector;
