export enum Section {
  Home = "Home",
  Projects = "Projects",
  OtherProjects = "OtherProjects",
  Contact = "Contact",
}

const view = new Set<Section>([Section.Home]);

export enum AddOrDelete {
  add = "add",
  delete = "delete",
}

export default function useActiveSection() {
  const setSectionInView = (section: Section, addOrDelete: AddOrDelete) => {
    if (addOrDelete === AddOrDelete.add) {
      view.add(section);
    } else {
      view.delete(section);
    }
  };

  const sectionInView: () => Section = () => {
    if (view.has(Section.Contact)) {
      return Section.Contact;
    } else if (view.has(Section.OtherProjects)) {
      return Section.Projects;
    } else if (view.has(Section.Projects)) {
      return Section.Projects;
    }
    return Section.Home;
  };

  return {
    sectionInView,
    setSectionInView,
  };
}
