import type { FC } from "react";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { Typography, Button, Flex } from "antd";
import styles from "./Preview.module.scss";
import type {
  Section,
  ExperienceData,
  EducationData,
  SkillsData,
  CertificatesData,
  AboutData,
  Header,
} from "../../types/types";
import { useAppSelector } from "../../hooks/useAppSelector";
import ThemeSelector from "../ThemeSelector/ThemeSelector";

const { Title, Paragraph, Text } = Typography;

interface Props {
  sections: Section[];
  header: Header;
}

const Preview: FC<Props> = ({ sections, header }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { fontFamily, fontSize } = useAppSelector(
    (state) => state.resume.theme
  );

  const fontSizeMap = {
    small: "14px",
    medium: "18px",
    large: "22px",
  };

  const handleExport = () => {
    if (!previewRef.current) return;

    previewRef.current.classList.add(styles.noBorder);

    html2pdf()
      .set({
        margin: 0,
        filename: "resume.pdf",
        html2canvas: { scale: 1.5 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: {
          mode: ["avoid-all"],
        },
      })
      .from(previewRef.current)
      .save()
      .then(() => {
        previewRef.current?.classList.remove(styles.noBorder);
      });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div
          ref={previewRef}
          className={styles.preview}
          style={
            {
              "--resume-font-family": fontFamily,
              "--resume-font-size": fontSizeMap[fontSize],
            } as React.CSSProperties
          }
        >
          <Flex vertical className={styles.header}>
            {header.name && (
              <Title level={2} style={{ marginBottom: 0 }}>
                {header.name}
              </Title>
            )}
            {header.position && <Text>{header.position}</Text>}
            {header.email && <Text>Email: {header.email}</Text>}
            {header.phone && <Text>Телефон: {header.phone}</Text>}
            {header.location && <Text>Локация: {header.location}</Text>}
          </Flex>

          {sections.map((section) => {
            const { type, data: rawData } = section;

            if (type === "experience") {
              const data = rawData as ExperienceData;
              return (
                <div key={section.id} className={styles.section}>
                  <Title level={4}>Опыт</Title>
                  <Text strong>{data.position}</Text> <br />
                  <Text>{data.company}</Text> <br />
                  <Text type="secondary">{data.period}</Text>
                  <Paragraph>{data.description}</Paragraph>
                </div>
              );
            }

            if (type === "education") {
              const data = rawData as EducationData;
              return (
                <div key={section.id} className={styles.section}>
                  <Title level={4}>Образование</Title>
                  <Text strong>{data.school}</Text> <br />
                  <Text>{data.degree}</Text> <br />
                  <Text type="secondary">{data.period}</Text>
                </div>
              );
            }

            if (type === "skills") {
              const data = rawData as SkillsData;
              return (
                <div key={section.id} className={styles.section}>
                  <Title level={4}>Навыки</Title>
                  <Paragraph>{data.list}</Paragraph>
                </div>
              );
            }

            if (type === "certificates") {
              const data = rawData as CertificatesData;
              return (
                <div key={section.id} className={styles.section}>
                  <Title level={4}>Сертификаты</Title>
                  <Text strong>
                    {data.title} <br />
                    {data.issuer}
                  </Text>{" "}
                  <br />
                  <Text type="secondary">{data.date}</Text>
                </div>
              );
            }

            if (type === "about") {
              const data = rawData as AboutData;
              return (
                <div key={section.id} className={styles.section}>
                  <Title level={4}>О себе</Title>
                  <Paragraph>{data.text}</Paragraph>
                </div>
              );
            }

            return null;
          })}
        </div>
        <Flex vertical className={styles.exportButton}>
          <Button type="primary" onClick={handleExport}>
            Скачать PDF
          </Button>
          <ThemeSelector />
        </Flex>
      </div>
    </>
  );
};

export default Preview;
