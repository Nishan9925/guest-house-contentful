"use client";
import { useState } from "react";

function FAQ({ data }) {
  const [openItems, setOpenItems] = useState(new Set());

  // Helper function to render rich text content
  const renderRichText = (content) => {
    if (!content || !Array.isArray(content)) return null;

    return content.map((block, index) => {
      switch (block.nodeType) {
        case 'paragraph':
          return (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {block.content?.map((textBlock, textIndex) => (
                <span key={textIndex}>{textBlock.value}</span>
              ))}
            </p>
          );
        
        case 'unordered-list':
          return (
            <ul key={index} className="mb-4 list-disc list-inside text-gray-700 space-y-2">
              {block.content?.map((listItem, itemIndex) => {
                // Extract text value from list item content
                const textValue = listItem.content?.[0]?.content?.[0]?.value || '';
                return (
                  <li key={itemIndex} className="ml-4">
                    {textValue}
                  </li>
                );
              })}
            </ul>
          );
        
        case 'text':
          return (
            <span key={index} className={block.marks?.length > 0 ? 'font-semibold' : ''}>
              {block.value}
            </span>
          );
        
        default:
          return null;
      }
    });
  };

  // Toggle FAQ item open/close
  const toggleItem = (itemId) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section id="faq" className="bg-primary w-full py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-black mb-12">
            FAQs about Arevik B&B
        </h2>
        
        <div className="space-y-4">
          {data?.map((item, index) => {
            const itemId = item.sys.id || index;
            const isOpen = openItems.has(itemId);
            
            return (
              <div key={itemId} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* FAQ Header - Clickable */}
                <button
                  onClick={() => toggleItem(itemId)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                >
                  <h3 className="text-xl font-semibold text-black pr-4">
                    {item.fields.faqTitle}
                  </h3>
                  
                  {/* Expand/Collapse Icon */}
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-black transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                
                {/* FAQ Content - Animated */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-700">
                    {renderRichText(item.fields.faqDescription?.content)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
