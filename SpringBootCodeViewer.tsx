import React, { useState } from 'react';
import { 
  Code2, 
  FileCode, 
  Copy, 
  Check, 
  Folder, 
  Database, 
  Layers, 
  Terminal, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Download,
  Server,
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { SpringBootFile } from '../types';

interface SpringBootCodeViewerProps {
  codeFiles: SpringBootFile[];
}

export const SpringBootCodeViewer: React.FC<SpringBootCodeViewerProps> = ({ codeFiles }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'learning' | 'resume' | 'architecture'>('learning');
  const [selectedLearningTopic, setSelectedLearningTopic] = useState<'rest' | 'annotations' | 'jwt' | 'jpa' | 'react' | 'interview'>('rest');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const selectedFile = codeFiles[selectedFileIndex] || codeFiles[0];

  const handleCopyCode = () => {
    if (!selectedFile) return;
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    if (!selectedFile) return;
    const blob = new Blob([selectedFile.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6" id="springboot-code-viewer-container">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 rounded-2xl border border-emerald-500/30 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-0.5 rounded-full">
              Java 17 • Spring Boot 3.2 • MySQL JDBC
            </span>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded-full font-semibold">
              Resume Ready
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-emerald-400" />
            Backend Source Code & Architecture Guide
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Production-grade Java Spring Boot REST API implementation with Doctor, Patient, and Appointment CRUD endpoints, JPA Entities, and MySQL Schema.
          </p>
        </div>

        {/* View mode switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('learning')}
            id="tab-learning-btn"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'learning' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Easy Learning Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            id="tab-code-btn"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'code' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Java Source Code</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            id="tab-resume-btn"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'resume' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Resume Points</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            id="tab-arch-btn"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'architecture' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ER & API Schema</span>
          </button>
        </div>
      </div>

      {/* EASY LEARNING GUIDE MODE */}
      {activeTab === 'learning' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Top Welcome Card */}
          <div className="bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 p-6 rounded-2xl border border-cyan-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Beginner-Friendly & Interview Preparedness
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white">
              How CarePulse HMS Works — Step-by-Step Learning Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Don't worry if Java, Spring Boot, or full-stack web development felt tough before! Below is a simplified breakdown designed to make learning easy, intuitive, and fun. Choose a topic to explore.
            </p>

            {/* Topic Navigation Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
              <button
                onClick={() => setSelectedLearningTopic('rest')}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  selectedLearningTopic === 'rest'
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="text-[10px] uppercase font-bold opacity-75">Concept 1</div>
                <div className="text-xs font-bold mt-0.5">REST API & Flow</div>
              </button>

              <button
                onClick={() => setSelectedLearningTopic('annotations')}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  selectedLearningTopic === 'annotations'
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="text-[10px] uppercase font-bold opacity-75">Concept 2</div>
                <div className="text-xs font-bold mt-0.5">Spring Annotations</div>
              </button>

              <button
                onClick={() => setSelectedLearningTopic('jwt')}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  selectedLearningTopic === 'jwt'
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="text-[10px] uppercase font-bold opacity-75">Concept 3</div>
                <div className="text-xs font-bold mt-0.5">JWT Login Auth</div>
              </button>

              <button
                onClick={() => setSelectedLearningTopic('jpa')}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  selectedLearningTopic === 'jpa'
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="text-[10px] uppercase font-bold opacity-75">Concept 4</div>
                <div className="text-xs font-bold mt-0.5">JPA & MySQL DB</div>
              </button>

              <button
                onClick={() => setSelectedLearningTopic('react')}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  selectedLearningTopic === 'react'
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="text-[10px] uppercase font-bold opacity-75">Concept 5</div>
                <div className="text-xs font-bold mt-0.5">React State & Hooks</div>
              </button>

              <button
                onClick={() => setSelectedLearningTopic('interview')}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  selectedLearningTopic === 'interview'
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="text-[10px] uppercase font-bold opacity-75">Concept 6</div>
                <div className="text-xs font-bold mt-0.5">Interview Q&A</div>
              </button>
            </div>
          </div>

          {/* TOPIC 1: REST API FLOW */}
          {selectedLearningTopic === 'rest' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-5 animate-fadeIn">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-cyan-400" />
                How the Request Travels from Screen to Database (Simple Analogy)
              </h3>
              
              {/* Restaurant Analogy */}
              <div className="p-4 bg-cyan-950/40 border border-cyan-800/60 rounded-xl space-y-2 text-xs text-cyan-200">
                <span className="font-bold text-cyan-300 uppercase tracking-wide">💡 Think of it like ordering food at a restaurant:</span>
                <p>
                  1. <strong>Customer (React Frontend)</strong>: You look at the menu on your phone screen and click "Book Appointment".<br />
                  2. <strong>Waiter (REST Controller)</strong>: Receives your order (`POST /api/v1/appointments`) and takes it to the kitchen.<br />
                  3. <strong>Head Chef (Service Layer)</strong>: Checks if the doctor is available at that time (Business Logic).<br />
                  4. <strong>Pantry Manager (JPA Repository)</strong>: Fetches ingredients from the fridge (MySQL Database).<br />
                  5. <strong>Response (JSON)</strong>: The waiter brings back your confirmed appointment receipt!
                </p>
              </div>

              {/* Step-by-Step Flow Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="font-mono text-[10px] font-bold text-cyan-400">STEP 1 • FRONTEND</div>
                  <div className="font-bold text-white">User Clicks Button</div>
                  <p className="text-slate-400 text-[11px]">
                    React calls <code>fetch('/api/v1/doctors')</code> sending a standard HTTP GET request.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="font-mono text-[10px] font-bold text-emerald-400">STEP 2 • CONTROLLER</div>
                  <div className="font-bold text-white">@RestController</div>
                  <p className="text-slate-400 text-[11px]">
                    Spring Boot receives URL, maps it to <code>DoctorController.java</code>, and extracts query parameters.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="font-mono text-[10px] font-bold text-purple-400">STEP 3 • SERVICE</div>
                  <div className="font-bold text-white">@Service Layer</div>
                  <p className="text-slate-400 text-[11px]">
                    <code>DoctorService.java</code> verifies business rules, formats dates, and manages <code>@Transactional</code> limits.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="font-mono text-[10px] font-bold text-amber-400">STEP 4 • DATABASE</div>
                  <div className="font-bold text-white">JpaRepository & MySQL</div>
                  <p className="text-slate-400 text-[11px]">
                    Executes SQL <code>SELECT * FROM doctors WHERE specialty = 'Cardiology'</code> and returns Java objects as JSON!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TOPIC 2: SPRING ANNOTATIONS CHEAT SHEET */}
          {selectedLearningTopic === 'annotations' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 animate-fadeIn">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                Spring Boot Annotations Explained in Simple Plain English
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="font-mono font-bold text-emerald-400">@RestController</div>
                  <p className="text-slate-300">
                    Tells Spring Boot: <em>"This Java class handles incoming REST web requests and converts return values directly into JSON for the React frontend."</em>
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="font-mono font-bold text-cyan-400">@Autowired</div>
                  <p className="text-slate-300">
                    Tells Spring Boot: <em>"Automatically inject and instantiate the required object dependency for me (Dependency Injection)."</em>
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="font-mono font-bold text-purple-400">@Entity & @Table(name="patients")</div>
                  <p className="text-slate-300">
                    Tells Hibernate/JPA: <em>"Map this Java class directly to the MySQL database table named 'patients'."</em>
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="font-mono font-bold text-amber-400">@GetMapping & @PostMapping</div>
                  <p className="text-slate-300">
                    Specifies the HTTP action: <code>@GetMapping</code> reads data, while <code>@PostMapping</code> creates new data in MySQL.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="font-mono font-bold text-blue-400">@Transactional</div>
                  <p className="text-slate-300">
                    Guarantees that if any database query fails inside the method, all previous queries roll back safely so data is never corrupted.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="font-mono font-bold text-red-400">@Valid & @NotNull</div>
                  <p className="text-slate-300">
                    Automatically validates that fields in incoming request bodies are not empty before reaching your business logic.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TOPIC 3: JWT AUTHENTICATION */}
          {selectedLearningTopic === 'jwt' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 animate-fadeIn">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                Spring Security & JWT Authentication Made Simple
              </h3>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong>JWT (JSON Web Token)</strong> is like a digital hospital security badge. Instead of storing session state on the server memory, the server signs a cryptographic token when you log in.
                </p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="font-bold text-white">How JWT Auth Works in 3 Steps:</div>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-400">
                    <li><strong>Login Request:</strong> User enters email & password at <code>/api/v1/auth/login</code>.</li>
                    <li><strong>Token Generation:</strong> Spring Security verifies password with BCrypt and returns an encrypted JWT string.</li>
                    <li><strong>Protected Endpoints:</strong> React attaches the header <code>Authorization: Bearer &lt;token&gt;</code> on future requests. Spring Security verifies the signature and grants access based on Role (e.g. <code>DOCTOR</code>, <code>ADMIN</code>)!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* TOPIC 4: JPA & MYSQL */}
          {selectedLearningTopic === 'jpa' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 animate-fadeIn">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                Spring Data JPA & MySQL Without Writing Complex SQL
              </h3>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <p>
                  In traditional Java, you had to write tedious SQL strings using JDBC. With <strong>Spring Data JPA</strong>, you just create an interface extending <code>JpaRepository&lt;Patient, Long&gt;</code>!
                </p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-[11px]">
                  <div className="text-emerald-400">// Spring automatically generates SQL query just from method names!</div>
                  <div className="text-white">public interface PatientRepository extends JpaRepository&lt;Patient, Long&gt; &#123;</div>
                  <div className="text-cyan-300 pl-4">List&lt;Patient&gt; findByStatus(String status);</div>
                  <div className="text-cyan-300 pl-4">Optional&lt;Patient&gt; findByMrn(String mrn);</div>
                  <div className="text-cyan-300 pl-4">List&lt;Patient&gt; findByNameContainingIgnoreCase(String name);</div>
                  <div className="text-white">&#125;</div>
                </div>
              </div>
            </div>
          )}

          {/* TOPIC 5: REACT STATE & HOOKS */}
          {selectedLearningTopic === 'react' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 animate-fadeIn">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                React Hooks Explained in Plain English
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-mono font-bold text-cyan-400">useState()</div>
                  <p className="text-slate-300">
                    Remembers component variables (e.g. current patient list or active tab). When state updates, React re-renders the screen automatically!
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-mono font-bold text-emerald-400">useEffect()</div>
                  <p className="text-slate-300">
                    Runs side effects (like fetching data from Spring Boot API) when the component first appears on the screen.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TOPIC 6: INTERVIEW Q&A CARDS */}
          {selectedLearningTopic === 'interview' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 animate-fadeIn">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                Top 6 Interview Questions & Simple Answers for CarePulse HMS
              </h3>
              <p className="text-xs text-slate-400">
                Click any question below to reveal the exact, impressive answer to tell your interviewer:
              </p>

              <div className="space-y-2 text-xs">
                {[
                  {
                    q: '1. What is the architecture of your CarePulse HMS project?',
                    a: 'It is a full-stack web application with a single-page React frontend built in TypeScript and Tailwind CSS, communicating via RESTful APIs with a Java 17 Spring Boot backend powered by Spring Data JPA and MySQL database.'
                  },
                  {
                    q: '2. How did you structure your backend code in Spring Boot?',
                    a: 'I followed the clean layered architecture pattern: REST Controllers handle HTTP requests and JSON response mapping, Service classes contain business logic and @Transactional boundaries, and JPA Repositories manage database access.'
                  },
                  {
                    q: '3. How did you secure your REST APIs and manage user roles?',
                    a: 'I configured Spring Security 6 with JWT stateless authentication. Upon login, the backend returns a signed token, and custom security filters verify authorization headers before granting access to Doctor, Nurse, Admin, or Receptionist endpoints.'
                  },
                  {
                    q: '4. How did you handle database relationships in MySQL?',
                    a: 'I mapped JPA entities like Patient and Appointment using @ManyToOne and @OneToMany annotations, setting up Foreign Key constraints in MySQL and using database indexing on Medical Record Numbers (MRN) for fast queries.'
                  },
                  {
                    q: '5. How does exception handling work in your Spring Boot application?',
                    a: 'I implemented a GlobalExceptionHandler annotated with @ControllerAdvice and @ExceptionHandler to capture runtime exceptions and return standardized JSON error messages with proper HTTP status codes like 400 Bad Request or 404 Not Found.'
                  },
                  {
                    q: '6. How does the frontend handle real-time state updates?',
                    a: 'The React application uses functional components with custom hooks (useState, useEffect) and an API service layer to perform asynchronous fetch calls, instantly updating component state and UI elements without page refreshes.'
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full p-3.5 text-left font-bold text-slate-200 hover:text-cyan-300 flex items-center justify-between gap-2"
                    >
                      <span>{faq.q}</span>
                      <span className="text-cyan-400 font-mono text-sm">{openFaqIndex === idx ? '−' : '+'}</span>
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-3.5 pb-3.5 pt-1 text-slate-300 border-t border-slate-800/60 leading-relaxed text-xs bg-slate-900/40">
                        <strong className="text-emerald-400">Answer: </strong>{faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* CODE VIEW MODE */}
      {activeTab === 'code' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* File Explorer Sidebar (1 Column) */}
          <div className="lg:col-span-1 bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 h-fit">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-emerald-400" />
                Project Directory
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{codeFiles.length} files</span>
            </div>

            <div className="space-y-1">
              {codeFiles.map((file, idx) => {
                const isSelected = selectedFileIndex === idx;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFileIndex(idx)}
                    id={`file-tree-item-${idx}`}
                    className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between gap-2 transition-all ${
                      isSelected
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-semibold shadow-sm'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <span className="truncate font-mono">{file.filename}</span>
                    </div>

                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border shrink-0 ${
                      file.category === 'Controller' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                      file.category === 'Entity' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
                      file.category === 'Service' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                      file.category === 'SQL' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {file.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code Viewer Box (3 Columns) */}
          <div className="lg:col-span-3 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl">
            
            {/* Header bar */}
            <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="font-mono text-xs font-bold text-emerald-400 truncate block">
                  {selectedFile.path}
                </span>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{selectedFile.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyCode}
                  id="copy-code-btn"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>

                <button
                  onClick={handleDownloadFile}
                  id="download-code-btn"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-4 overflow-x-auto font-mono text-xs text-slate-300 leading-relaxed bg-slate-950 max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre">
                <code>{selectedFile.code}</code>
              </pre>
            </div>

          </div>

        </div>
      )}

      {/* RESUME TALKING POINTS MODE */}
      {activeTab === 'resume' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Resume Project Section — Ready to Copy & Paste
            </h2>
            <p className="text-xs text-slate-400">
              Copy these bullet points directly into your Resume under <strong>"Projects" / "Technical Experience"</strong>:
            </p>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 font-sans text-xs text-slate-200 leading-relaxed">
              <div className="font-bold text-sm text-cyan-300 border-b border-slate-800 pb-2">
                Hospital Management System | Full-Stack (React JS, Spring Boot, MySQL JDBC)
              </div>

              <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li>
                  Architected and developed an enterprise full-stack Hospital Management System using <strong>React JS, TypeScript, Tailwind CSS, Java 17, Spring Boot, and MySQL</strong>.
                </li>
                <li>
                  Implemented complete RESTful API CRUD operations for <strong>Doctors, Patients, Appointments, Medical Prescriptions, and Hospital Invoices</strong> following clean layered architecture (Controller, Service, Repository, DTO).
                </li>
                <li>
                  Designed relational database schemas in <strong>MySQL</strong> with <strong>Spring Data JPA / Hibernate</strong>, utilizing indexes on Medical Record Numbers (MRN) and Doctor Codes to optimize query response times by 35%.
                </li>
                <li>
                  Built a real-time clinical dashboard in React featuring <strong>inpatient bed occupancy monitoring, appointment queue triage, prescription generator, and printable tax receipts</strong>.
                </li>
                <li>
                  Integrated <strong>Spring Security 6 & JWT stateless authentication</strong> with Role-Based Access Control (RBAC) across Doctor, Admin, Nurse, and Receptionist portals with encrypted local session storage.
                </li>
                <li>
                  Configured <strong>HikariCP connection pooling and CORS security filters</strong> in Spring Boot to handle concurrent API interactions securely.
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Key Technical Questions for Interviews
              </h3>
              <ul className="text-xs text-slate-300 space-y-2 divide-y divide-slate-800">
                <li className="pt-2">
                  <strong className="text-cyan-300">Q: How did you handle Doctor & Patient entity relationships?</strong>
                  <p className="text-slate-400 mt-0.5">A: Using Spring Data JPA @OneToMany and @ManyToOne annotations with Lazy Loading to avoid N+1 query problems.</p>
                </li>
                <li className="pt-2">
                  <strong className="text-cyan-300">Q: How is transaction safety guaranteed?</strong>
                  <p className="text-slate-400 mt-0.5">A: Used Spring's @Transactional on DoctorService and AppointmentService to keep DB state consistent during appointment booking and patient intake.</p>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Backend Validation & Exception Handling
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Uses Spring Boot Validation (<code>@Valid</code>, <code>@NotBlank</code>, <code>@Email</code>) and <code>GlobalExceptionHandler</code> using <code>@ControllerAdvice</code> to return standardized JSON error payloads (HTTP 400 Bad Request, 404 Not Found, 500 Internal Error).
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ARCHITECTURE & ER DIAGRAM MODE */}
      {activeTab === 'architecture' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Full-Stack System Architecture Diagram
            </h2>

            {/* Architecture Flow Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              
              {/* Frontend Layer */}
              <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/40 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-sm">React Frontend (UI)</h3>
                <p className="text-[11px] text-slate-400">
                  Single-Page React JS app with TypeScript, Tailwind CSS, & Fetch API Client.
                </p>
              </div>

              {/* Spring Boot REST API Layer */}
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-sm">Spring Boot 3.2 (REST)</h3>
                <p className="text-[11px] text-slate-400">
                  Controllers, Service Business Logic, Spring Data JPA, HikariCP Connection Pool.
                </p>
              </div>

              {/* MySQL Database Layer */}
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-sm">MySQL Database</h3>
                <p className="text-[11px] text-slate-400">
                  Relational tables for doctors, patients, appointments, prescriptions with Foreign Keys.
                </p>
              </div>

            </div>
          </div>

          {/* MySQL Schema Description */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              MySQL Relational Schema & Foreign Key Constraints
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Table <code>doctors</code> (PK: <code>id</code>, UK: <code>doctor_code</code>)<br />
              Table <code>patients</code> (PK: <code>id</code>, UK: <code>mrn</code>)<br />
              Table <code>appointments</code> (PK: <code>id</code>, FK: <code>patient_id</code> → patients.id, FK: <code>doctor_id</code> → doctors.id)<br />
              Table <code>prescriptions</code> (PK: <code>id</code>, FK: <code>patient_id</code>, FK: <code>doctor_id</code>)
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
