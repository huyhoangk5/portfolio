/** @format */

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import LanguageSelector from './LanguageSelector';

function App() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasDragged, setHasDragged] = useState<boolean>(false);

  const projects = [
    {
      id: 1,
      num: '01',
      title: t('portfolio.project1Title'),
      desc: t('portfolio.project1Desc'),
      image: 'img/portfolio/project1.jpg',
      tag: 'Live Demo',
      tagColor: '#e54b4b',
      tech: ['Quarkus 3.15', 'Java 21', 'Redis', 'LangChain4j', 'React', 'Render', 'Vercel'],
      buttons: [
        {
          label: `${t('portfolio.liveDemo')} ↗`,
          href: 'https://personal-finance-manager-quarkus-fe.vercel.app',
          primary: true,
        },
        {
          label: t('portfolio.githubBe'),
          href: 'https://github.com/huyhoangk5/personal-finance-manager-quarkus',
          primary: false,
        },
        {
          label: t('portfolio.githubFe'),
          href: 'https://github.com/huyhoangk5/personal-finance-manager-quarkus-fe',
          primary: false,
        },
      ],
    },
    {
      id: 2,
      num: '02',
      title: t('portfolio.project2Title'),
      desc: t('portfolio.project2Desc'),
      image: 'img/portfolio/project-ems.jpg',
      tag: 'Full-Stack System',
      tagColor: '#10b981',
      tech: ['Spring Boot 3.2', 'Java 17', 'JWT & Security', 'MySQL', 'React 18', 'Docker Compose'],
      buttons: [
        {
          label: `${t('portfolio.githubRepo')} ↗`,
          href: 'https://github.com/huyhoangk5/ems-project',
          primary: true,
        },
        {
          label: t('portfolio.backend'),
          href: 'https://github.com/huyhoangk5/ems-project/tree/main/ems-backend',
          primary: false,
        },
        {
          label: 'Frontend',
          href: 'https://github.com/huyhoangk5/ems-project/tree/main/ems-frontend',
          primary: false,
        },
      ],
    },
    {
      id: 3,
      num: '03',
      title: t('portfolio.project3Title'),
      desc: t('portfolio.project3Desc'),
      image: 'img/portfolio/project2.jpg',
      tag: 'Real-Time App',
      tagColor: '#3182ce',
      tech: ['Spring Boot', 'WebSocket', 'Apache Kafka', 'Redis', 'Docker Compose', 'React'],
      buttons: [
        {
          label: `${t('portfolio.githubBe')} ↗`,
          href: 'https://github.com/huyhoangk5/fakebook-backend',
          primary: true,
        },
        {
          label: `${t('portfolio.githubFe')} ↗`,
          href: 'https://github.com/huyhoangk5/fakebook-frontend',
          primary: false,
        },
      ],
    },
  ];

  const nextProject = () => {
    setActiveProject((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setHasDragged(false);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || dragStartX === null) return;
    const diff = clientX - dragStartX;
    if (Math.abs(diff) > 5) {
      setHasDragged(true);
    }
    if ((activeProject === 0 && diff > 0) || (activeProject === projects.length - 1 && diff < 0)) {
      setDragOffset(diff * 0.3);
    } else {
      setDragOffset(diff);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -60) {
      nextProject();
    } else if (dragOffset > 60) {
      prevProject();
    }
    setIsDragging(false);
    setDragStartX(null);
    setDragOffset(0);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSendMessage = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage(t('contact.fillRequired'));
      return;
    }

    const mailtoLink = `mailto:hthoang2k5@gmail.com?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Sender: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
    setStatusMessage(t('contact.successMessage'));
  };

  return (
    // <!-- WRAPPER ALL -->
    <div className="arlo_tm_wrapper_all">
      {/* Language Selector - Top Right Corner */}
      <LanguageSelector />

      {/* <!-- MOBILE MENU --> */}
      <div className="arlo_tm_mobile_header_wrap">
        <div className="main_wrap">
          <div className="logo">
            <a href="#home" style={{ textDecoration: 'none' }}>
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '1px',
                }}
              >
                HOANG<span style={{ color: '#e54b4b' }}>.</span>
              </span>
            </a>
          </div>
          <div className="arlo_tm_trigger">
            <div className="hamburger hamburger--collapse-r">
              <div className="hamburger-box">
                <div className="hamburger-inner"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="arlo_tm_mobile_menu_wrap">
          <div className="mob_menu">
            <ul className="anchor_nav">
              <li>
                <a href="#home">{t('menu.home')}</a>
              </li>
              <li>
                <a href="#about">{t('menu.about')}</a>
              </li>
              <li>
                <a href="#skills">{t('menu.skills')}</a>
              </li>
              <li>
                <a href="#services">{t('menu.services')}</a>
              </li>
              <li>
                <a href="#portfolio">{t('menu.portfolio')}</a>
              </li>
              <li>
                <a href="#achievements">{t('menu.achievements')}</a>
              </li>
              <li>
                <a href="#contact">{t('menu.contact')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- /MOBILE MENU --> */}

      {/* <!-- CONTENT --> */}
      <div className="arlo_tm_content">
        {/* <!-- LEFTPART --> */}
        <div className="arlo_tm_leftpart_wrap">
          <div className="leftpart_inner">
            <div className="logo_wrap" style={{ padding: '40px 0 20px 0' }}>
              <a href="#home" style={{ textDecoration: 'none' }}>
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#fff',
                    letterSpacing: '1.5px',
                  }}
                >
                  HOANG<span style={{ color: '#e54b4b' }}>.DEV</span>
                </span>
              </a>
            </div>
            <div className="menu_list_wrap">
              <ul className="anchor_nav">
                <li>
                  <a href="#home">{t('menu.home')}</a>
                </li>
                <li>
                  <a href="#about">{t('menu.about')}</a>
                </li>
                <li>
                  <a href="#skills">{t('menu.skills')}</a>
                </li>
                <li>
                  <a href="#services">{t('menu.services')}</a>
                </li>
                <li>
                  <a href="#portfolio">{t('menu.portfolio')}</a>
                </li>
                <li>
                  <a href="#achievements">{t('menu.achievements')}</a>
                </li>
                <li>
                  <a href="#contact">{t('menu.contact')}</a>
                </li>
              </ul>
            </div>
            <div className="leftpart_bottom">
              <div className="social_wrap">
                <ul>
                  <li>
                    <a
                      href="https://github.com/huyhoangk5"
                      target="_blank"
                      rel="noreferrer"
                      title="GitHub"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/hoang.oan.huy.2024"
                      target="_blank"
                      rel="noreferrer"
                      title="Facebook"
                    >
                      <i className="xcon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://zalo.me/0867669605"
                      target="_blank"
                      rel="noreferrer"
                      title="Zalo (0867669605)"
                    >
                      <i className="xcon-chat"></i>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:hthoang2k5@gmail.com" title="Email">
                      <i className="xcon-mail"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <a className="arlo_tm_resize" href="#">
              <i className="xcon-angle-left"></i>
            </a>
          </div>
        </div>
        {/* <!-- /LEFTPART --> */}

        {/* <!-- RIGHTPART --> */}
        <div className="arlo_tm_rightpart">
          <div className="rightpart_inner">
            {/* <!-- HERO --> */}
            <div className="arlo_tm_section" id="home">
              <div className="arlo_tm_hero_header_wrap">
                <div className="arlo_tm_universal_box_wrap">
                  <div className="bg_wrap">
                    <div
                      className="overlay_image hero jarallax"
                      data-speed="0.1"
                    ></div>
                    <div className="overlay_color hero"></div>
                  </div>
                  <div className="content hero">
                    <div className="inner_content">
                      <div className="image_wrap">
                        <img
                          src="img/hero/img.jpg"
                          alt="Đoàn Huy Hoàng"
                          style={{
                            width: '180px',
                            height: '180px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            border: '4px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                          }}
                        />
                      </div>
                      <div className="name_holder">
                        <h3>
                          {t('about.fullName').split(' ')[0]}{' '}
                          <span>
                            {t('about.fullName').split(' ').slice(1).join(' ')}
                          </span>
                        </h3>
                      </div>
                      <div className="text_typing">
                        <p>
                          {t('hero.greeting')}{' '}
                          <span className="arlo_tm_animation_text_word"></span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="arlo_tm_arrow_wrap bounce anchor">
                    <a href="#about">
                      <i className="xcon-angle-double-down"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /HERO --> */}

            {/* <!-- ABOUT --> */}
            <div className="arlo_tm_section relative" id="about">
              <div className="arlo_tm_about_wrapper_all">
                <div className="container">
                  <div className="arlo_tm_title_holder">
                    <h3>{t('about.title')}</h3>
                    <span>{t('about.subtitle')}</span>
                  </div>
                  <div className="arlo_tm_about_wrap">
                    <div className="author_wrap">
                      <div className="leftbox">
                        <div
                          className="about_image_wrap parallax"
                          data-relative-input="true"
                        >
                          <div className="image layer" data-depth="0.1">
                            <img src="img/about/550x640.jpg" alt="550x640" />
                            <div
                              className="inner"
                              data-img-url="img/about/1.jpg"
                              style={{
                                backgroundImage: 'url(img/about/1.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center top',
                              }}
                            ></div>
                          </div>
                          <div className="border layer" data-depth="0.2">
                            <img src="img/about/550x640.jpg" alt="550x640" />
                            <div className="inner"></div>
                          </div>
                        </div>
                      </div>
                      <div className="rightbox">
                        <div className="arlo_tm_mini_title_holder">
                          <h4>
                            {t('about.intro')}{' '}
                            <span className="arlo_tm_animation_text_word"></span>
                          </h4>
                        </div>
                        <div className="definition">
                          <p style={{ lineHeight: '1.8' }}>
                            {t('about.description')}
                          </p>
                        </div>
                        <div className="about_short_contact_wrap">
                          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px 20px', listStyle: 'none', padding: 0 }}>
                            <li style={{ width: '100%', float: 'none', margin: 0 }}>
                              <span>
                                <label style={{ minWidth: '95px', display: 'inline-block', fontWeight: 600 }}>{t('about.labels.birthday')}:</label>{' '}
                                {t('about.birthday')}
                              </span>
                            </li>
                            <li style={{ width: '100%', float: 'none', margin: 0 }}>
                              <span>
                                <label style={{ minWidth: '95px', display: 'inline-block', fontWeight: 600 }}>{t('about.labels.age')}:</label>{' '}
                                {t('about.age')}
                              </span>
                            </li>
                            <li style={{ width: '100%', float: 'none', margin: 0 }}>
                              <span>
                                <label style={{ minWidth: '95px', display: 'inline-block', fontWeight: 600 }}>{t('about.labels.city')}:</label>{' '}
                                {t('about.city')}
                              </span>
                            </li>
                            <li style={{ width: '100%', float: 'none', margin: 0 }}>
                              <span>
                                <label style={{ minWidth: '95px', display: 'inline-block', fontWeight: 600 }}>{t('about.labels.study')}:</label>{' '}
                                {t('about.study')}
                              </span>
                            </li>
                            <li style={{ width: '100%', float: 'none', margin: 0 }}>
                              <span>
                                <label style={{ minWidth: '95px', display: 'inline-block', fontWeight: 600 }}>{t('about.labels.major')}:</label>{' '}
                                {t('about.major')}
                              </span>
                            </li>
                            <li style={{ width: '100%', float: 'none', margin: 0 }}>
                              <span>
                                <label style={{ minWidth: '95px', display: 'inline-block', fontWeight: 600 }}>{t('about.labels.gpa')}:</label>{' '}
                                <strong>{t('about.gpa')}</strong>
                              </span>
                            </li>
                            <li style={{ width: '100%', float: 'none', margin: 0 }}>
                              <span>
                                <label style={{ minWidth: '95px', display: 'inline-block', fontWeight: 600 }}>{t('about.labels.interests')}:</label>{' '}
                                {t('about.interests')}
                              </span>
                            </li>
                            <li style={{ width: '100%', float: 'none', margin: 0 }}>
                              <span>
                                <label style={{ minWidth: '95px', display: 'inline-block', fontWeight: 600 }}>{t('about.labels.mail')}:</label>{' '}
                                <a href={`mailto:${t('about.mail')}`}>
                                  {t('about.mail')}
                                </a>
                              </span>
                            </li>
                            <li style={{ width: '100%', float: 'none', margin: 0 }}>
                              <span>
                                <label style={{ minWidth: '95px', display: 'inline-block', fontWeight: 600 }}>{t('about.labels.phone')}:</label>{' '}
                                <a href="https://zalo.me/0867669605" target="_blank" rel="noreferrer">
                                  {t('about.phone')}
                                </a>
                              </span>
                            </li>
                            <li style={{ width: '100%', float: 'none', margin: 0 }}>
                              <span>
                                <label style={{ minWidth: '95px', display: 'inline-block', fontWeight: 600 }}>{t('about.labels.website')}:</label>{' '}
                                <a
                                  href={`https://${t('about.website')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {t('about.website')}
                                </a>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="buttons_wrap">
                          <ul>
                            <li>
                              <a
                                href="CV_DoanHuyHoang.pdf"
                                download="CV_DoanHuyHoang.pdf"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <span>{t('about.downloadCV')}</span>
                              </a>
                            </li>
                            <li className="anchor">
                              <a href="#contact">
                                <span>{t('about.sendMessage')}</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /ABOUT --> */}

            {/* <!-- SKILLS --> */}
            <div className="arlo_tm_section" id="skills">
              <div className="arlo_tm_skills_wrap">
                <div className="container">
                  <div className="inner_wrap">
                    <div className="leftbox">
                      <div className="arlo_tm_mini_title_holder">
                        <h4>{t('skills.title')}</h4>
                      </div>
                      <p>{t('skills.description')}</p>
                    </div>
                    <div className="rightbox">
                      <div className="progress_bar_wrap_total">
                        <div
                          className="arlo_tm_progress_wrap"
                          data-size="small"
                          data-round="c"
                          data-strip="off"
                        >
                          <div
                            className="arlo_tm_progress"
                            data-value="90"
                            data-color="#e54b4b"
                          >
                            <span>
                              <span className="label">
                                {t('skills.java')} -{' '}
                                <span className="experience">
                                  2+ years {t('skills.yearsOfExperience')}
                                </span>
                              </span>
                              <span className="number">90%</span>
                            </span>
                            <div className="arlo_tm_bar_bg">
                              <div className="arlo_tm_bar_wrap">
                                <div className="arlo_tm_bar"></div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="arlo_tm_progress"
                            data-value="85"
                            data-color="#e54b4b"
                          >
                            <span>
                              <span className="label">
                                {t('skills.springBoot')} -{' '}
                                <span className="experience">
                                  1+ year {t('skills.yearsOfExperience')}
                                </span>
                              </span>
                              <span className="number">85%</span>
                            </span>
                            <div className="arlo_tm_bar_bg">
                              <div className="arlo_tm_bar_wrap">
                                <div className="arlo_tm_bar"></div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="arlo_tm_progress"
                            data-value="80"
                            data-color="#e54b4b"
                          >
                            <span>
                              <span className="label">
                                {t('skills.react')} -{' '}
                                <span className="experience">
                                  1+ year {t('skills.yearsOfExperience')}
                                </span>
                              </span>
                              <span className="number">80%</span>
                            </span>
                            <div className="arlo_tm_bar_bg">
                              <div className="arlo_tm_bar_wrap">
                                <div className="arlo_tm_bar"></div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="arlo_tm_progress"
                            data-value="80"
                            data-color="#e54b4b"
                          >
                            <span>
                              <span className="label">
                                {t('skills.databaseDevOps')} -{' '}
                                <span className="experience">
                                  1+ year {t('skills.yearsOfExperience')}
                                </span>
                              </span>
                              <span className="number">80%</span>
                            </span>
                            <div className="arlo_tm_bar_bg">
                              <div className="arlo_tm_bar_wrap">
                                <div className="arlo_tm_bar"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /SKILLS --> */}

            {/* <!-- SERVICES / COMPETENCIES --> */}
            <div className="arlo_tm_section" id="services">
              <div className="arlo_tm_services_wrap">
                <div className="container">
                  <div className="arlo_tm_title_holder">
                    <h3>{t('services.title')}</h3>
                    <span>{t('services.subtitle')}</span>
                  </div>
                  <div className="list_wrap">
                    <ul>
                      <li>
                        <div className="inner">
                          <div className="icon">
                            <img
                              className="svg"
                              src="img/svg/layers.svg"
                              alt="backend"
                            />
                          </div>
                          <div className="title_service">
                            <h3>{t('services.backend')}</h3>
                          </div>
                          <div className="text">
                            <p>{t('services.backendDesc')}</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="inner">
                          <div className="icon">
                            <img
                              className="svg"
                              src="img/svg/new-tab.svg"
                              alt="frontend"
                            />
                          </div>
                          <div className="title_service">
                            <h3>{t('services.frontend')}</h3>
                          </div>
                          <div className="text">
                            <p>{t('services.frontendDesc')}</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="inner">
                          <div className="icon">
                            <img
                              className="svg"
                              src="img/svg/share.svg"
                              alt="realtime"
                            />
                          </div>
                          <div className="title_service">
                            <h3>{t('services.realtime')}</h3>
                          </div>
                          <div className="text">
                            <p>{t('services.realtimeDesc')}</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="inner">
                          <div className="icon">
                            <img
                              className="svg"
                              src="img/svg/camera-diaphragm.svg"
                              alt="database"
                            />
                          </div>
                          <div className="title_service">
                            <h3>{t('services.database')}</h3>
                          </div>
                          <div className="text">
                            <p>{t('services.databaseDesc')}</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="inner">
                          <div className="icon">
                            <img
                              className="svg"
                              src="img/svg/adobe-illustrator.svg"
                              alt="ai"
                            />
                          </div>
                          <div className="title_service">
                            <h3>{t('services.ai')}</h3>
                          </div>
                          <div className="text">
                            <p>{t('services.aiDesc')}</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="inner">
                          <div className="icon">
                            <img
                              className="svg"
                              src="img/svg/seo-performance-marketing-graphic.svg"
                              alt="devops"
                            />
                          </div>
                          <div className="title_service">
                            <h3>{t('services.devops')}</h3>
                          </div>
                          <div className="text">
                            <p>{t('services.devopsDesc')}</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /SERVICES --> */}

            {/* <!-- FEATURED PROJECTS (PORTFOLIO) --> */}
            <div className="arlo_tm_section relative" id="portfolio" style={{ paddingBottom: '70px', clear: 'both', width: '100%', float: 'left' }}>
              <div className="container" style={{ clear: 'both' }}>
                <div className="arlo_tm_title_holder" style={{ float: 'none', paddingBottom: '40px' }}>
                  <h3>{t('portfolio.title')}</h3>
                  <span>{t('portfolio.subtitle')}</span>
                </div>
                {/* Slideshow Category / Project Tabs */}
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginBottom: '28px',
                    width: '100%',
                  }}
                >
                  {projects.map((proj, idx) => {
                    const isActive = activeProject === idx;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => setActiveProject(idx)}
                        style={{
                          background: isActive ? '#e54b4b' : 'rgba(255,255,255,0.06)',
                          color: isActive ? '#fff' : '#a0aec0',
                          border: isActive ? '1px solid #e54b4b' : '1px solid rgba(255,255,255,0.1)',
                          padding: '10px 20px',
                          borderRadius: '30px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          transition: 'all 0.3s ease',
                          boxShadow: isActive ? '0 8px 24px rgba(229, 75, 75, 0.35)' : 'none',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '12px',
                            background: isActive ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
                            color: '#fff',
                          }}
                        >
                          {proj.num}
                        </span>
                        <span>{proj.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Slideshow Wrapper */}
                <div
                  style={{
                    position: 'relative',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    width: '100%',
                  }}
                >
                  {/* Left Arrow Button */}
                  <button
                    type="button"
                    onClick={prevProject}
                    aria-label={t('portfolio.prevProject')}
                    style={{
                      position: 'absolute',
                      left: '-20px',
                      top: '40%',
                      transform: 'translateY(-50%)',
                      zIndex: 20,
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'rgba(20, 24, 35, 0.92)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      transition: 'all 0.25s ease',
                      outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#e54b4b';
                      e.currentTarget.style.borderColor = '#e54b4b';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(20, 24, 35, 0.92)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>

                  {/* Right Arrow Button */}
                  <button
                    type="button"
                    onClick={nextProject}
                    aria-label={t('portfolio.nextProject')}
                    style={{
                      position: 'absolute',
                      right: '-20px',
                      top: '40%',
                      transform: 'translateY(-50%)',
                      zIndex: 20,
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'rgba(20, 24, 35, 0.92)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      transition: 'all 0.25s ease',
                      outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#e54b4b';
                      e.currentTarget.style.borderColor = '#e54b4b';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(20, 24, 35, 0.92)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>

                  {/* Viewport with grab cursor */}
                  <div
                    style={{
                      overflow: 'hidden',
                      borderRadius: '16px',
                      cursor: isDragging ? 'grabbing' : 'grab',
                      userSelect: 'none',
                    }}
                    onMouseDown={(e) => handleDragStart(e.clientX)}
                    onMouseMove={(e) => handleDragMove(e.clientX)}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                    onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                    onTouchEnd={handleDragEnd}
                  >
                    {/* Slides Track */}
                    <div
                      style={{
                        display: 'flex',
                        transform: `translateX(calc(-${activeProject * 100}% + ${dragOffset}px))`,
                        transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1)',
                        width: '100%',
                      }}
                    >
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          style={{
                            flex: '0 0 100%',
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '2px',
                          }}
                        >
                          <div
                            className="project_card"
                            style={{
                              background: '#1a1f2c',
                              borderRadius: '16px',
                              overflow: 'hidden',
                              border: '1px solid rgba(255,255,255,0.1)',
                              boxShadow: 'none',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            {/* Card Image Banner */}
                            <div
                              style={{
                                position: 'relative',
                                overflow: 'hidden',
                                height: '390px',
                                background: '#0e121a',
                              }}
                            >
                              <img
                                src={proj.image}
                                alt={proj.title}
                                draggable={false}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  objectPosition: 'top center',
                                  display: 'block',
                                }}
                              />
                              {/* Top-Left Project Counter */}
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '18px',
                                  left: '18px',
                                  background: 'rgba(15, 20, 31, 0.85)',
                                  backdropFilter: 'blur(8px)',
                                  color: '#fff',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  letterSpacing: '1px',
                                  padding: '6px 14px',
                                  borderRadius: '20px',
                                  border: '1px solid rgba(255,255,255,0.15)',
                                }}
                              >
                                {proj.num} / 03
                              </div>

                              {/* Top-Right Category Badge */}
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '18px',
                                  right: '18px',
                                  background: proj.tagColor,
                                  color: '#fff',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                  padding: '6px 14px',
                                  borderRadius: '20px',
                                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                }}
                              >
                                {proj.tag}
                              </div>
                            </div>

                            {/* Card Content */}
                            <div
                              style={{
                                padding: '30px 35px',
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <h3
                                style={{
                                  fontSize: '24px',
                                  fontWeight: 700,
                                  color: '#fff',
                                  marginBottom: '14px',
                                }}
                              >
                                {proj.title}
                              </h3>
                              <p
                                style={{
                                  color: '#cbd5e0',
                                  fontSize: '15px',
                                  lineHeight: '1.7',
                                  marginBottom: '20px',
                                }}
                              >
                                {proj.desc}
                              </p>

                              {/* Tech Stack Badges */}
                              <div
                                style={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: '10px',
                                  marginBottom: '26px',
                                }}
                              >
                                {proj.tech.map((badge) => (
                                  <span
                                    key={badge}
                                    style={{
                                      fontSize: '12px',
                                      fontWeight: 500,
                                      padding: '5px 12px',
                                      borderRadius: '6px',
                                      background: 'rgba(255,255,255,0.07)',
                                      color: '#cbd5e0',
                                      border: '1px solid rgba(255,255,255,0.12)',
                                    }}
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </div>

                              {/* Action Buttons */}
                              <div
                                style={{
                                  marginTop: 'auto',
                                  display: 'flex',
                                  gap: '12px',
                                  flexWrap: 'wrap',
                                }}
                              >
                                {proj.buttons.map((btn, btnIdx) => (
                                  <a
                                    key={btnIdx}
                                    href={btn.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => {
                                      if (hasDragged) {
                                        e.preventDefault();
                                      }
                                    }}
                                    style={{
                                      padding: '11px 22px',
                                      background: btn.primary ? '#e54b4b' : 'rgba(255,255,255,0.08)',
                                      color: '#fff',
                                      borderRadius: '7px',
                                      fontSize: '14px',
                                      fontWeight: 600,
                                      textDecoration: 'none',
                                      border: btn.primary ? 'none' : '1px solid rgba(255,255,255,0.12)',
                                      transition: 'all 0.25s ease',
                                      boxShadow: btn.primary ? '0 6px 18px rgba(229, 75, 75, 0.3)' : 'none',
                                    }}
                                  >
                                    {btn.label}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Slideshow Bottom Navigation & Indicators */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '22px',
                      padding: '0 6px',
                      flexWrap: 'wrap',
                      gap: '15px',
                    }}
                  >
                    {/* Dots indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {projects.map((_, dotIdx) => {
                        const isActive = activeProject === dotIdx;
                        return (
                          <button
                            key={dotIdx}
                            type="button"
                            onClick={() => setActiveProject(dotIdx)}
                            aria-label={`Slide ${dotIdx + 1}`}
                            style={{
                              width: isActive ? '32px' : '10px',
                              height: '10px',
                              borderRadius: '10px',
                              background: isActive ? '#e54b4b' : 'rgba(255,255,255,0.25)',
                              border: 'none',
                              cursor: 'pointer',
                              padding: 0,
                              transition: 'all 0.3s ease',
                            }}
                          />
                        );
                      })}
                    </div>


                    {/* Numeric counter */}
                    <span
                      style={{
                        color: '#a0aec0',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                      }}
                    >
                      0{activeProject + 1} / 03
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /FEATURED PROJECTS --> */}

            {/* <!-- ACHIEVEMENTS & ACTIVITIES --> */}
            <div className="arlo_tm_section" id="achievements" style={{ paddingBottom: '70px' }}>
              <div className="container">
                <div className="arlo_tm_title_holder">
                  <h3>{t('achievements.title')}</h3>
                  <span>{t('achievements.subtitle')}</span>
                </div>
              </div>
              <div className="container" style={{ marginTop: '45px' }}>
                {/* 3 Metric Counters */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '24px',
                    marginBottom: '35px',
                  }}
                >
                  <div
                    style={{
                      background: '#fff',
                      padding: '32px 24px',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                      borderTop: '4px solid #e54b4b',
                      textAlign: 'center',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <h3 style={{ fontSize: '46px', fontWeight: 800, color: '#e54b4b', marginBottom: '8px', lineHeight: 1 }}>
                      {t('achievements.gpaNumber')}
                    </h3>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1a202c', marginBottom: '8px' }}>
                      {t('achievements.gpaLabel')}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#718096', margin: 0 }}>
                      {t('achievements.gpaDesc')}
                    </p>
                  </div>

                  <div
                    style={{
                      background: '#fff',
                      padding: '32px 24px',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                      borderTop: '4px solid #3182ce',
                      textAlign: 'center',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <h3 style={{ fontSize: '46px', fontWeight: 800, color: '#3182ce', marginBottom: '8px', lineHeight: 1 }}>
                      {t('achievements.scholarshipNumber')}
                    </h3>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1a202c', marginBottom: '8px' }}>
                      {t('achievements.scholarshipLabel')}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#718096', margin: 0 }}>
                      {t('achievements.scholarshipDesc')}
                    </p>
                  </div>

                  <div
                    style={{
                      background: '#fff',
                      padding: '32px 24px',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                      borderTop: '4px solid #38a169',
                      textAlign: 'center',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <h3 style={{ fontSize: '46px', fontWeight: 800, color: '#38a169', marginBottom: '8px', lineHeight: 1 }}>
                      {t('achievements.projectsNumber')}
                    </h3>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1a202c', marginBottom: '8px' }}>
                      {t('achievements.projectsLabel')}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#718096', margin: 0 }}>
                      {t('achievements.projectsDesc')}
                    </p>
                  </div>
                </div>

                {/* 2 Detailed Highlight Cards */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {/* Research Card */}
                  <div
                    style={{
                      background: '#fff',
                      padding: '32px',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                      borderLeft: '5px solid #e54b4b',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: 'rgba(229, 75, 75, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#e54b4b',
                          fontSize: '20px',
                        }}
                      >
                        <i className="xcon-bookmark"></i>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color: '#e54b4b',
                            letterSpacing: '1px',
                          }}
                        >
                          HaUI Research
                        </span>
                        <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1a202c', margin: 0 }}>
                          {t('achievements.researchTitle')}
                        </h4>
                      </div>
                    </div>
                    <p style={{ color: '#4a5568', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                      {t('achievements.researchDesc')}
                    </p>
                  </div>

                  {/* Leadership Card */}
                  <div
                    style={{
                      background: '#fff',
                      padding: '32px',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                      borderLeft: '5px solid #3182ce',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: 'rgba(49, 130, 206, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#3182ce',
                          fontSize: '20px',
                        }}
                      >
                        <i className="xcon-thumbs-up"></i>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color: '#3182ce',
                            letterSpacing: '1px',
                          }}
                        >
                          Leadership & Soft Skills
                        </span>
                        <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1a202c', margin: 0 }}>
                          {t('achievements.leadershipTitle')}
                        </h4>
                      </div>
                    </div>
                    <p style={{ color: '#4a5568', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                      {t('achievements.leadershipDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /ACHIEVEMENTS & ACTIVITIES --> */}

            {/* <!-- CONTACT & FOOTER --> */}
            <div className="arlo_tm_section" id="contact">
              <div className="container">
                <div className="arlo_tm_title_holder contact">
                  <h3>{t('contact.title')}</h3>
                  <span>{t('contact.subtitle')}</span>
                </div>
              </div>
              <div className="arlo_tm_footer_contact_wrapper_all">
                <div className="arlo_tm_contact_wrap_all">
                  <div className="container">
                    <div className="leftbox">
                      <div className="arlo_tm_mini_title_holder contact">
                        <h4>{t('contact.getInTouch')}</h4>
                      </div>
                      <div className="short_info_wrap">
                        <ul>
                          <li>
                            <p>
                              <label>{t('contact.labels.address')}:</label>
                              <span>{t('contact.address')}</span>
                            </p>
                          </li>
                          <li>
                            <p>
                              <label>{t('contact.labels.email')}:</label>
                              <span>
                                <a href={`mailto:${t('contact.email')}`}>
                                  {t('contact.email')}
                                </a>
                              </span>
                            </p>
                          </li>
                          <li>
                            <p>
                              <label>{t('contact.labels.phone')}:</label>
                              <span>
                                <a href="https://zalo.me/0867669605" target="_blank" rel="noreferrer">
                                  {t('contact.phone')}
                                </a>
                              </span>
                            </p>
                          </li>
                          <li>
                            <p>
                              <label>{t('contact.labels.website')}:</label>
                              <span>
                                <a
                                  href={`https://${t('contact.website')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {t('contact.website')}
                                </a>
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="rightbox">
                      <div className="arlo_tm_contact_wrap">
                        <div className="main_input_wrap">
                          <form className="contact_form" onSubmit={handleSendMessage}>
                            {statusMessage && (
                              <div
                                style={{
                                  padding: '12px 16px',
                                  marginBottom: '16px',
                                  background: 'rgba(229, 75, 75, 0.15)',
                                  border: '1px solid #e54b4b',
                                  borderRadius: '6px',
                                  color: '#fff',
                                  fontSize: '14px',
                                }}
                              >
                                {statusMessage}
                              </div>
                            )}
                            <div className="wrap">
                              <input
                                id="name"
                                type="text"
                                placeholder={t('contact.yourName')}
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="wrap">
                              <input
                                id="email"
                                type="email"
                                placeholder={t('contact.yourEmail')}
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="wrap">
                              <textarea
                                id="message"
                                placeholder={t('contact.yourMessage')}
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                              ></textarea>
                            </div>
                            <div className="arlo_tm_button">
                              <a
                                id="send_message"
                                href="#contact"
                                onClick={handleSendMessage}
                              >
                                <span>{t('contact.sendMessage')}</span>
                              </a>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="arlo_tm_footer_wrap">
                  <div className="container">
                    <p>{t('contact.copyright')}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /CONTACT & FOOTER --> */}
          </div>
        </div>
        {/* <!-- /RIGHTPART --> */}

        <a className="arlo_tm_totop" href="#"></a>
      </div>
    </div>
  );
}

export default App;
