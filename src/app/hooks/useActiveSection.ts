const view = new Set(["Home"]);

export default function useActiveSection() {
  const setSectionInView = (section: string, addOrDelete: string) => {
    if (addOrDelete === "add") {
      view.add(section);
    } else {
      view.delete(section);
    }
  };

  const sectionInView = () => {
    if (view.has("Contact")) {
      return "Contact";
    }
    if (view.has("Projects")) {
      return "Projects";
    }
    return "Home";
  };

  return {
    sectionInView,
    setSectionInView,
  };
}
