import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import StepHeader from "@/components/molecules/StepHeader";
import ApperIcon from "@/components/ApperIcon";
import { guideService } from "@/services/api/guideService";

const StepCard = ({ step, onUpdateStep }) => {
  const { id, title, description, content, proTip, timeEstimate, isCompleted, isExpanded } = step;
  const [imageLoading, setImageLoading] = useState(true);
  const [zoomImage, setZoomImage] = useState(null);
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

                {/* Screenshot/Mockup Placeholder Areas */}
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <ApperIcon name="Image" size={18} className="text-primary" />
                    <h5 className="font-semibold text-gray-800">Visual Guide</h5>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Before Screenshot */}
                    <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 relative overflow-hidden group">
                      {imageLoading ? (
                        <div className="aspect-video flex items-center justify-center">
                          <div className="animate-pulse">
                            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                                <div className="h-3 bg-gray-300 rounded w-24 mx-auto mb-1"></div>
                                <div className="h-2 bg-gray-300 rounded w-16 mx-auto"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:from-primary/5 group-hover:to-secondary/5"
                          onClick={() => setZoomImage(`step-${id}-before`)}
                        >
                          <div className="text-center">
                            <ApperIcon name="Image" size={32} className="text-gray-400 group-hover:text-primary transition-colors mx-auto mb-2" />
                            <p className="text-sm text-gray-500 group-hover:text-gray-700">Before Screenshot</p>
                            <p className="text-xs text-gray-400 mt-1">Click to zoom</p>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-1">
                              <ApperIcon name="ZoomIn" size={16} className="text-gray-600" />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                        <span className="text-white text-xs font-medium">Step {id} - Initial State</span>
                      </div>
                    </div>

                    {/* After Screenshot */}
                    <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 relative overflow-hidden group">
                      {imageLoading ? (
                        <div className="aspect-video flex items-center justify-center">
                          <div className="animate-pulse">
                            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                                <div className="h-3 bg-gray-300 rounded w-24 mx-auto mb-1"></div>
                                <div className="h-2 bg-gray-300 rounded w-16 mx-auto"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="aspect-video bg-gradient-to-br from-success/10 to-success/20 flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:from-success/20 group-hover:to-success/30"
                          onClick={() => setZoomImage(`step-${id}-after`)}
                        >
                          <div className="text-center">
                            <ApperIcon name="CheckCircle2" size={32} className="text-success group-hover:scale-110 transition-transform mx-auto mb-2" />
                            <p className="text-sm text-gray-700 group-hover:text-gray-800">Expected Result</p>
                            <p className="text-xs text-gray-500 mt-1">Click to zoom</p>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-1">
                              <ApperIcon name="ZoomIn" size={16} className="text-gray-600" />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                        <span className="text-white text-xs font-medium">Step {id} - Completed</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Load Images Button */}
                  {imageLoading && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => {
                          setTimeout(() => setImageLoading(false), 1500);
                          toast.info("Loading visual guides...");
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                      >
                        <ApperIcon name="Download" size={16} />
                        Load Screenshots
                      </button>
                    </div>
                  )}
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

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setZoomImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <ApperIcon name="Image" size={18} className="text-primary" />
                  <h6 className="font-semibold text-gray-800">
                    {zoomImage?.includes('before') ? 'Before Screenshot' : 'Expected Result'}
                  </h6>
                </div>
                <button
                  onClick={() => setZoomImage(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" size={18} className="text-gray-500" />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-6">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <ApperIcon 
                      name={zoomImage?.includes('before') ? 'Image' : 'CheckCircle2'} 
                      size={48} 
                      className={zoomImage?.includes('before') ? 'text-gray-400' : 'text-success'} 
                    />
                    <p className="text-lg font-medium text-gray-700 mt-3">
                      {zoomImage?.includes('before') ? 'Initial State Preview' : 'Completion Preview'}
                    </p>
                    <p className="text-gray-500 mt-1">Step {id} Visual Guide</p>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    This placeholder will show the actual screenshot or mockup for this step
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StepCard;