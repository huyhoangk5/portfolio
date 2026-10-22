import React, { createContext, useState, useContext } from 'react';

type Language = 'en' | 'vi';

interface Translations {
  menu: {
    home: string;
    about: string;
    skills: string;
    services: string;
    portfolio: string;
    achievements: string;
    contact: string;
  };
  hero: {
    greeting: string;
  };
  about: {
    title: string;
    subtitle: string;
    fullName: string;
    intro: string;
    description: string;
    birthday: string;
    age: string;
    city: string;
    interests: string;
    study: string;
    major: string;
    gpa: string;
    website: string;
    mail: string;
    phone: string;
    facebook: string;
    github: string;
    downloadCV: string;
    sendMessage: string;
    labels: {
      birthday: string;
      age: string;
      city: string;
      interests: string;
      study: string;
      major: string;
      gpa: string;
      website: string;
      mail: string;
      phone: string;
      facebook: string;
      address: string;
      email: string;
    };
  };
  skills: {
    title: string;
    description: string;
    java: string;
    springBoot: string;
    react: string;
    databaseDevOps: string;
    yearsOfExperience: string;
  };
  services: {
    title: string;
    subtitle: string;
    backend: string;
    backendDesc: string;
    frontend: string;
    frontendDesc: string;
    realtime: string;
    realtimeDesc: string;
    database: string;
    databaseDesc: string;
    ai: string;
    aiDesc: string;
    devops: string;
    devopsDesc: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    all: string;
    fullstack: string;
    backend: string;
    realtime: string;
    liveDemo: string;
    githubBe: string;
    githubFe: string;
    project1Title: string;
    project1Desc: string;
    project2Title: string;
    project2Desc: string;
  };
  achievements: {
    title: string;
    subtitle: string;
    gpaNumber: string;
    gpaLabel: string;
    gpaDesc: string;
    scholarshipNumber: string;
    scholarshipLabel: string;
    scholarshipDesc: string;
    projectsNumber: string;
    projectsLabel: string;
    projectsDesc: string;
    researchTitle: string;
    researchDesc: string;
    leadershipTitle: string;
    leadershipDesc: string;
  };
  contact: {
    title: string;
    subtitle: string;
    getInTouch: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    yourName: string;
    yourEmail: string;
    yourMessage: string;
    sendMessage: string;
    copyright: string;
    successMessage: string;
    fillRequired: string;
    labels: {
      address: string;
      email: string;
      phone: string;
      website: string;
    };
  };
}

const calculateAge = (birthdayString: string): string => {
  const [day, month, year] = birthdayString.split('.').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
    age--;
  }

  return age.toString();
};

