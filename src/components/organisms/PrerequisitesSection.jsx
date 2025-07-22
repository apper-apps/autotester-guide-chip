import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import PrerequisiteItem from "@/components/molecules/PrerequisiteItem";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { guideService } from "@/services/api/guideService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const PrerequisitesSection = () => {
  const [prerequisites, setPrerequisites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sectionRef, isIntersecting, hasIntersected] = useIntersectionObserver();

  const loadPrerequisites = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await guideService.getPrerequisites();
      setPrerequisites(data);
    } catch (err) {
      setError("Failed to load prerequisites. Please try again.");
      console.error("Error loading prerequisites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrerequisites();
  }, []);

  const handleToggleCheck = async (prereqId, isChecked) => {
    try {
      await guideService.updatePrerequisiteCheck(prereqId, isChecked);
      setPrerequisites(prev => 
        prev.map(prereq => 
          prereq.id === prereqId ? { ...prereq, isChecked } : prereq
        )
      );
      
      if (isChecked) {
        toast.success("Great! One step closer to testing success!");
      }
    } catch (err) {
      console.error("Error updating prerequisite:", err);
      toast.error("Failed to update prerequisite");
    }
  };

  const scrollToSteps = () => {
    const element = document.getElementById("step-1");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const allChecked = prerequisites.every(prereq => prereq.isChecked);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPrerequisites} />;

  return (
    <section 
      id="prerequisites" 
      ref={sectionRef}
      className={`py-20 bg-white section-fade ${hasIntersected ? "visible" : ""}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">
              Before You Start
            </h2>
            <p className="text-xl text-gray-600 font-body">
              Make sure you have everything ready for a smooth testing experience
            </p>
          </div>

          {/* Prerequisites Grid */}
          <div className="grid gap-4 mb-12">
            {prerequisites.map((prerequisite, index) => (
              <motion.div
                key={prerequisite.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ 
                  opacity: hasIntersected ? 1 : 0, 
                  x: hasIntersected ? 0 : -30 
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PrerequisiteItem
                  prerequisite={prerequisite}
                  onToggleCheck={handleToggleCheck}
                />
              </motion.div>
            ))}
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: hasIntersected ? 1 : 0, 
              y: hasIntersected ? 0 : 20 
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Button 
              size="lg"
              onClick={scrollToSteps}
              disabled={!allChecked}
              className={`${allChecked ? "" : "opacity-50 cursor-not-allowed"}`}
            >
              {allChecked ? (
                <>
                  Continue to Steps
                  <ApperIcon name="ArrowRight" size={20} className="ml-2" />
                </>
              ) : (
                <>
                  Complete Prerequisites First
                  <ApperIcon name="AlertCircle" size={20} className="ml-2" />
                </>
              )}
            </Button>
            
            {!allChecked && (
              <p className="text-sm text-gray-500 mt-3">
                Please check all prerequisites before continuing
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrerequisitesSection;