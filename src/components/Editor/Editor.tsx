import type { FC } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { Card, Select, Typography } from "antd";
import type {
  Header,
  Section,
  SectionData,
  SectionType,
} from "../../types/types";
import SectionItem from "../SectionItem/SectionItem";
import styles from "./Editor.module.scss";
import HeaderEditor from "../HeaderEditor/HeaderEditor";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

interface Props {
  sections: Section[];
  onAdd: (type: Section["type"]) => void;
  onUpdate: (id: string, data: SectionData) => void;
  onDelete: (id: string) => void;
  setSections: (s: Section[]) => void;
  header: Header;
  onHeaderChange: (data: Partial<Header>) => void;
}

const sectionOptions: { label: string; value: SectionType }[] = [
  { label: "Опыт", value: "experience" },
  { label: "Образование", value: "education" },
  { label: "Навыки", value: "skills" },
  { label: "Сертификаты", value: "certificates" },
  { label: "О себе", value: "about" },
];

const Editor: FC<Props> = ({
  sections,
  onAdd,
  onUpdate,
  onDelete,
  setSections,
  header,
  onHeaderChange,
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(sections);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setSections(reordered);
  };

  return (
    <div className={styles.container}>
      <HeaderEditor value={header} onChange={onHeaderChange} />

      <Title level={5}>Добавить секцию</Title>

      <Select
        placeholder="Выберите секцию"
        className={styles.select}
        onChange={onAdd}
      >
        {sectionOptions.map((opt) => (
          <Option key={opt.value} value={opt.value}>
            {opt.label}
          </Option>
        ))}
      </Select>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.sectionList}
            >
              {sections.map((section, index) => (
                <Draggable
                  draggableId={section.id}
                  index={index}
                  key={section.id}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        size="small"
                        title={sectionOptions.map((opt) =>
                          opt.value === section.type ? opt.label : ""
                        )}
                        extra={
                          <a onClick={() => onDelete(section.id)}>
                            <DeleteOutlined style={{ color: "red" }} />
                          </a>
                        }
                        className={styles.card}
                      >
                        <SectionItem
                          section={section}
                          onUpdate={onUpdate}
                          onDelete={onDelete}
                        />
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Editor;