const translations: Record<Language, Translations> = {
  en: {
    menu: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      services: 'Competencies',
      portfolio: 'Projects',
      achievements: 'Achievements',
      contact: 'Contact',
    },
    hero: {
      greeting: "I'm a",
    },
    about: {
      title: 'About Me',
      subtitle: 'Main information about me',
      fullName: 'Đoàn Huy Hoàng',
      intro: "I'm Đoàn Huy Hoàng and",
      description:
        'Software Engineering student at Hanoi University of Industry (HaUI) with hands-on experience in building full-stack applications — from system design, database architecture, and RESTful APIs to modern responsive frontends. Passionate about Java Full-stack development, distributed systems, clean architecture, and building production-ready features.',
      birthday: '01.08.2005',
      age: calculateAge('01.08.2005'),
      city: 'Ha Noi, Vietnam',
      interests: 'Clean Code, Microservices, AI Integration',
      study: 'Hanoi University of Industry (HaUI)',
      major: 'Software Engineering',
      gpa: '3.50 / 4.0',
      website: 'github.com/huyhoangk5',
      mail: 'hthoang2k5@gmail.com',
      phone: '0867669605',
      facebook: 'facebook.com/hoang.oan.huy.2024',
      github: 'github.com/huyhoangk5',
      downloadCV: 'Download CV',
      sendMessage: 'Send Message',
      labels: {
        birthday: 'Birthday',
        age: 'Age',
        city: 'Location',
        interests: 'Interests',
        study: 'University',
        major: 'Major',
        gpa: 'GPA',
        website: 'GitHub',
        mail: 'Email',
        phone: 'Phone / Zalo',
        facebook: 'Facebook',
        address: 'Address',
        email: 'Email',
      },
    },
    skills: {
      title: 'Technical Expertise',
      description:
        'Strong command of object-oriented programming, modern Java backend frameworks (Quarkus, Spring Boot), reactive and relational database architectures, message brokers, and responsive React frontend development.',
      java: 'Java (Core, OOP, Collections, Concurrency)',
      springBoot: 'Quarkus & Spring Boot (REST APIs, Security, JWT, Microservices)',
      react: 'React & Frontend (JavaScript, TypeScript, HTML/CSS)',
      databaseDevOps: 'Database & DevOps (MySQL, PostgreSQL, Redis, Kafka, Docker)',
      yearsOfExperience: 'proficient',
    },
    services: {
      title: 'Core Competencies',
      subtitle: 'Areas of technical focus and capability',
      backend: 'Backend & RESTful API',
      backendDesc:
        'Designing and implementing robust RESTful APIs using Quarkus & Spring Boot with JWT authentication, BCrypt, and rate-limiting safeguards.',
      frontend: 'Frontend Web Development',
      frontendDesc:
        'Developing fast, responsive, and intuitive web interfaces utilizing React, modern JavaScript/TypeScript, and component-based design.',
      realtime: 'Real-time & Event Streaming',
      realtimeDesc:
        'Building real-time messaging with WebSocket (STOMP over SockJS) and asynchronous event streaming using Apache Kafka.',
      database: 'Database & Caching',
      databaseDesc:
        'Relational data modeling (MySQL, PostgreSQL, Oracle) integrated with Redis for caching and instant token invalidation.',
      ai: 'AI & LLM Integration',
      aiDesc:
        'Empowering web applications with AI using LangChain4j and OpenAI API for natural language queries and transactional assistants.',
      devops: 'Containerization & CI/CD',
      devopsDesc:
        'Containerizing multi-service stacks with Docker Compose and configuring automated CI/CD deployment pipelines on Render & Vercel.',
    },
    portfolio: {
      title: 'Featured Projects',
      subtitle: 'Featured software engineering projects',
      all: 'All Projects',
      fullstack: 'Full-Stack',
      backend: 'Backend',
      realtime: 'Real-time',
      liveDemo: 'Live Demo',
      githubBe: 'GitHub Backend',
      githubFe: 'GitHub Frontend',
      project1Title: 'Personal Finance Manager',
      project1Desc:
        'Full-stack financial management web application featuring 46 REST API endpoints, JWT authentication, sliding window rate limiting, Redis token invalidation, and LangChain4j + OpenAI conversational chatbot.',
      project2Title: 'Social Network Website',
      project2Desc:
        'Real-time interactive social platform featuring instant messaging via WebSocket (STOMP over SockJS), event streaming notifications with Apache Kafka, Redis user caching, and full Docker Compose containerization.',
    },
    achievements: {
      title: 'Achievements & Activities',
      subtitle: 'Academic performance, scholarships, and scientific research',
      gpaNumber: '3.50',
      gpaLabel: 'Cumulative GPA',
      gpaDesc: 'Excellent standing in Software Engineering at HaUI (scale 4.0)',
      scholarshipNumber: '02',
      scholarshipLabel: 'Academic Scholarships',
      scholarshipDesc: 'HaUI Study Encouragement Scholarships (08/2024 & 03/2025)',
      projectsNumber: '02+',
      projectsLabel: 'Full-Stack Projects',
      projectsDesc: 'End-to-end architectures ready for production deployment',
      researchTitle: 'Scientific Research at HaUI',
      researchDesc:
        'Participating in academic scientific research under the direct mentorship of a Ph.D. lecturer at Hanoi University of Industry (HaUI), developing deep analytical skills, self-directed research, and modern system architectures.',
      leadershipTitle: 'Team Leadership & Collaboration',
      leadershipDesc:
        'Served as team leader for major coursework projects across multiple university subjects; responsible for task delegation, quality review, and team communication.',
    },
    contact: {
      title: 'Contact Me',
      subtitle: 'Get in touch for internships & opportunities',
      getInTouch: 'Get in Touch',
      address: 'Ha Noi, Vietnam',
      email: 'hthoang2k5@gmail.com',
      phone: '0867669605 (Zalo)',
      website: 'github.com/huyhoangk5',
      yourName: 'Your Name',
      yourEmail: 'Your Email',
      yourMessage: 'Your Message',
      sendMessage: 'Send Message',
      copyright: '© 2026 Đoàn Huy Hoàng. All Rights Reserved.',
      successMessage: 'Your email client has been opened. Thank you!',
      fillRequired: 'Please fill in required fields',
      labels: {
        address: 'Address',
        email: 'Email',
        phone: 'Phone / Zalo',
        website: 'GitHub',
      },
    },
  },
  vi: {
    menu: {
      home: 'Trang chủ',
      about: 'Về tôi',
      skills: 'Kỹ năng',
      services: 'Thế mạnh',
      portfolio: 'Dự án',
      achievements: 'Thành tích',
      contact: 'Liên hệ',
    },
    hero: {
      greeting: 'Tôi là',
    },
    about: {
      title: 'Về Tôi',
      subtitle: 'Thông tin cá nhân & định hướng nghề nghiệp',
      fullName: 'Đoàn Huy Hoàng',
      intro: 'Tôi là Đoàn Huy Hoàng và',
      description:
        'Xin chào! Tôi là Đoàn Huy Hoàng, sinh viên Kỹ thuật phần mềm tại Đại học Công nghiệp Hà Nội (HaUI) với kinh nghiệm thực tế xây dựng ứng dụng full-stack — từ thiết kế hệ thống, kiến trúc dữ liệu, RESTful API bảo mật đến giao diện người dùng responsive. Định hướng chuyên sâu Java Full-Stack (Quarkus, Spring Boot, React) và phát triển các tính năng sẵn sàng triển khai thực tế.',
      birthday: '01.08.2005',
      age: calculateAge('01.08.2005'),
      city: 'Hà Nội, Việt Nam',
      interests: 'Clean Code, Kiến trúc hệ thống, Tích hợp AI',
      study: 'Đại học Công nghiệp Hà Nội (HaUI)',
      major: 'Kỹ thuật phần mềm',
      gpa: '3.50 / 4.0',
      website: 'github.com/huyhoangk5',
      mail: 'hthoang2k5@gmail.com',
      phone: '0867669605',
      facebook: 'facebook.com/hoang.oan.huy.2024',
      github: 'github.com/huyhoangk5',
      downloadCV: 'Tải xuống CV',
      sendMessage: 'Gửi tin nhắn',
      labels: {
        birthday: 'Ngày sinh',
        age: 'Tuổi',
        city: 'Địa chỉ',
        interests: 'Đam mê',
        study: 'Trường học',
        major: 'Chuyên ngành',
        gpa: 'GPA',
        website: 'GitHub',
        mail: 'Email',
        phone: 'SĐT / Zalo',
        facebook: 'Facebook',
        address: 'Địa chỉ',
        email: 'Email',
      },
    },
    skills: {
      title: 'Kỹ năng chuyên môn',
      description:
        'Nắm vững tư duy lập trình hướng đối tượng, kiến trúc backend hiện đại với Java (Quarkus, Spring Boot), hệ thống cơ sở dữ liệu quan hệ & NoSQL, message broker Kafka và phát triển giao diện React responsive.',
      java: 'Java (Core, OOP, Collections, Concurrency)',
      springBoot: 'Quarkus & Spring Boot (REST APIs, Security, JWT, Microservices)',
      react: 'React & Frontend (JavaScript, TypeScript, HTML/CSS)',
      databaseDevOps: 'Database & DevOps (MySQL, PostgreSQL, Redis, Kafka, Docker)',
      yearsOfExperience: 'thành thạo',
    },
    services: {
      title: 'Thế mạnh chuyên môn',
      subtitle: 'Các lĩnh vực kỹ thuật trọng tâm',
      backend: 'Phát triển Backend & REST API',
      backendDesc:
        'Thiết kế và triển khai 46+ REST API endpoint hiệu năng cao với Quarkus & Spring Boot, xác thực JWT, mã hóa mật khẩu BCrypt và giới hạn tần suất truy cập.',
      frontend: 'Phát triển Giao diện Web',
      frontendDesc:
        'Xây dựng giao diện người dùng trực quan, responsive mượt mà trên mọi thiết bị với React, TypeScript và các thư viện component hiện đại.',
      realtime: 'Hệ thống Real-time & Messaging',
      realtimeDesc:
        'Xây dựng tính năng nhắn tin tức thì qua WebSocket (STOMP over SockJS) và luồng xử lý sự kiện bất đồng bộ với message broker Apache Kafka.',
      database: 'Cơ sở dữ liệu & Caching',
      databaseDesc:
        'Thiết kế mô hình dữ liệu (MySQL, PostgreSQL, Oracle), kết hợp Redis cache tăng tốc truy vấn và thu hồi token tức thời.',
      ai: 'Tích hợp AI & Chatbot LLM',
      aiDesc:
        'Tích hợp LangChain4j và OpenAI API để phân tích giao dịch bằng ngôn ngữ tự nhiên và cung cấp chatbot trợ lý tài chính thông minh.',
      devops: 'Đóng gói Docker & CI/CD',
      devopsDesc:
        'Đóng gói toàn bộ hệ thống đa dịch vụ bằng Docker Compose, thiết lập quy trình CI/CD tự động triển khai backend trên Render và frontend trên Vercel.',
    },
    portfolio: {
      title: 'Dự án nổi bật',
      subtitle: 'Các dự án phần mềm tiêu biểu',
      all: 'Tất cả',
      fullstack: 'Full-Stack',
      backend: 'Backend',
      realtime: 'Real-time',
      liveDemo: 'Xem trực tiếp',
      githubBe: 'GitHub Backend',
      githubFe: 'GitHub Frontend',
      project1Title: 'Personal Finance Manager',
      project1Desc:
        'Ứng dụng web quản lý tài chính full-stack với 46 REST API endpoint, xác thực JWT, thu hồi token tức thời qua Redis, giới hạn tần suất truy cập sliding-window và tích hợp trợ lý chatbot thông minh LangChain4j + OpenAI.',
      project2Title: 'Social Network Website',
      project2Desc:
        'Mạng xã hội tương tác thời gian thực với tính năng nhắn tin tức thì qua WebSocket (STOMP over SockJS), luồng xử lý thông báo với Apache Kafka, cache dữ liệu người dùng qua Redis và đóng gói toàn bộ hệ thống bằng Docker Compose.',
    },
    achievements: {
      title: 'Thành Tích & Hoạt Động',
      subtitle: 'Kết quả học tập, học bổng và nghiên cứu khoa học',
      gpaNumber: '3.50',
      gpaLabel: 'Điểm GPA Tích Lũy',
      gpaDesc: 'Xếp loại Giỏi ngành Kỹ thuật phần mềm HaUI (thang điểm 4.0)',
      scholarshipNumber: '02',
      scholarshipLabel: 'Học Bổng Khuyến Khích',
      scholarshipDesc: 'Học bổng khuyến khích học tập HaUI (08/2024 & 03/2025)',
      projectsNumber: '02+',
      projectsLabel: 'Dự Án Full-Stack',
      projectsDesc: 'Hệ thống thực tế hoàn chỉnh, sẵn sàng đưa vào vận hành',
      researchTitle: 'Nghiên Cứu Khoa Học tại HaUI',
      researchDesc:
        'Tham gia nghiên cứu khoa học dưới sự hướng dẫn trực tiếp của Tiến sĩ tại trường Đại học Công nghiệp Hà Nội (HaUI), phát triển tư duy nghiên cứu độc lập, phân tích học thuật và tiếp cận kiến trúc hệ thống chuyên sâu.',
      leadershipTitle: 'Kỹ Năng Làm Việc Nhóm & Trưởng Nhóm',
      leadershipDesc:
        'Từng làm nhóm trưởng nhiều môn học khi làm bài tập lớn tại trường; chịu trách nhiệm phân chia công việc, đánh giá chất lượng và kết nối các thành viên hoàn thành xuất sắc mục tiêu.',
    },
    contact: {
      title: 'Liên hệ',
      subtitle: 'Kết nối cho cơ hội thực tập & công việc',
      getInTouch: 'Thông tin liên hệ',
      address: 'Hà Nội, Việt Nam',
      email: 'hthoang2k5@gmail.com',
      phone: '0867669605 (Zalo)',
      website: 'github.com/huyhoangk5',
      yourName: 'Tên của bạn',
      yourEmail: 'Email của bạn',
      yourMessage: 'Tin nhắn của bạn',
      sendMessage: 'Gửi tin nhắn',
      copyright: '© 2026 Đoàn Huy Hoàng. Tất cả các quyền được bảo lưu.',
      successMessage: 'Trình gửi email đã được mở. Cảm ơn bạn!',
      fillRequired: 'Vui lòng điền thông tin bắt buộc',
      labels: {
        address: 'Địa chỉ',
        email: 'Email',
        phone: 'SĐT / Zalo',
        website: 'GitHub',
      },
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved && (saved === 'en' || saved === 'vi') ? saved : 'vi';
  });

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
