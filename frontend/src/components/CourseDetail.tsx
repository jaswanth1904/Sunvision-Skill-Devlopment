"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, ArrowRight, Star, ShieldCheck, Zap, MessageCircle, Mail, HelpCircle, XCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface CourseDetailProps {
  title: string;
  description: string;
  image: string;
  modules: string[];
  expectations: string[];
  schemeBenefits: string[];
  outcomes: string[];
  detailedContent: string;
  quiz: Question[];
}

function CourseQuiz({ questions }: { questions: Question[] }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [isComplete, setIsComplete] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-gray-100 text-center text-gray-500">
        <HelpCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="font-medium">No quiz questions available for this course.</p>
      </div>
    );
  }

  const handleOptionClick = (oIndex: number) => {
    if (showResults[currentQuestion]) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: oIndex }));
    setShowResults(prev => ({ ...prev, [currentQuestion]: true }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, aIdx]) => {
    return acc + (questions[parseInt(qIdx)].correctAnswer === aIdx ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-8 mt-12 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <HelpCircle className="w-8 h-8 text-blue-600 mr-3" />
          <h3 className="text-3xl font-bold text-gray-900">Knowledge Check</h3>
        </div>
        {!isComplete && (
          <div className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl"
          >
            <p className="text-2xl font-bold text-gray-800 mb-8 leading-tight">
              {questions[currentQuestion].question}
            </p>
            <div className="grid grid-cols-1 gap-4">
              {questions[currentQuestion].options.map((option, oIndex) => {
                const isSelected = selectedAnswers[currentQuestion] === oIndex;
                const isCorrect = questions[currentQuestion].correctAnswer === oIndex;
                const isRevealed = showResults[currentQuestion];

                let bgColor = "bg-slate-50";
                let borderColor = "border-gray-100";
                let textColor = "text-gray-700";

                if (isRevealed) {
                  if (isCorrect) {
                    bgColor = "bg-green-50";
                    borderColor = "border-green-500";
                    textColor = "text-green-700";
                  } else if (isSelected) {
                    bgColor = "bg-red-50";
                    borderColor = "border-red-500";
                    textColor = "text-red-700";
                  }
                } else if (isSelected) {
                  borderColor = "border-blue-500";
                }

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleOptionClick(oIndex)}
                    disabled={isRevealed}
                    className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between group ${bgColor} ${borderColor} ${textColor} ${!isRevealed ? 'hover:border-blue-400 hover:bg-white active:scale-[0.98]' : ''}`}
                  >
                    <span className="font-bold text-lg">{option}</span>
                    {isRevealed && isCorrect && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      </motion.div>
                    )}
                    {isRevealed && isSelected && !isCorrect && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <XCircle className="w-6 h-6 text-red-500" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>

            {showResults[currentQuestion] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-6"
              >
                <p className={`text-lg font-bold ${selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer ? 'text-green-600' : 'text-slate-600'}`}>
                  {selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer ? "✨ Correct! Great job." : `Better luck next time. The answer is: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`}
                </p>
                <button
                  onClick={handleNext}
                  className="flex items-center px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 active:scale-95"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 text-white p-12 rounded-[40px] text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-4xl font-extrabold mb-4">Quiz Complete!</h3>
            <p className="text-blue-200 text-xl mb-8">You scored {score} out of {questions.length} correct.</p>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswers({});
                setShowResults({});
                setIsComplete(false);
              }}
              className="px-10 py-4 bg-white text-slate-900 font-extrabold rounded-2xl hover:bg-blue-50 transition-colors"
            >
              Retake Quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CourseDetail({
  title,
  description,
  image,
  modules,
  expectations,
  schemeBenefits,
  outcomes,
  detailedContent,
  quiz
}: CourseDetailProps) {
  const [openModule, setOpenModule] = useState<number | null>(null);



  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 transform translate-x-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <nav className="flex mb-4 text-sm font-medium text-gray-500">
                <Link href="/" className="hover:text-[var(--color-brand-blue)]">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/#courses" className="hover:text-[var(--color-brand-blue)]">Courses</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{title}</span>
              </nav>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                {title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {description}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                  <Star className="w-5 h-5 text-yellow-500 mr-2 fill-yellow-500" />
                  <span className="font-bold text-gray-900">4.9/5 Rating</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                  <ShieldCheck className="w-5 h-5 text-green-500 mr-2" />
                  <span className="font-bold text-gray-900">Govt. Certified</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img src={image} alt={title} className="w-full h-[400px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 max-w-[200px]">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Duration</p>
                <p className="text-lg font-extrabold text-gray-900">3-6 Months Full Course</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">

              {/* Detailed Content */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Course In-Depth</h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p className="whitespace-pre-line leading-relaxed">{detailedContent}</p>
                </div>
              </div>

              {/* Expectations */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Zap className="w-8 h-8 text-orange-500 mr-3" />
                  What you expect from us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {expectations.map((item, i) => (
                    <div key={i} className="flex items-start p-4 bg-slate-50 rounded-2xl border border-gray-100">
                      <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                        <Check className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-gray-700 font-medium">{item}</p>
                    </div>
                  ))}
                </div>

                {/* INTERACTIVE QUIZ SECTION */}
                <CourseQuiz questions={quiz} />
              </div>

              {/* Course Outcomes */}
              <div className="bg-slate-900 rounded-[40px] p-10 text-white">
                <h2 className="text-3xl font-bold mb-8">Course Outcomes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-200">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modules */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Course Curriculum</h2>
                <div className="space-y-4">
                  {modules.map((module, i) => (
                    <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-blue-500 transition-all">
                      <button
                        onClick={() => setOpenModule(openModule === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 transition-colors ${openModule === i ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                            {i + 1}
                          </span>
                          <span className="text-lg font-bold text-gray-800">{module}</span>
                        </div>
                        <ArrowRight className={`w-5 h-5 text-gray-300 transition-transform ${openModule === i ? 'rotate-90 text-blue-500' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openModule === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-slate-50 border-t border-gray-100"
                          >
                            <div className="p-6 text-gray-600 text-sm">
                              <p className="font-medium text-slate-700 mb-2">Topics covered in this module:</p>
                              <p className="text-slate-500 mb-4">Detailed syllabus for "{module}" is available at our center.</p>
                              <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                                <span className="text-xs font-bold text-blue-600 uppercase">Want to know more?</span>
                                <Link href="/#contact" className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center">
                                  Contact Us <ArrowRight className="ml-1 w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scheme Section */}
              <div className="bg-linear-to-br from-[var(--color-brand-blue)] to-blue-800 rounded-[40px] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <h2 className="text-3xl font-bold mb-8 relative z-10">Skill Development Scheme Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  {schemeBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-6 h-6 text-yellow-400" />
                      </div>
                      <span className="font-bold text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Card */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg sticky top-24 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Contact</h3>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/919703054999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group"
                    >
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-xs font-bold text-green-600 uppercase">WhatsApp</p>
                        <p className="text-sm font-bold text-gray-900">+91 9703054999</p>
                      </div>
                    </a>

                    <a
                      href="mailto:sunvisionsociety@gmail.com"
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                    >
                      <Mail className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-xs font-bold text-blue-600 uppercase">Email</p>
                        <p className="text-sm font-bold text-gray-900">sunvisionsociety@gmail.com</p>
                      </div>
                    </a>
                  </div>
                </div>



                <div className="mt-6">
                  <Link
                    href="/#contact"
                    className="flex items-center justify-center w-full py-3.5 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
                  >
                    Enroll Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
