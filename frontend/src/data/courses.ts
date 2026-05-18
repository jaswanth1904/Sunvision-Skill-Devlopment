

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
  highlights: string[];
  outcomes: string[];
  quiz: QuizQuestion[];
}

export const coursesData: Record<string, Course> = {
  "ms-office": {
    slug: "ms-office",
    title: "MS Office & Advanced Excel",
    description: "Master the essential office productivity tools including Word, Excel, and PowerPoint with advanced data analysis techniques.",
    duration: "2 Months",
    level: "Beginner to Intermediate",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Advanced Excel formulas & Pivot tables",
      "Professional document formatting in Word",
      "Dynamic presentations with PowerPoint",
      "Data visualization and dashboarding",
      "Automating tasks with Macros"
    ],
    outcomes: [
      "Create professional business reports",
      "Perform complex data calculations",
      "Design impressive sales decks",
      "Efficiently manage office operations",
      "Prepare for MOS certification"
    ],
    quiz: [
      {
        id: 1,
        question: "Which Excel function is used to look up data in a table?",
        options: ["FIND", "LOOKUP", "VLOOKUP", "SEARCH"],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "What is the shortcut to save a document in MS Word?",
        options: ["Ctrl + S", "Ctrl + P", "Ctrl + O", "Ctrl + N"],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "Which view in PowerPoint is best for organizing slide order?",
        options: ["Normal View", "Slide Sorter View", "Reading View", "Slide Show View"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What does 'Pivot Table' primarily do?",
        options: ["Format text", "Draw charts", "Summarize large data", "Check spelling"],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "In Excel, cell addresses like $A$1 are called?",
        options: ["Relative Reference", "Absolute Reference", "Mixed Reference", "Standard Reference"],
        correctAnswer: 1
      }
    ]
  },
  "hardware": {
    slug: "hardware",
    title: "Diploma in Computer Hardware",
    description: "Learn to assemble, troubleshoot, and maintain computer systems and peripherals from scratch.",
    duration: "3 Months",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "PC Assembly and Disassembly",
      "Troubleshooting Hardware components",
      "BIOS/UEFI Configuration",
      "Motherboard & CPU architecture",
      "Peripherals maintenance"
    ],
    outcomes: [
      "Build your own PC from components",
      "Diagnose and fix hardware failures",
      "Upgrade system performance",
      "Set up workstations",
      "Work as a Hardware Technician"
    ],
    quiz: [
      {
        id: 1,
        question: "Which component is the 'brain' of the computer?",
        options: ["RAM", "HDD", "CPU", "GPU"],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "What does BIOS stand for?",
        options: ["Binary Input Output System", "Basic Input Output System", "Basic Internal Operating System", "Built-in Input Output System"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Which type of storage is the fastest?",
        options: ["HDD", "SSD", "CD-ROM", "USB Flash Drive"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is the main function of RAM?",
        options: ["Permanent Storage", "Cooling the PC", "Temporary Data Storage", "Processing Graphics"],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "What does PSU stand for?",
        options: ["Power Supply Unit", "Processing State Unit", "Personal System Unit", "Peripheral Support Unit"],
        correctAnswer: 0
      }
    ]
  },
  "networking": {
    slug: "networking",
    title: "Diploma in Networking",
    description: "Understand the fundamentals of computer networks, IP addressing, routing, and network security.",
    duration: "3 Months",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "OSI Model & TCP/IP suite",
      "IP Subnetting and Routing",
      "Wireless Network setup",
      "Network Cabling and Tools",
      "Basic Network Security"
    ],
    outcomes: [
      "Configure routers and switches",
      "Design secure small-scale networks",
      "Monitor network performance",
      "Resolve connectivity issues",
      "Prepare for CCNA foundation"
    ],
    quiz: [
      {
        id: 1,
        question: "How many layers are in the OSI model?",
        options: ["4", "5", "7", "8"],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "What is the default port for HTTP?",
        options: ["21", "80", "443", "53"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Which device connects two different networks?",
        options: ["Switch", "Hub", "Router", "Repeater"],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "What does DHCP stand for?",
        options: ["Dynamic Host Configuration Protocol", "Data Host Connection Path", "Direct Hub Communication Port", "Domain Host Control Point"],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "What is the maximum value of an octet in an IPv4 address?",
        options: ["128", "254", "255", "256"],
        correctAnswer: 2
      }
    ]
  },
  "tally": {
    slug: "tally",
    title: "Tally ERP9 / Tally Prime",
    description: "Expert-level training in computerized accounting, inventory management, and GST compliance using Tally.",
    duration: "2 Months",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
    highlights: [
      "Journal entries and Ledgers",
      "Inventory & Godown management",
      "GST, TDS, and Payroll",
      "Financial statement analysis",
      "Tally Prime latest features"
    ],
    outcomes: [
      "Manage complete business accounts",
      "Generate GST reports accurately",
      "Handle payroll operations",
      "Perform bank reconciliations",
      "Work as a Professional Accountant"
    ],
    quiz: [
      {
        id: 1,
        question: "Which key is used to select a company in Tally?",
        options: ["F1", "F2", "F3", "F4"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "What is the shortcut for Receipt voucher?",
        options: ["F5", "F6", "F7", "F8"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Where do you check the Profit & Loss statement?",
        options: ["Gateway > P&L", "Gateway > Display", "Gateway > Accounts Info", "Inventory Info"],
        correctAnswer: 0
      },
      {
        id: 4,
        question: "GST stands for?",
        options: ["Goods and Sales Tax", "General Service Tax", "Goods and Services Tax", "Global Sales Tax"],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "Which group does 'Cash' belong to by default?",
        options: ["Fixed Assets", "Current Assets", "Loans", "Capital Account"],
        correctAnswer: 1
      }
    ]
  },
  "autocad": {
    slug: "autocad",
    title: "AutoCAD (2D & 3D Design)",
    description: "Learn professional computer-aided design for architectural, engineering, and construction projects.",
    duration: "3 Months",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=2031&auto=format&fit=crop",
    highlights: [
      "Drafting 2D floor plans",
      "3D Modeling and Rendering",
      "Dimensioning and Labeling",
      "Layer management & Blocks",
      "Plotting and Publishing"
    ],
    outcomes: [
      "Create industry-standard blueprints",
      "Visualize projects in 3D",
      "Efficiently modify designs",
      "Master scaling and layouts",
      "Work in AEC industries"
    ],
    quiz: [
      {
        id: 1,
        question: "What is the extension of an AutoCAD drawing file?",
        options: [".dwg", ".dxf", ".pdf", ".bak"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which command is used to draw a circle?",
        options: ["CIR", "C", "CIRCLE", "DRAW C"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "What does the 'Explode' command do?",
        options: ["Deletes an object", "Breaks a compound object", "Zooms in", "Changes color"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Which key toggles 'Ortho Mode'?",
        options: ["F3", "F7", "F8", "F10"],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "What does 'UCS' stand for?",
        options: ["Universal Coordinate System", "User Coordinate System", "Unique Control System", "Unit Control Standard"],
        correctAnswer: 1
      }
    ]
  },
  "web-development": {
    slug: "web-development",
    title: "Full Stack Web Development",
    description: "Comprehensive training in building modern, responsive websites using HTML, CSS, JavaScript, and React.",
    duration: "4 Months",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    highlights: [
      "Modern HTML5 & Semantic Web",
      "Responsive CSS3 & Tailwind",
      "JavaScript (ES6+) Fundamentals",
      "React.js and State Management",
      "Deployment and Hosting"
    ],
    outcomes: [
      "Build mobile-responsive websites",
      "Create interactive web apps",
      "Understand API integration",
      "Master version control (Git)",
      "Portfolio ready for job market"
    ],
    quiz: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Tool Maker Line", "Home Text Main Layout"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which property is used to change text color in CSS?",
        options: ["font-color", "text-style", "color", "fill"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "What is 'React' primarily used for?",
        options: ["Database", "User Interfaces", "Server Side Logic", "Network Security"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Which tag is used for the largest heading in HTML?",
        options: ["<heading>", "<h6>", "<h10>", "<h1>"],
        correctAnswer: 3
      },
      {
        id: 5,
        question: "What keyword is used to declare a constant in JavaScript?",
        options: ["var", "let", "const", "fixed"],
        correctAnswer: 2
      }
    ]
  }
};
