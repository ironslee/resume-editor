import type { FC } from "react";
import type { Section, SectionData } from "../../types/types";
import SectionForm from "../SectionForm/SectionForm";
import styles from "./SectionItem.module.scss";

interface Props {
  section: Section;
  onUpdate: (id: string, data: SectionData) => void;
  onDelete: (id: string) => void;
}

const SectionItem: FC<Props> = ({ section, onUpdate }) => {
  return (
    <div className={styles.sectionItem}>
      <SectionForm
        section={section}
        onChange={(data) => onUpdate(section.id, data)}
      />
    </div>
  );
};

export default SectionItem;
