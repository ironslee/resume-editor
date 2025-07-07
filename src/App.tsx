import { useEffect } from "react";
import { Button, Flex, Typography } from "antd";
import Editor from "./components/Editor/Editor";
import Preview from "./components/Preview/Preview";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import {
  addSection,
  deleteSection,
  updateSection,
  resetSections,
  reorderSections,
  loadFromStorage,
} from "./redux/slices/resumeSlice";
import { setHeader } from "./redux/slices/resumeSlice";
import styles from "./App.module.scss";

const App = () => {
  const dispatch = useAppDispatch();
  const sections = useAppSelector((state) => state.resume.sections);
  const header = useAppSelector((state) => state.resume.header);
  const theme = useAppSelector((state) => state.resume.theme);

  useEffect(() => {
    const stored = localStorage.getItem("resume_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch(loadFromStorage(parsed));
      } catch (e) {
        console.error("Ошибка загрузки resume_data из localStorage:", e);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const payload = JSON.stringify({ sections, header, theme });
    localStorage.setItem("resume_data", payload);
  }, [sections, header, theme]);

  return (
    <Flex vertical>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Редактор резюме by Irsim Lee
      </Typography.Title>
      <Flex className={styles.wrapper}>
        <Flex className={styles.layout}>
          <Flex className={styles.sider}>
            <Editor
              sections={sections}
              header={header}
              onHeaderChange={(data) => dispatch(setHeader(data))}
              onAdd={(type) => dispatch(addSection(type))}
              onUpdate={(id, data) => dispatch(updateSection({ id, data }))}
              onDelete={(id) => dispatch(deleteSection(id))}
              setSections={(newOrder) => dispatch(reorderSections(newOrder))}
            />
            <Button danger block onClick={() => dispatch(resetSections())}>
              Сбросить резюме
            </Button>
          </Flex>

          <Flex className={styles.content}>
            <Preview sections={sections} header={header} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default App;
