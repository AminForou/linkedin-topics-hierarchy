// src/App.js

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Info, Book } from 'lucide-react';
import './App.css'; // You can use this for additional styling if needed

const ArticleList = ({ articles }) => (
  <div className="ml-8 mt-2 p-2 bg-gray-100 rounded text-sm">
    <strong className="block mb-2">Related Articles:</strong>
    <ul className="list-disc list-inside">
      {articles.map((article, index) => (
        <li key={index} className="mb-1">{article}</li>
      ))}
    </ul>
  </div>
);

const TopicNode = ({ name, volume, impression, keywords, average_position, number_of_articles, children, nonSeedKeywords, articles, blurb, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(level < 1);
  const [showKeywords, setShowKeywords] = useState(false);
  const [showArticles, setShowArticles] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const toggleKeywords = (e) => {
    e.stopPropagation();
    setShowKeywords(!showKeywords);
  };
  const toggleArticles = (e) => {
    e.stopPropagation();
    setShowArticles(!showArticles);
  };

  const totalVolume = children && volume !== undefined ? children.reduce((sum, child) => sum + (child.volume || 0), 0) : volume;
  const totalKeywords = children && keywords !== undefined ? children.reduce((sum, child) => sum + (child.keywords || 0), 0) : keywords;

  const sortedChildren = children ? [...children].sort((a, b) => a.name.localeCompare(b.name)) : null;

  return (
    <div className={`mb-2 ${level === 0 ? 'bg-blue-50 p-4 rounded-lg' : ''}`}>
      <div
        className={`flex items-center cursor-pointer ${level === 1 ? 'bg-blue-100 p-2 rounded' : ''}`}
        onClick={toggleExpand}
        style={{ paddingLeft: `${level * 20}px` }}
      >
        {children && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        <span className={`font-bold mr-2 ${level === 0 ? 'text-xl' : ''} ${level === 1 ? 'text-lg' : ''}`}>{name}</span>
        {name === "Career" && (
          <span className="text-sm text-gray-600">
            &nbsp;(avg monthly impression: {impression.toLocaleString()}, Keywords: {keywords.toLocaleString()}, Avg. Position: {average_position}, Articles: {number_of_articles.toLocaleString()})
          </span>
        )}
        {name !== "Career" && totalVolume !== undefined && (
          <span className="text-sm text-gray-600">
            &nbsp;(Volume: {totalVolume.toLocaleString()}, Keywords: {totalKeywords.toLocaleString()})
          </span>
        )}
        {impression !== undefined && name !== "Career" && (
          <span className="text-sm text-gray-600">
            &nbsp;(avg monthly impression: {impression.toLocaleString()})
          </span>
        )}
        {nonSeedKeywords && (
          <button
            className="ml-2 text-blue-500 hover:text-blue-700"
            onClick={toggleKeywords}
          >
            <Info size={16} />
          </button>
        )}
        {articles && (
          <button
            className="ml-2 text-green-500 hover:text-green-700"
            onClick={toggleArticles}
          >
            <Book size={16} />
          </button>
        )}
      </div>
      {showKeywords && nonSeedKeywords && (
        <div className="ml-8 mt-2 p-2 bg-gray-100 rounded text-sm">
          <strong>Non-seed keywords:</strong> {nonSeedKeywords.join(', ')}
        </div>
      )}
      {showArticles && blurb && (
        <div className="ml-8 mt-2 p-2 bg-gray-100 rounded text-sm">
          {blurb}
        </div>
      )}
      {showArticles && articles && <ArticleList articles={articles} />}
      {isExpanded && sortedChildren && (
        <div className="ml-4 mt-2">
          {sortedChildren.map((child, index) => (
            <TopicNode key={index} {...child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};


const LinkedInPulseTopicsHierarchy = () => {
  const data = {
    name: "LinkedIn Pulse Core Topics",
    children: [
      {
        name: "Career",
        impression: 1763410,
        keywords: 40954,
        average_position: 11.25,
        number_of_articles: 21368,
        children: [
          {
            name: "Career Objectives",
            blurb: "Articles that provide guidance on setting career objectives, including examples and tips on how to craft effective career goals for resumes and CVs.",
            articles: [
              "How to write a career objective for your resume",
              "Examples of effective career objectives",
              "Tips for aligning career objectives with job applications",
              "Differences between career objectives and career summaries"
            ]
          },
          {
            name: "Career Exploration",
            blurb: "Articles that help individuals explore different career paths, understand various industries, and identify potential career opportunities.",
            articles: [
              "Guides on exploring new career paths",
              "Industry overviews and career prospects",
              "Tools and resources for career exploration",
              "Personal stories of career exploration and discovery"
            ]
          },
          {
            name: "Career Development",
            blurb: "Articles that focus on professional growth, skill development, and strategies for advancing one's career.",
            articles: [
              "Strategies for career advancement",
              "Importance of continuous career learning and development",
              "Developing soft and hard skills for career growth",
              "Creating a professional career development plan"
            ]
          },
          {
            name: "Career Transition",
            blurb: "Articles that offer advice on changing careers, including how to make a smooth transition and navigate challenges during career shifts.",
            articles: [
              "Steps to successfully change careers",
              "Overcoming challenges in career transitions",
              "Stories of successful career changes",
              "Tips for leveraging transferable skills"
            ]
          },
          {
            name: "Career Opportunities",
            blurb: "Articles that highlight job openings, industry trends, and opportunities for career advancement within various fields.",
            articles: [
              "Lists of top job opportunities in different industries",
              "Emerging career opportunities and trends",
              "How to find and apply for job openings",
              "Networking tips to discover career opportunities"
            ]
          },
          {
            name: "Career Coaching",
            blurb: "Articles that discuss the benefits of career coaching, how to choose a coach, and insights from professional career coaches.",
            articles: [
              "Benefits of working with a career coach",
              "How to select the right career coach",
              "Success stories from career coaching clients",
              "Common career coaching techniques and strategies"
            ]
          },
          {
            name: "Career Advice",
            blurb: "Articles offering general career advice, tips for job seekers, and guidance on various aspects of professional life.",
            articles: [
              "Job search tips and strategies",
              "Career advice for recent graduates",
              "Dealing with workplace challenges",
              "Balancing career and personal life"
            ]
          },
          {
            name: "Career Planning",
            blurb: "Articles that help individuals create and implement effective career plans, set long-term goals, and develop strategies for achieving them.",
            articles: [
              "Creating a comprehensive career plan",
              "Setting short-term and long-term career goals",
              "Tools and resources for career planning",
              "Revising and adapting career plans over time"
            ]
          },
          {
            name: "Career Change",
            blurb: "Articles that provide insights and advice specifically for those looking to make a significant change in their career path.",
            articles: [
              "Planning a successful career change",
              "Identifying reasons for a career change",
              "Overcoming fear and uncertainty in career changes",
              "Real-life examples of successful career changes"
            ]
          },
          {
            name: "Career Training",
            blurb: "Articles that focus on training programs, courses, and certifications that can help individuals enhance their skills and advance their careers.",
            articles: [
              "Top training programs for career advancement",
              "Benefits of professional certifications",
              "Online courses for skill development",
              "In-demand skills and how to acquire them"
            ]
          },
          {
            name: "Career Success",
            blurb: "Articles that highlight strategies for achieving career success, including personal development, goal setting, and success stories.",
            articles: [
              "Habits of successful professionals",
              "Setting and achieving career milestones",
              "Inspirational career success stories",
              "Building a successful career from the ground up"
            ]
          },
          {
            name: "Career Networking",
            blurb: "Articles that emphasize the importance of networking in career development and offer tips on building and maintaining professional connections.",
            articles: [
              "Effective networking strategies",
              "Building a professional network",
              "Leveraging social media for career networking",
              "Networking events and opportunities"
            ]
          },
          {
            name: "Career Counseling",
            blurb: "Articles that provide information about career counseling services, their benefits, and how to find and work with a career counselor.",
            articles: [
              "What to expect from career counseling",
              "Finding the right career counselor",
              "Benefits of career counseling for career development",
              "Common issues addressed in career counseling"
            ]
          }
        ]
      },
      {
        name: "Industry Insights",
        volume: 2975180,
        keywords: 102496,
        children: [
          { name: "Market Trends and Analysis", volume: 2074420, keywords: 72363, nonSeedKeywords: ["trend", "analysis", "research", "segmentation", "opportunity", "size", "share", "demand", "growth", "competitive"] },
          { name: "Economic Outlook", volume: 477240, keywords: 14619, nonSeedKeywords: ["outlook", "forecast", "growth", "recession", "inflation", "unemployment", "interest rate", "GDP", "policy", "indicator"] },
          { name: "Technology Trends", volume: 233290, keywords: 7757, nonSeedKeywords: ["trend", "AI", "machine learning", "blockchain", "IoT", "cloud", "cybersecurity", "5G", "AR", "VR"] },
          { name: "Regulatory Environment", volume: 100480, keywords: 3832, nonSeedKeywords: ["compliance", "policy", "law", "standard", "guideline", "impact", "change", "enforcement", "risk", "requirement"] },
          { name: "Innovation Landscape", volume: 89750, keywords: 3925, nonSeedKeywords: ["disruptive", "breakthrough", "R&D", "startup", "incubator", "accelerator", "patenting", "product", "process", "business model"] }
        ]
      },
      {
        name: "Business Strategy",
        volume: 1584590,
        keywords: 53273,
        children: [
          { name: "Strategic Decision Making", volume: 645020, keywords: 21577, nonSeedKeywords: ["making", "analysis", "data-driven", "strategic", "risk", "management", "framework", "process", "outcome", "impact"] },
          { name: "Strategic Planning", volume: 451020, keywords: 14904, nonSeedKeywords: ["strategic", "long-term", "short-term", "goal", "objective", "KPI", "OKR", "roadmap", "execution", "alignment"] },
          { name: "Competitive Analysis", volume: 209060, keywords: 6145, nonSeedKeywords: ["analysis", "advantage", "benchmark", "differentiation", "positioning", "intelligence", "strategy", "SWOT", "Porter's Five Forces", "market leader"] },
          { name: "Business Strategy Formulation", volume: 185850, keywords: 7082 },
          { name: "Growth Strategies", volume: 93640, keywords: 3565, nonSeedKeywords: ["strategy", "scaling", "expansion", "acquisition", "organic", "inorganic", "revenue", "market share", "sustainable", "diversification"] }
        ]
      },
      {
        name: "Leadership & Management",
        volume: 3626420,
        keywords: 104589,
        children: [
          {
            name: "Team Management",
            volume: 1364300,
            keywords: 39269,
            nonSeedKeywords: ["building", "management", "dynamics", "motivation", "performance", "remote", "collaboration", "diversity", "conflict", "culture"],
            articles: [
              "Managing remote teams effectively",
              "Building a positive company culture",
              "Addressing workplace conflicts"
            ]
          },
          {
            name: "Effective Communication",
            volume: 885160,
            keywords: 26209,
            nonSeedKeywords: ["effective", "strategy", "skill", "interpersonal", "presentation", "feedback", "listening", "nonverbal", "persuasion", "transparency", "management", "culture"],
            articles: [
              "Emotional intelligence in leadership examples",
              "The role of emotional intelligence in leadership",
              "Importance of emotional intelligence in leadership"
            ]
          },
          {
            name: "Leadership Skills",
            volume: 872920,
            keywords: 21850,
            nonSeedKeywords: ["style", "skill", "development", "executive", "transformational", "situational", "visionary", "adaptive", "ethical", "crisis"],
            articles: [
              "Leadership skills development",
              "Effective management techniques",
              "Inspiring leadership stories",
              "Balancing leadership with personal growth",
              "Consultative style of leadership",
              "Types of leadership styles",
              "Examples of leadership styles",
              "Different leadership styles",
              "Leadership styles and their impact on organizational culture",
              "15 commitments of conscious leadership",
              "Adaptive leadership strategies",
              "Conscious leadership",
              "Agile leadership",
              "Best leadership coaching certification programs",
              "Leadership coaching certification",
              "Executive leadership training topics"
            ]
          },
          {
            name: "Change Management",
            volume: 504040,
            keywords: 17261,
            nonSeedKeywords: ["management", "organizational", "strategy", "resistance", "adaptation", "transformation", "agile", "implementation", "stakeholder", "communication"],
            articles: [
              "Leadership and change management",
              "Role of leadership in crisis management"
            ]
          }
        ]
      },
      {
        name: "Entrepreneurship",
        volume: 545300,
        keywords: 21002,
        children: [
          {
            name: "Innovation Management",
            volume: 256040,
            keywords: 11090,
            nonSeedKeywords: ["disruptive", "process", "management", "culture", "product", "service", "technology", "design thinking", "R&D", "breakthrough"],
            articles: [
              "Thought leadership content on LinkedIn",
              "What does thought leadership mean?",
              "How to create a thought leadership strategy"
            ]
          },
          {
            name: "Startup Development",
            volume: 103370,
            keywords: 3957,
            nonSeedKeywords: ["founding", "idea", "validation", "launch", "scaling", "funding", "incubator", "accelerator", "pivot", "exit"],
            articles: [
              "Steps to launching a startup",
              "Success stories of entrepreneurs",
              "Overcoming challenges in entrepreneurship"
            ]
          },
          {
            name: "Business Model Innovation",
            volume: 90030,
            keywords: 2615,
            nonSeedKeywords: ["canvas", "innovation", "lean", "scalable", "recurring revenue", "freemium", "subscription", "marketplace", "platform", "direct-to-consumer"],
            articles: []
          },
          {
            name: "Growth Hacking",
            volume: 66660,
            keywords: 2536,
            nonSeedKeywords: ["hacking", "strategy", "metrics", "user acquisition", "retention", "monetization", "market penetration", "scaling", "KPI", "optimization"],
            articles: []
          },
          {
            name: "Startup Funding",
            volume: 29200,
            keywords: 804,
            nonSeedKeywords: ["venture capital", "angel investor", "seed", "series A", "crowdfunding", "bootstrapping", "pitch", "valuation", "term sheet", "ROI"],
            articles: [
              "Funding and investment strategies"
            ]
          }
        ]
      },
      {
        name: "Workplace Trends",
        volume: 1407010,
        keywords: 36326,
        children: [
          { name: "Remote Work", volume: 835670, keywords: 18517, nonSeedKeywords: ["work", "policy", "tools", "productivity", "collaboration", "management", "security", "culture", "communication", "flexibility"] },
          { name: "Workplace Diversity", volume: 307430, keywords: 10324, nonSeedKeywords: ["inclusion", "equity", "belonging", "representation", "bias", "cultural", "generational", "gender", "accessibility", "neurodiversity"] },
          { name: "Work-life Balance", volume: 134110, keywords: 3615, nonSeedKeywords: ["balance", "integration", "flexibility", "burnout", "wellness", "stress", "boundaries", "time management", "mindfulness", "satisfaction"] },
          { name: "Employee Wellness", volume: 129800, keywords: 3870, nonSeedKeywords: ["employee", "program", "mental health", "physical health", "stress management", "benefits", "productivity", "resilience", "work-life", "engagement"] }
        ]
      },
      {
        name: "Sales & Marketing",
        volume: 1407080,
        keywords: 7320,
        children: [
          { name: "Digital Marketing", volume: 689970, keywords: 3581, nonSeedKeywords: ["marketing", "strategy", "channels", "analytics", "content", "SEO", "social media", "email", "mobile", "automation"] },
          { name: "Customer Relationship Management", volume: 579210, keywords: 2797, nonSeedKeywords: ["relationship", "management", "experience", "journey", "loyalty", "retention", "acquisition", "lifetime value", "feedback", "segmentation"] },
          { name: "Sales Strategies", volume: 137900, keywords: 942, nonSeedKeywords: ["strategy", "pipeline", "forecasting", "technique", "negotiation", "closing", "prospecting", "CRM", "quota", "territory"] }
        ]
      },
      {
        name: "Recruitment & HR",
        volume: 605250,
        keywords: 4331,
        children: [
          { name: "Employee Engagement", volume: 334520, keywords: 2366, nonSeedKeywords: ["engagement", "experience", "satisfaction", "feedback", "retention", "development", "recognition", "performance", "wellness", "lifecycle"] ,

            articles: [
              "Building a positive company culture",
              "Employee engagement strategies",
            ]
          },
          { name: "Talent Acquisition", volume: 145540, keywords: 1001, nonSeedKeywords: ["acquisition", "strategy", "pipeline", "sourcing", "assessment", "retention", "development", "management", "analytics", "branding"] },
          { name: "Employee Retention", volume: 76230, keywords: 515, nonSeedKeywords: ["employee", "strategy", "engagement", "satisfaction", "turnover", "loyalty", "career development", "recognition", "compensation", "work environment"] },
          { name: "Recruitment Process", volume: 48960, keywords: 449, nonSeedKeywords: ["process", "strategy", "tools", "AI", "social", "diversity", "passive candidates", "employer branding", "metrics", "onboarding"] }
        ]
      }
    ]
  };

  // Sort the children of the "Career" node alphabetically by name
  const sortChildrenAlphabetically = (node) => {
    if (node.children) {
      node.children.sort((a, b) => a.name.localeCompare(b.name));
      node.children.forEach(sortChildrenAlphabetically);
    }
  };

  data.children.forEach(sortChildrenAlphabetically);

  return (
    <div className="p-4 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">LinkedIn Pulse Topics Hierarchy</h1>
      <TopicNode {...data} />
    </div>
  );
};

export default LinkedInPulseTopicsHierarchy;
