import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import StepHeader from "@/components/molecules/StepHeader";
import ApperIcon from "@/components/ApperIcon";
import { guideService } from "@/services/api/guideService";

const StepCard = ({ step, onUpdateStep }) => {
  const { id, title, description, content, proTip, timeEstimate, isCompleted, isExpanded } = step;

  const handleToggleComplete = async (completed) => {
    try {
      const updatedStep = await guideService.updateStepCompletion(id, completed);
      onUpdateStep(updatedStep);
      
      if (completed) {
        toast.success(`Step ${id} completed! 🎉`);
      } else {
        toast.info(`Step ${id} marked as incomplete`);
      }
    } catch (err) {
      console.error("Error updating step completion:", err);
      toast.error("Failed to update step completion");
    }
  };

  const handleToggleExpand = async (expanded) => {
    try {
      const updatedStep = await guideService.updateStepExpansion(id, expanded);
      onUpdateStep(updatedStep);
    } catch (err) {
      console.error("Error updating step expansion:", err);
      toast.error("Failed to update step");
    }
  };

  const renderContent = (text) => {
    // Split by double newlines to create paragraphs
    const paragraphs = text.split("\n").filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
        // Bold heading
        return (
          <h4 key={index} className="font-bold text-gray-900 mb-3 text-lg">
            {paragraph.replace(/\*\*/g, "")}
          </h4>
        );
      } else if (paragraph.includes("•")) {
        // Bullet points
        const parts = paragraph.split("•").filter(p => p.trim());
        const title = parts[0]?.replace(/\*\*/g, "").trim();
        const bullets = parts.slice(1);
        
        return (
          <div key={index} className="mb-4">
            {title && (
              <h5 className="font-semibold text-gray-800 mb-2">{title}</h5>
            )}
            <ul className="space-y-2 ml-4">
              {bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex} className="flex items-start gap-2">
                  <ApperIcon name="CheckCircle2" size={16} className="text-success mt-0.5 shrink-0" />
                  <span className="text-gray-700">{bullet.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      } else {
        // Regular paragraph
        return (
          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
            {paragraph.replace(/\*\*/g, "")}
          </p>
        );
      }
    });
  };

  return (
    <div 
      id={`step-${id}`} 
      className={`bg-white rounded-2xl border-2 transition-all duration-300 hover-lift ${
        isCompleted 
          ? "border-success shadow-lg shadow-success/10" 
          : "border-gray-200 hover:border-primary/30"
      }`}
    >
      {/* Header */}
<StepHeader
        stepNumber={id}
        title={title}
        description={description}
        isCompleted={isCompleted}
        isExpanded={isExpanded}
        timeEstimate={timeEstimate}
        onToggleComplete={handleToggleComplete}
        onToggleExpand={handleToggleExpand}
      />

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="border-t border-gray-200 pt-6">
                {/* Content Items */}
                <div className="space-y-6">
                  {content.map((item, index) => (
                    <div key={index} className="pl-4 border-l-4 border-primary/20">
                      {renderContent(item)}
                    </div>
                  ))}
                </div>

                {/* Pro Tip */}
                {proTip && (
                  <div className="mt-8 p-4 bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <ApperIcon name="Lightbulb" size={20} className="text-warning mt-0.5 shrink-0" />
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">💡 Pro Tip</h5>
                        <p className="text-gray-700 text-sm leading-relaxed">{proTip}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StepCard;