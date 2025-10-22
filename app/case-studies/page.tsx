'use client'
import { useState } from "react";
import useSWR from "swr";
import classNames from "classnames";

interface CaseStudy {
  slug: string;
  name: string;
  problem: string;
  solution: string;
  outcome: string;
  tech_used: string;
  metrics: string | null;
  year: number;
  company: string | null;
  category: string;
  image: string;
}

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export default function CaseStudies() {
  const { data: caseStudies } = useSWR<CaseStudy[]>(`/api/case-studies`, fetcher);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Get unique categories
  const categories = ["All", ...(caseStudies
    ? Array.from(new Set(caseStudies.map(cs => cs.category)))
    : [])];

  // Filter case studies by category
  const filteredCaseStudies = caseStudies?.filter(
    cs => selectedCategory === "All" || cs.category === selectedCategory
  );

  const toggleCard = (slug: string) => {
    setExpandedCard(expandedCard === slug ? null : slug);
  };

  return (
    <div className="max-w-5xl mx-auto w-full py-8 sm:py-12 px-4">
      <div className="mb-8">
        <h1 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
          Case Studies
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
          Real-world technical challenges and the solutions that drove results
        </p>
      </div>

      {/* Category Filter */}
      {caseStudies && caseStudies.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={classNames(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                selectedCategory === category
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Case Studies Grid */}
      {!filteredCaseStudies ? (
        <p className="text-gray-600 dark:text-gray-400">Loading case studies...</p>
      ) : filteredCaseStudies.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No case studies found.</p>
      ) : (
        <div className="space-y-6">
          {filteredCaseStudies.map((caseStudy) => {
            const techStack = JSON.parse(caseStudy.tech_used);
            const isExpanded = expandedCard === caseStudy.slug;

            return (
              <article
                key={caseStudy.slug}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {caseStudy.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {caseStudy.year}
                      </span>
                      {caseStudy.company && (
                        <span className="text-sm text-gray-500 dark:text-gray-500">
                          • {caseStudy.company}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {caseStudy.name}
                    </h2>
                  </div>
                </div>

                {/* Metrics - Always visible */}
                {caseStudy.metrics && (
                  <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      {caseStudy.metrics}
                    </p>
                  </div>
                )}

                {/* Problem - Always visible */}
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                    The Challenge
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </div>

                {/* Expandable Content */}
                {isExpanded && (
                  <div className="space-y-4 mt-4">
                    {/* Solution */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                        The Solution
                      </h3>
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                        {caseStudy.solution}
                      </p>
                    </div>

                    {/* Outcome */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                        The Results
                      </h3>
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                        {caseStudy.outcome}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {techStack.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => toggleCard(caseStudy.slug)}
                  className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
                >
                  {isExpanded ? "Show less" : "Read full case study"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={classNames(
                      "w-4 h-4 transition-transform",
                      isExpanded ? "rotate-180" : ""
                    )}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
