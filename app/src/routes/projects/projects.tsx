import { RouteSectionProps } from "@solidjs/router";

const ProjectLayout = (props: RouteSectionProps) => {
  return (
    <div>
      <span>This is a layout</span>
      {props.children}
    </div>
  );
};

export default ProjectLayout;
