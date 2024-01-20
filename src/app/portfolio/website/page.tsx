import ProjectTemplate from "../../../components/project_template";
import styles from "./page.module.css";

export default function Website() {
  return (
    <ProjectTemplate
      title="Website v4.0"
      subTitle="We don't talk about version 1.0 through 3.0."
      projectDetail={{
        year: 2024,
        stack: "Figma, NextJS, TypeScript",
        github: "https://github.com/YifanYang2000/Portfolio",
      }}
      projectDescription="Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nullam vulputate consequat leo, vitae vehicula est commodo vel.
        Fusce ac cursus mi, sit amet sollicitudin ante. Nullam ut luctus felis,
        eget molestie augue. Cras dapibus, sem non blandit sollicitudin, lacus
        lectus mattis nisl, ac sodales nulla erat sagittis mi. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Nullam vulputate
        consequat leo, vitae vehicula est commodo vel. Fusce ac cursus mi,
        sit amet sollicitudin ante. Nullam ut luctus felis, eget molestie
        augue. Cras dapibus, sem non blandit sollicitudin, lacus lectus
        mattis nisl, ac sodales nulla erat sagittis mi. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nullam vulputate consequat
        leo, vitae vehicula est commodo vel. Fusce ac cursus mi, sit amet
        sollicitudin ante. Nullam ut luctus felis, eget molestie augue. Cras
        dapibus, sem non blandit sollicitudin, lacus lectus mattis nisl, ac
        sodales nulla erat sagittis mi."
    />
  );
}
