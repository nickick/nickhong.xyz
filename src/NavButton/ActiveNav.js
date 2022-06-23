import { useEffect, useState } from 'react';
import NavButton from '.';
import useActiveSection from '../hooks/useActiveSection';
import { leftNav } from './social-links';

export default function ActiveNav() {
  const [activeSection, setActiveSection] = useState('home');

  const { sectionInView } = useActiveSection();

  useEffect(() => {
    const onscroll = () => {
      setActiveSection(sectionInView());
    };

    window.addEventListener('scroll', onscroll);
    setActiveSection(sectionInView());

    return (() => {
      window.removeEventListener('scroll', onscroll);
    });
  }, [setActiveSection, sectionInView]);

  return (
    <>
      {
        leftNav.map(({ text, href, icon }, index) => (
          <NavButton
            key={text + href}
            text={text}
            href={href}
            icon={icon}
            anchor={text.toLowerCase()}
            active={text === activeSection}
            index={index}
          />
        ))
      }
    </>
  );
}
