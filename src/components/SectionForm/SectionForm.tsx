import type { FC } from "react";
import { Button, Form, Input } from "antd";
import type {
  Section,
  ExperienceData,
  EducationData,
  SkillsData,
  CertificatesData,
  AboutData,
  SectionData,
} from "../../types/types";

interface Props {
  section: Section;
  onChange: (
    data:
      | ExperienceData
      | EducationData
      | SkillsData
      | CertificatesData
      | AboutData
  ) => void;
}

const { TextArea } = Input;

const SectionForm: FC<Props> = ({ section, onChange }) => {
  const { type, data } = section;

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value } as SectionData);
  };

  const handleAiFill = () => {
    switch (type) {
      case "experience":
        onChange({
          position: "Frontend-разработчик",
          company: "ООО Рога и копыта",
          period: "2021–2023",
          description: "Разработка SPA на React, оптимизация UI, CI/CD.",
        });
        break;
      case "education":
        onChange({
          school: "КазНУ им. Аль-Фараби",
          degree: "Информационнык системы",
          period: "2017–2021",
        });
        break;
      case "skills":
        onChange({
          list: "JavaScript, React, TypeScript, Git, HTML, CSS",
        });
        break;
      case "certificates":
        onChange({
          title: "React Developer",
          issuer: "Udemy",
          date: "2023",
        });
        break;
      case "about":
        onChange({
          text: "Внимательный к деталям разработчик, увлечён чистым кодом и UX.",
        });
        break;
    }
  };

  return (
    <Form layout="vertical">
      <Button onClick={handleAiFill} size="small" style={{ marginBottom: 12 }}>
        Пример текста
      </Button>

      {type === "experience" && (
        <>
          <Form.Item label="Должность">
            <Input
              value={(data as ExperienceData).position || ""}
              onChange={(e) => handleChange("position", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Компания">
            <Input
              value={(data as ExperienceData).company || ""}
              onChange={(e) => handleChange("company", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Период">
            <Input
              value={(data as ExperienceData).period || ""}
              onChange={(e) => handleChange("period", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Описание">
            <TextArea
              rows={3}
              value={(data as ExperienceData).description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Form.Item>
        </>
      )}

      {type === "education" && (
        <>
          <Form.Item label="Учебное заведение">
            <Input
              value={(data as EducationData).school || ""}
              onChange={(e) => handleChange("school", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Специальность">
            <Input
              value={(data as EducationData).degree || ""}
              onChange={(e) => handleChange("degree", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Период">
            <Input
              value={(data as EducationData).period || ""}
              onChange={(e) => handleChange("period", e.target.value)}
            />
          </Form.Item>
        </>
      )}

      {type === "skills" && (
        <Form.Item label="Навыки (через запятую)">
          <TextArea
            rows={4}
            value={(data as SkillsData).list || ""}
            onChange={(e) => handleChange("list", e.target.value)}
          />
        </Form.Item>
      )}

      {type === "certificates" && (
        <>
          <Form.Item label="Название сертификата">
            <Input
              value={(data as CertificatesData).title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Организация">
            <Input
              value={(data as CertificatesData).issuer || ""}
              onChange={(e) => handleChange("issuer", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Дата">
            <Input
              value={(data as CertificatesData).date || ""}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </Form.Item>
        </>
      )}

      {type === "about" && (
        <Form.Item label="О себе">
          <TextArea
            rows={4}
            value={(data as AboutData).text || ""}
            onChange={(e) => handleChange("text", e.target.value)}
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default SectionForm;
