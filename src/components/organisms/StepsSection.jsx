import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StepCard from "@/components/organisms/StepCard";
import { guideService } from "@/services/api/guideService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const StepsSection = ({ 
  steps = [], 
  loading = true, 
  onUpdateStep, 
  onRetry 
}) => {
  const [error, setError] = useState("");
  const [sectionRef, isIntersecting, hasIntersected] = useIntersectionObserver();
const loadSteps = async () => {
    try {
      setError("");
      if (onRetry) {
        await onRetry();
      }
    } catch (err) {
      setError("Failed to load steps. Please try again.");
      console.error("Error loading steps:", err);
    }
  };

  const handleUpdateStep = (updatedStep) => {
    if (onUpdateStep) {
      onUpdateStep(updatedStep);
    }
  };

  const completedSteps = steps.filter(step => step.isCompleted).length;
  const totalSteps = steps.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadSteps} />;

  return (
    <section 
      ref={sectionRef}
      className={`py-20 bg-gradient-to-br from-gray-50 to-white section-fade ${hasIntersected ? "visible" : ""}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">
              Your Testing Journey
            </h2>
            <p className="text-xl text-gray-600 font-body mb-8">
              Follow these 4 simple steps to create your first automated test
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{completedSteps} of {totalSteps} completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: hasIntersected ? 1 : 0, 
                  y: hasIntersected ? 0 : 30 
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <StepCard 
                  step={step} 
                  onUpdateStep={handleUpdateStep}
                />
              </motion.div>
            ))}
          </div>

          {/* Completion Message */}
          {completedSteps === totalSteps && totalSteps > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-12 p-8 bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-2xl text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Congratulations!
              </h3>
              <p className="text-gray-700 text-lg">
                You've completed all steps and are ready to start automated testing with AutoTester!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default StepsSection;